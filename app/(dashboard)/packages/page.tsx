"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Check, Users, DollarSign, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface PackagePlan {
  id: string
  name: string
  description: string
  price: number
  billingCycle: "monthly" | "yearly"
  features: string[]
  status: "active" | "inactive"
  currentSubscribers: number
  maxSubscribers?: number
  discount?: number
}

const mockPackages: PackagePlan[] = [
  {
    id: "1",
    name: "Gói Cơ bản",
    description: "Dành cho mô hình kinh doanh nhỏ, người bán đầu kinh doanh hoặc bán hàng online.",
    price: 150000,
    billingCycle: "monthly",
    features: [
      "Không giới hạn các tính năng cơ bản",
      "Hỗ trợ khách hàng qua tổng đài hotline",
      "Miễn phí hóa đơn điện tử",
      "Quản lý kho hàng hóa",
      "Quản lý nhân viên, ca làm việc",
      "Thống kê doanh thu, lời lãi",
      "AI hỗ trợ người dùng",
      "Dùng thử 14 ngày miễn phí, hủy bất cứ lúc nào"
    ],
    status: "active",
    currentSubscribers: 89,
    maxSubscribers: 1000
  },
  {
    id: "2",
    name: "Gói Nâng cao",
    description: "Dành cho mô hình kinh doanh chuyên nghiệp, chuyên môn hóa quy trình.",
    price: 300000,
    billingCycle: "monthly",
    features: [
      "Không giới hạn các tính năng cơ bản",
      "Hỗ trợ khách hàng qua tổng đài hotline",
      "Miễn phí hóa đơn điện tử",
      "Quản lý kho hàng hóa",
      "Quản lý nhân viên, ca làm việc",
      "Thống kê doanh thu, lời lãi",
      "AI hỗ trợ người dùng (không giới hạn)",
      "Hỗ trợ các chi phí lắp đặt văn hành kết nối với phần cứng",
      "Tích hợp NFC và phát hành thẻ tích điểm",
      "Phân tích chiến lược kinh doanh"
    ],
    status: "active",
    currentSubscribers: 67,
    maxSubscribers: 500
  },
  {
    id: "3",
    name: "Gói Cơ bản - Năm",
    description: "Gói cơ bản thanh toán theo năm với ưu đãi",
    price: 1500000,
    billingCycle: "yearly",
    features: [
      "Không giới hạn các tính năng cơ bản",
      "Hỗ trợ khách hàng qua tổng đài hotline",
      "Miễn phí hóa đơn điện tử",
      "Quản lý kho hàng hóa",
      "Quản lý nhân viên, ca làm việc",
      "Thống kê doanh thu, lời lãi",
      "AI hỗ trợ người dùng",
      "Dùng thử 14 ngày miễn phí, hủy bất cứ lúc nào",
      "Tiết kiệm 2 tháng phí",
      "Ưu tiên hỗ trợ khách hàng"
    ],
    status: "active",
    currentSubscribers: 23,
    discount: 17
  },
  {
    id: "4",
    name: "Gói Nâng cao - Năm",
    description: "Gói nâng cao thanh toán theo năm với ưu đãi",
    price: 3000000,
    billingCycle: "yearly",
    features: [
      "Không giới hạn các tính năng cơ bản",
      "Hỗ trợ khách hàng qua tổng đài hotline",
      "Miễn phí hóa đơn điện tử",
      "Quản lý kho hàng hóa",
      "Quản lý nhân viên, ca làm việc",
      "Thống kê doanh thu, lời lãi",
      "AI hỗ trợ người dùng (không giới hạn)",
      "Hỗ trợ các chi phí lắp đặt văn hành kết nối với phần cứng",
      "Tích hợp NFC và phát hành thẻ tích điểm",
      "Phân tích chiến lược kinh doanh",
      "Tiết kiệm 2 tháng phí",
      "Hỗ trợ khách hàng ưu tiên",
      "Tư vấn chuyên môn miễn phí"
    ],
    status: "active",
    currentSubscribers: 34,
    discount: 17
  }
]

export default function PackagesPage() {
  const { t } = useLanguage()

  const getBillingCycleText = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return t('packages.monthly')
      case "yearly":
        return t('packages.yearly')
      default:
        return cycle
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t('packages.currentlyActive')
      case "inactive":
        return t('packages.suspended')
      default:
        return status
    }
  }

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

             <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
         {mockPackages.map((pkg) => (
           <Card key={pkg.id} className="relative hover:shadow-lg transition-shadow flex flex-col h-full">
            {pkg.discount && (
              <div className="absolute -top-3 -right-3">
                <Badge variant="destructive" className="text-xs">
                  {t('packages.discount')} {pkg.discount}%
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="mt-2">{pkg.description}</CardDescription>
                </div>
                <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                  {getStatusText(pkg.status)}
                </Badge>
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
                   <div className="text-sm text-muted-foreground">
                     {getBillingCycleText(pkg.billingCycle)}
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-2 text-sm">
                 <Users className="h-4 w-4 text-muted-foreground" />
                 <span>{t('packages.subscribers')}: {pkg.currentSubscribers}</span>
                 {pkg.maxSubscribers && (
                   <span className="text-muted-foreground">/ {pkg.maxSubscribers}</span>
                 )}
               </div>

               <div className="space-y-2 flex-1">
                 <div className="text-sm font-medium">{t('packages.featuresIncluded')}:</div>
                 <ul className="space-y-1">
                   {pkg.features.map((feature, index) => (
                     <li key={index} className="flex items-center gap-2 text-sm">
                       <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="pt-4 border-t mt-auto">
                 <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1">
                     <Settings className="mr-2 h-4 w-4" />
                     {t('common.edit')}
                   </Button>
                   <Button variant="outline" size="sm" className="flex-1">
                     {pkg.status === 'active' ? t('packages.suspended') : t('packages.currentlyActive')}
                   </Button>
                 </div>
               </div>
             </CardContent>
          </Card>
        ))}
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
