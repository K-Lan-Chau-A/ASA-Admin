"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Check, Users, DollarSign, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import { useEffect, useMemo, useState } from "react"

type ApiFeature = { featureId: number; featureName: string; description?: string; isActive?: boolean }
type ApiProduct = {
  productId: number
  productName: string
  description?: string
  price: number
  promotionValue?: number
  promotionType?: string // "%" or amount
}

export default function PackagesPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<Array<ApiProduct & { features: ApiFeature[] }>>([])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_URL}/api/products?page=1&pageSize=10`)
        const json = await res.json().catch(() => ({}))
        const items: any[] = Array.isArray(json?.items) ? json.items : []
        setProducts(items as any)
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load packages')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const normalized = useMemo(() => {
    return products.map((p) => {
      const discountPercent = (p.promotionType === '%' && typeof p.promotionValue === 'number') ? p.promotionValue : undefined
      return {
        id: String(p.productId),
        name: p.productName,
        description: p.description || '',
        price: Number(p.price || 0),
        discount: discountPercent,
        features: Array.isArray((p as any).features) ? (p as any).features : [],
      }
    })
  }, [products])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('packages.title')}</h1>
          <p className="text-muted-foreground">{t('packages.subtitle')}</p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          {t('packages.createPackage')}
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {loading ? (
          <div className="text-sm text-muted-foreground">{t('common.loading')}...</div>
        ) : (
          normalized.map((pkg) => (
            <Card key={pkg.id} className="relative hover:shadow-lg transition-shadow flex flex-col h-full">
              {pkg.discount ? (
                <div className="absolute -top-3 -right-3">
                  <Badge variant="destructive" className="text-xs">
                    {t('packages.discount')} {pkg.discount}%
                  </Badge>
                </div>
              ) : null}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{pkg.description}</CardDescription>
                  </div>
                  {/* Status is not present in API; hide badge for now */}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{t('packages.price')}:</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₫{pkg.price.toLocaleString()}</div>
                    {/* Billing cycle not available from API; omit */}
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="text-sm font-medium">{t('packages.featuresIncluded')}:</div>
                  <ul className="space-y-1">
                    {(pkg.features || []).length === 0 ? (
                      <li className="text-sm text-muted-foreground">{t('common.none')}</li>
                    ) : (
                      (pkg.features as any[]).map((f, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{String(f.featureName || '')}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="pt-4 border-t mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('common.edit')}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      {t('packages.currentlyActive')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('packages.packageStats')}</CardTitle>
          <CardDescription>{t('packages.packageStatsSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">{t('packages.totalShopSubscriptions')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₫45,000,000</div>
              <div className="text-sm text-muted-foreground">{t('packages.monthlyRevenue')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-muted-foreground">{t('packages.activePremiumPackages')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
