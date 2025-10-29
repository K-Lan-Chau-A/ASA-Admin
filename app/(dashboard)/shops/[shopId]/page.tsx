"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Store, Calendar, User, Package, Phone, Mail, MapPin, CreditCard, Settings, Edit, Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import SELLER_API_URL from "@/config/sellerApi"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditShopDialog } from "@/components/edit-shop-dialog"
import { shopsTranslations } from "@/lib/shops-i18n"

type ShopDetail = {
  shopId: number
  shopName: string
  fullname: string
  phonenumber: string
  email?: string | null
  address?: string | null
  status: number // 0 inactive, 1 active, 2 trial
  productType?: string | null
  productId?: number | null
  expiredAt?: string | null
  createdAt?: string
  bankName?: string | null
  bankCode?: string | null
  bankNum?: string | null
  shopToken?: string | null
  qrcodeUrl?: string | null
  sepayApiKey?: string | null
}

export default function ShopDetailPage() {
  const { language } = useLanguage()
  const st = shopsTranslations[language]
  const params = useParams()
  const router = useRouter()
  const shopId = params.shopId as string

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shop, setShop] = useState<ShopDetail | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTechnicalInfo, setShowTechnicalInfo] = useState(false)

  const loadShopDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${API_URL}/api/shops?shopId=${shopId}&page=1&pageSize=1`)

      if (!res.ok) {
        throw new Error(`Failed to load shop: ${res.status}`)
      }

      const data = await res.json()
      const shops = data.items || []

      if (shops.length === 0) {
        throw new Error('Shop not found')
      }

      const baseShop: ShopDetail = shops[0]

      // Also fetch technical info from Seller API and merge
      try {
        const sellerRes = await fetch(`${SELLER_API_URL}/api/shops?ShopId=${shopId}&page=1&pageSize=1`)
        if (sellerRes.ok) {
          const sellerJson = await sellerRes.json().catch(() => ({}))
          const sellerItem = Array.isArray(sellerJson?.items) ? sellerJson.items[0] : null
          if (sellerItem) {
            setShop({
              ...baseShop,
              // prefer seller fields when available
              createdAt: sellerItem.createdAt ?? baseShop.createdAt,
              status: sellerItem.status ?? baseShop.status,
              shopToken: sellerItem.shopToken ?? baseShop.shopToken,
              qrcodeUrl: sellerItem.qrcodeUrl ?? baseShop.qrcodeUrl,
              sepayApiKey: sellerItem.sepayApiKey ?? baseShop.sepayApiKey,
              bankName: sellerItem.bankName ?? baseShop.bankName,
              bankCode: sellerItem.bankCode ?? baseShop.bankCode,
              bankNum: sellerItem.bankNum ?? baseShop.bankNum,
            })
            return
          }
        }
      } catch (e) {
        // ignore seller api errors; keep base data
      }

      setShop(baseShop)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load shop details')
      setShop(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shopId) {
      loadShopDetail()
    }
  }, [shopId])

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: st.inactive, variant: 'secondary' as const }
      case 1:
        return { text: st.active, variant: 'default' as const }
      case 2:
        return { text: st.trial, variant: 'secondary' as const }
      default:
        return { text: st.unknown, variant: 'destructive' as const }
    }
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return st.noData
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {st.goBack}
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-muted-foreground">{st.loadingShopInfo}</div>
        </div>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {st.goBack}
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error || st.shopNotFound}</div>
          <Button onClick={() => router.push('/shops')}>
            {st.backToShopList}
          </Button>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(shop.status)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {st.goBack}
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{shop.shopName}</h1>
            <p className="text-muted-foreground">{st.shopDetails}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusInfo.variant}>
            {statusInfo.text}
          </Badge>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            {st.edit}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Shop Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              {st.shopInformation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.ownerName}</p>
                <p className="text-sm text-muted-foreground">{shop.fullname}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.phoneNumber}</p>
                <p className="text-sm text-muted-foreground">{shop.phonenumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.email}</p>
                <p className="text-sm text-muted-foreground">{shop.email || st.noData}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.address}</p>
                <p className="text-sm text-muted-foreground">{shop.address || st.noData}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package & Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {st.packageAndStatus}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.productPackage}</p>
                <p className="text-sm text-muted-foreground">{shop.productType || st.noData}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.registrationDate}</p>
                <p className="text-sm text-muted-foreground">{formatDate(shop.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.expirationDate}</p>
                <p className="text-sm text-muted-foreground">{formatDate(shop.expiredAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{st.status}</p>
                <Badge variant={statusInfo.variant} className="mt-1">
                  {statusInfo.text}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        {(shop.bankName || shop.bankNum) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {st.bankInformation}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shop.bankName && (
                <div>
                  <p className="text-sm font-medium">{st.bankName}</p>
                  <p className="text-sm text-muted-foreground">{shop.bankName}</p>
                </div>
              )}

              {shop.bankNum && (
                <div>
                  <p className="text-sm font-medium">{st.accountNumber}</p>
                  <p className="text-sm text-muted-foreground">{shop.bankNum}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {st.technicalInfo}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowTechnicalInfo(v => !v)}>
                {showTechnicalInfo ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {showTechnicalInfo ? 'Ẩn' : 'Xem'}
              </Button>
            </div>
          </CardHeader>
          {showTechnicalInfo && (
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">{st.shopToken}</p>
                <p className="text-sm text-muted-foreground font-mono">{shop.shopToken || st.noData}</p>
              </div>

              <div>
                <p className="text-sm font-medium">{st.sepayApiKey}</p>
                <p className="text-sm text-muted-foreground font-mono">{shop.sepayApiKey || st.noData}</p>
              </div>

              <div>
                <p className="text-sm font-medium">{st.qrCodeUrl}</p>
                <p className="text-sm text-muted-foreground break-all">{shop.qrcodeUrl || st.noData}</p>
              </div>
            </CardContent>
          )}
         </Card>
       </div>

       {/* Edit Dialog */}
       {shop && (
         <EditShopDialog
           open={isEditing}
           onOpenChange={setIsEditing}
           shop={shop}
           onShopUpdated={loadShopDetail}
         />
       )}
     </div>
   )
 }
