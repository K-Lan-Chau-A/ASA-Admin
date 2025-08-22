"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Store, Calendar, User, Package } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Shop {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  address: string
  package: "basic" | "premium"
  status: "active" | "expired" | "pending"
  registeredDate: string
  expiryDate: string
  revenue: number
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "Coffee House",
    owner: "Nguyễn Văn A",
    email: "nguyenvana@coffeehouse.com",
    phone: "0901234567",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    package: "premium",
    status: "active",
    registeredDate: "2024-01-01",
    expiryDate: "2024-02-01",
    revenue: 15000000
  },
  {
    id: "2",
    name: "Bakery Sweet",
    owner: "Trần Thị B",
    email: "tranthib@bakerysweet.com",
    phone: "0901234568",
    address: "456 Lê Lợi, Q3, TP.HCM",
    package: "basic",
    status: "active",
    registeredDate: "2024-01-05",
    expiryDate: "2024-02-05",
    revenue: 8000000
  },
  {
    id: "3",
    name: "Tech Store",
    owner: "Lê Văn C",
    email: "levanc@techstore.com",
    phone: "0901234569",
    address: "789 Trần Hưng Đạo, Q5, TP.HCM",
    package: "premium",
    status: "expired",
    registeredDate: "2023-12-01",
    expiryDate: "2024-01-01",
    revenue: 25000000
  },
  {
    id: "4",
    name: "Fashion Boutique",
    owner: "Phạm Thị D",
    email: "phamthid@fashionboutique.com",
    phone: "0901234570",
    address: "321 Võ Văn Tần, Q3, TP.HCM",
    package: "basic",
    status: "active",
    registeredDate: "2024-01-10",
    expiryDate: "2024-02-10",
    revenue: 12000000
  },
  {
    id: "5",
    name: "Restaurant Deluxe",
    owner: "Hoàng Văn E",
    email: "hoangvane@restaurantdeluxe.com",
    phone: "0901234571",
    address: "654 Nguyễn Thị Minh Khai, Q1, TP.HCM",
    package: "premium",
    status: "active",
    registeredDate: "2024-01-08",
    expiryDate: "2024-02-08",
    revenue: 30000000
  },
  {
    id: "6",
    name: "Pharmacy Plus",
    owner: "Võ Thị F",
    email: "vothif@pharmacyplus.com",
    phone: "0901234572",
    address: "987 Cách Mạng Tháng 8, Q10, TP.HCM",
    package: "basic",
    status: "pending",
    registeredDate: "2024-01-15",
    expiryDate: "2024-02-15",
    revenue: 5000000
  }
]

export default function ShopsPage() {
  const { t } = useLanguage()

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
        {mockShops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{shop.name}</CardTitle>
                <Badge 
                  variant={shop.status === 'active' ? 'default' : shop.status === 'expired' ? 'destructive' : 'secondary'}
                >
                  {shop.status === 'active' ? t('shops.status.active') : 
                   shop.status === 'expired' ? t('shops.status.expired') : 
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
                <span>{t('shops.package')}: {shop.package === 'basic' ? t('shops.basicPackage') : t('shops.premiumPackage')}</span>
                <Badge variant="outline" className="ml-auto">
                  {shop.package === 'basic' ? '₫150,000' : '₫300,000'}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{t('shops.expiryDate')}: {shop.expiryDate}</span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('shops.monthlyRevenue')}:</span>
                  <span className="font-medium">₫{shop.revenue.toLocaleString()}</span>
                </div>
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
        ))}
      </div>
    </div>
  )
}
