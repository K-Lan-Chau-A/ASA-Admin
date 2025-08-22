"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Gift, Calendar, Users, Percent } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Promotion {
  id: string
  name: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  startDate: string
  endDate: string
  status: "active" | "inactive" | "expired"
  targetPackage: "all" | "basic" | "premium"
  maxUses: number
  currentUses: number
  minSubscriptionMonths: number
}

const mockPromotions: Promotion[] = [
  {
    id: "1",
    name: "Khuyến mãi mùa hè",
    description: "Giảm giá cho các shop đăng ký mới trong tháng 6-8",
    discountType: "percentage",
    discountValue: 20,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "active",
    targetPackage: "all",
    maxUses: 100,
    currentUses: 45,
    minSubscriptionMonths: 3
  },
  {
    id: "2",
    name: "Ưu đãi gói Premium",
    description: "Giảm giá đặc biệt cho gói Premium",
    discountType: "fixed",
    discountValue: 50000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    targetPackage: "premium",
    maxUses: 50,
    currentUses: 23,
    minSubscriptionMonths: 6
  },
  {
    id: "3",
    name: "Khuyến mãi đầu năm",
    description: "Chào mừng năm mới với ưu đãi hấp dẫn",
    discountType: "percentage",
    discountValue: 15,
    startDate: "2024-01-01",
    endDate: "2024-02-29",
    status: "expired",
    targetPackage: "all",
    maxUses: 200,
    currentUses: 156,
    minSubscriptionMonths: 1
  },
  {
    id: "4",
    name: "Ưu đãi gói Basic",
    description: "Giảm giá cho gói cơ bản",
    discountType: "fixed",
    discountValue: 25000,
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    status: "inactive",
    targetPackage: "basic",
    maxUses: 150,
    currentUses: 0,
    minSubscriptionMonths: 2
  }
]

export default function PromotionsPage() {
  const { t } = useLanguage()

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t('promotions.currentlyActive')
      case "expired":
        return t('promotions.expired')
      case "inactive":
        return t('promotions.suspended')
      default:
        return status
    }
  }

  const getTargetPackageText = (target: string) => {
    switch (target) {
      case "all":
        return t('promotions.all')
      case "basic":
        return t('promotions.basicPackage')
      case "premium":
        return t('promotions.premiumPackage')
      default:
        return target
    }
  }

  const getDiscountTypeText = (type: string) => {
    switch (type) {
      case "percentage":
        return t('promotions.percentage')
      case "fixed":
        return t('promotions.fixed')
      default:
        return type
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('promotions.title')}</h1>
          <p className="text-muted-foreground">{t('promotions.subtitle')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('promotions.createPromotion')}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('promotions.searchPromotion')} className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {mockPromotions.map((promotion) => (
          <Card key={promotion.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{promotion.name}</CardTitle>
                <Badge 
                  variant={
                    promotion.status === 'active' ? 'default' : 
                    promotion.status === 'expired' ? 'destructive' : 
                    'secondary'
                  }
                >
                  {getStatusText(promotion.status)}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                {promotion.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('promotions.discountType')}:</span>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  <span className="font-medium">
                    {promotion.discountType === 'percentage' 
                      ? `${promotion.discountValue}%` 
                      : `₫${promotion.discountValue.toLocaleString()}`
                    }
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{t('promotions.from')} {promotion.startDate} {t('promotions.to')} {promotion.endDate}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{t('promotions.appliesTo')}: {getTargetPackageText(promotion.targetPackage)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('promotions.usage')}:</span>
                  <div className="font-medium">{promotion.currentUses}/{promotion.maxUses}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('promotions.minSubscriptionMonths')}:</span>
                  <div className="font-medium">{promotion.minSubscriptionMonths} {t('promotions.months')}</div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('common.edit')}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {promotion.status === 'active' ? t('promotions.suspend') : t('promotions.activate')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
