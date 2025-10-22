"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Store, Calendar, User, Package, Phone, Mail, MapPin, CreditCard, Settings, Edit } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditShopDialog } from "@/components/edit-shop-dialog"

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
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const shopId = params.shopId as string

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shop, setShop] = useState<ShopDetail | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      setShop(shops[0])
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
        return { text: 'Không hoạt động', variant: 'secondary' as const }
      case 1:
        return { text: 'Hoạt động', variant: 'default' as const }
      case 2:
        return { text: 'Dùng thử', variant: 'secondary' as const }
      default:
        return { text: 'Không xác định', variant: 'destructive' as const }
    }
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Không có'
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-muted-foreground">Đang tải thông tin cửa hàng...</div>
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
            Quay lại
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error || 'Không tìm thấy cửa hàng'}</div>
          <Button onClick={() => router.push('/shops')}>
            Về danh sách cửa hàng
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
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{shop.shopName}</h1>
            <p className="text-muted-foreground">Chi tiết cửa hàng</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusInfo.variant}>
            {statusInfo.text}
          </Badge>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
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
              Thông tin cửa hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Chủ cửa hàng</p>
                <p className="text-sm text-muted-foreground">{shop.fullname}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Số điện thoại</p>
                <p className="text-sm text-muted-foreground">{shop.phonenumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{shop.email || 'Không có'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Địa chỉ</p>
                <p className="text-sm text-muted-foreground">{shop.address || 'Không có'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package & Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Gói dịch vụ & Trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Gói sản phẩm</p>
                <p className="text-sm text-muted-foreground">{shop.productType || 'Không có'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ngày đăng ký</p>
                <p className="text-sm text-muted-foreground">{formatDate(shop.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ngày hết hạn</p>
                <p className="text-sm text-muted-foreground">{formatDate(shop.expiredAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Trạng thái</p>
                <Badge variant={statusInfo.variant} className="mt-1">
                  {statusInfo.text}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        {(shop.bankName || shop.bankCode || shop.bankNum) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Thông tin ngân hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shop.bankName && (
                <div>
                  <p className="text-sm font-medium">Tên ngân hàng</p>
                  <p className="text-sm text-muted-foreground">{shop.bankName}</p>
                </div>
              )}

              {shop.bankCode && (
                <div>
                  <p className="text-sm font-medium">Mã ngân hàng</p>
                  <p className="text-sm text-muted-foreground">{shop.bankCode}</p>
                </div>
              )}

              {shop.bankNum && (
                <div>
                  <p className="text-sm font-medium">Số tài khoản</p>
                  <p className="text-sm text-muted-foreground">{shop.bankNum}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Thông tin kỹ thuật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div>
              <p className="text-sm font-medium">Shop Token</p>
              <p className="text-sm text-muted-foreground font-mono">{shop.shopToken || t('common.none')}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Sepay API Key</p>
              <p className="text-sm text-muted-foreground font-mono">{shop.sepayApiKey || t('common.none')}</p>
            </div>

            <div>
              <p className="text-sm font-medium">QR Code URL</p>
              <p className="text-sm text-muted-foreground break-all">{shop.qrcodeUrl || t('common.none')}</p>
            </div>
          </CardContent>
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
