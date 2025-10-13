"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Store, Calendar, User, Package } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import { useEffect, useMemo, useState } from "react"

type ApiShop = {
  shopId: number
  shopName: string
  fullname: string
  phonenumber: string
  email?: string | null
  address?: string | null
  status: number // 1 active, 0 inactive (others pending)
  productType?: string | null
  expiredAt?: string | null
  createdAt?: string
}

export default function ShopsPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ApiShop[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_URL}/api/shops?page=1&pageSize=10`)
        const json = await res.json().catch(() => ({}))
        const arr: any[] = Array.isArray(json?.items) ? json.items : []
        setItems(arr as any)
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load shops')
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const shops = useMemo(() => {
    return items.map((s) => {
      const statusText = s.status === 1 ? 'active' : (s.status === 0 ? 'inactive' : 'pending')
      return {
        id: String(s.shopId),
        name: s.shopName,
        owner: s.fullname,
        email: s.email || '',
        phone: s.phonenumber,
        address: s.address || '',
        packageText: s.productType || '',
        status: statusText as 'active' | 'expired' | 'pending' | 'inactive',
        expiryDate: s.expiredAt ? new Date(s.expiredAt).toISOString().slice(0,10) : '-',
        registeredDate: s.createdAt ? new Date(s.createdAt).toISOString().slice(0,10) : '-',
      }
    })
  }, [items])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('shops.title')}</h1>
          <p className="text-muted-foreground">{t('shops.subtitle')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('shops.addShop')}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('shops.searchShop')} className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}
        {loading ? (
          <div className="text-sm text-muted-foreground">{t('common.loading')}...</div>
        ) : (
        shops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{shop.name}</CardTitle>
                <Badge 
                  variant={shop.status === 'active' ? 'default' : shop.status === 'inactive' ? 'secondary' : 'destructive'}
                >
                  {shop.status === 'active' ? t('shops.status.active') : 
                   shop.status === 'inactive' ? t('shops.status.inactive') : 
                   t('shops.status.pending')}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                {shop.address}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{shop.owner}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{t('shops.package')}: {shop.packageText || t('common.none')}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{t('shops.expiryDate')}: {shop.expiryDate}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  {t('shops.details')}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {t('shops.edit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>
    </div>
  )
}
