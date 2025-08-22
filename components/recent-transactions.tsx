"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface ShopActivity {
  id: string
  shopName: string
  ownerName: string
  activity: string
  date: string
  amount?: string
  status: "active" | "expired" | "pending"
}

const recentActivities: ShopActivity[] = [
  {
    id: "1",
    shopName: "Coffee House",
    ownerName: "Nguyễn Văn A",
    activity: "Đăng ký gói Premium",
    date: "2024-01-15",
    amount: "₫300,000",
    status: "active"
  },
  {
    id: "2",
    shopName: "Bakery Sweet",
    ownerName: "Trần Thị B",
    activity: "Gia hạn gói Basic",
    date: "2024-01-14",
    amount: "₫150,000",
    status: "active"
  },
  {
    id: "3",
    shopName: "Tech Store",
    ownerName: "Lê Văn C",
    activity: "Gói Premium hết hạn",
    date: "2024-01-13",
    amount: "₫300,000",
    status: "expired"
  },
  {
    id: "4",
    shopName: "Fashion Boutique",
    ownerName: "Phạm Thị D",
    activity: "Đăng ký gói Basic",
    date: "2024-01-12",
    amount: "₫150,000",
    status: "active"
  },
  {
    id: "5",
    shopName: "Restaurant Deluxe",
    ownerName: "Hoàng Văn E",
    activity: "Nâng cấp lên Premium",
    date: "2024-01-11",
    amount: "₫300,000",
    status: "active"
  }
]

export function RecentTransactions() {
  const { t } = useLanguage()

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t('common.active')
      case "expired":
        return t('common.expired')
      case "pending":
        return t('common.pending')
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">
              {activity.shopName.split(' ').map(word => word[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.shopName}</p>
            <p className="text-xs text-muted-foreground">
              {activity.ownerName} • {activity.activity}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{activity.amount}</p>
            <p className="text-xs text-muted-foreground">{activity.date}</p>
            <Badge 
              variant={activity.status === 'active' ? 'default' : activity.status === 'expired' ? 'destructive' : 'secondary'}
              className="mt-1"
            >
              {getStatusText(activity.status)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
