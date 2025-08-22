"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Shield, Users, Store, Package, BarChart3, Settings, Key } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function PermissionsSettingsPage() {
  const { t } = useLanguage()

  const permissions = [
    {
      category: "Quản lý Shop",
      icon: Store,
      permissions: [
        { name: "Xem danh sách shop", key: "shops.view", description: "Xem thông tin các shop", enabled: true },
        { name: "Thêm shop mới", key: "shops.create", description: "Tạo shop mới trong hệ thống", enabled: true },
        { name: "Chỉnh sửa shop", key: "shops.edit", description: "Cập nhật thông tin shop", enabled: true },
        { name: "Xóa shop", key: "shops.delete", description: "Xóa shop khỏi hệ thống", enabled: false },
      ]
    },
    {
      category: "Quản lý Người dùng",
      icon: Users,
      permissions: [
        { name: "Xem danh sách người dùng", key: "users.view", description: "Xem thông tin người dùng", enabled: true },
        { name: "Thêm người dùng mới", key: "users.create", description: "Tạo tài khoản người dùng mới", enabled: true },
        { name: "Chỉnh sửa người dùng", key: "users.edit", description: "Cập nhật thông tin người dùng", enabled: true },
        { name: "Xóa người dùng", key: "users.delete", description: "Xóa tài khoản người dùng", enabled: false },
        { name: "Phân quyền người dùng", key: "users.permissions", description: "Thay đổi quyền của người dùng", enabled: false },
      ]
    },
    {
      category: "Quản lý Giao dịch",
      icon: Package,
      permissions: [
        { name: "Xem giao dịch", key: "transactions.view", description: "Xem lịch sử giao dịch", enabled: true },
        { name: "Xử lý giao dịch", key: "transactions.process", description: "Xử lý giao dịch thanh toán", enabled: true },
        { name: "Hoàn tiền", key: "transactions.refund", description: "Thực hiện hoàn tiền", enabled: false },
      ]
    },
    {
      category: "Quản lý Khuyến mãi",
      icon: Package,
      permissions: [
        { name: "Xem khuyến mãi", key: "promotions.view", description: "Xem danh sách khuyến mãi", enabled: true },
        { name: "Tạo khuyến mãi", key: "promotions.create", description: "Tạo chương trình khuyến mãi mới", enabled: true },
        { name: "Chỉnh sửa khuyến mãi", key: "promotions.edit", description: "Cập nhật thông tin khuyến mãi", enabled: true },
        { name: "Xóa khuyến mãi", key: "promotions.delete", description: "Xóa chương trình khuyến mãi", enabled: false },
      ]
    },
    {
      category: "Quản lý Gói dịch vụ",
      icon: Package,
      permissions: [
        { name: "Xem gói dịch vụ", key: "packages.view", description: "Xem danh sách gói dịch vụ", enabled: true },
        { name: "Tạo gói mới", key: "packages.create", description: "Tạo gói dịch vụ mới", enabled: false },
        { name: "Chỉnh sửa gói", key: "packages.edit", description: "Cập nhật thông tin gói dịch vụ", enabled: true },
        { name: "Xóa gói", key: "packages.delete", description: "Xóa gói dịch vụ", enabled: false },
      ]
    },
    {
      category: "Phân tích & Báo cáo",
      icon: BarChart3,
      permissions: [
        { name: "Xem báo cáo", key: "analytics.view", description: "Xem báo cáo và thống kê", enabled: true },
        { name: "Xuất báo cáo", key: "analytics.export", description: "Xuất báo cáo ra file", enabled: true },
        { name: "Báo cáo nâng cao", key: "analytics.advanced", description: "Truy cập báo cáo nâng cao", enabled: false },
      ]
    },
    {
      category: "Cài đặt hệ thống",
      icon: Settings,
      permissions: [
        { name: "Xem cài đặt", key: "settings.view", description: "Xem cài đặt hệ thống", enabled: true },
        { name: "Chỉnh sửa cài đặt", key: "settings.edit", description: "Thay đổi cài đặt hệ thống", enabled: false },
        { name: "Quản lý người dùng", key: "settings.users", description: "Quản lý người dùng hệ thống", enabled: false },
      ]
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.permissions')}</h1>
          <p className="text-muted-foreground">{t('settings.permissionsSubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {permissions.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
              <CardDescription>Quản lý quyền truy cập cho {category.category.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.permissions.map((permission) => (
                <div key={permission.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{permission.name}</h4>
                      {permission.enabled ? (
                        <Badge variant="default">Đã bật</Badge>
                      ) : (
                        <Badge variant="secondary">Đã tắt</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{permission.description}</p>
                  </div>
                  <Switch 
                    checked={permission.enabled} 
                    disabled={permission.key === "shops.view" || permission.key === "users.view"}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Thông tin về quyền
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Quyền "Xem" là quyền cơ bản và không thể tắt</p>
          <p>• Quyền "Tạo" cho phép thêm mới các mục</p>
          <p>• Quyền "Chỉnh sửa" cho phép cập nhật thông tin</p>
          <p>• Quyền "Xóa" cho phép xóa vĩnh viễn</p>
          <p>• Quyền "Phân quyền" cho phép thay đổi quyền của người khác</p>
          <p>• Thay đổi quyền sẽ có hiệu lực ngay lập tức</p>
        </CardContent>
      </Card>
    </div>
  )
}
