"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Mail, Bell, MessageSquare, Smartphone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function CommunicationSettingsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.communication')}</h1>
          <p className="text-muted-foreground">{t('settings.communicationSubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Cài đặt Email
            </CardTitle>
            <CardDescription>Quản lý thông báo qua email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email chính</Label>
              <Input id="email" type="email" placeholder="admin@posadmin.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupEmail">Email dự phòng</Label>
              <Input id="backupEmail" type="email" placeholder="backup@posadmin.com" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo qua email</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo quan trọng qua email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Báo cáo hàng tuần</p>
                <p className="text-sm text-muted-foreground">Nhận báo cáo tổng hợp hàng tuần</p>
              </div>
              <Switch />
            </div>
            <Button className="w-full">Cập nhật email</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Thông báo trong ứng dụng
            </CardTitle>
            <CardDescription>Quản lý thông báo hiển thị trong ứng dụng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo mới</p>
                <p className="text-sm text-muted-foreground">Hiển thị thông báo mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cập nhật hệ thống</p>
                <p className="text-sm text-muted-foreground">Thông báo khi có cập nhật</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bảo mật</p>
                <p className="text-sm text-muted-foreground">Thông báo về hoạt động bảo mật</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Khuyến mãi</p>
                <p className="text-sm text-muted-foreground">Thông báo về chương trình khuyến mãi</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Cài đặt SMS
            </CardTitle>
            <CardDescription>Quản lý thông báo qua SMS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0901234567" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo khẩn cấp</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo khẩn cấp qua SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Xác thực 2 yếu tố</p>
                <p className="text-sm text-muted-foreground">Nhận mã xác thực qua SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full">Cập nhật số điện thoại</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Tần suất thông báo
            </CardTitle>
            <CardDescription>Điều chỉnh tần suất nhận thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Báo cáo doanh thu</p>
                  <p className="text-sm text-muted-foreground">Hàng ngày</p>
                </div>
                <Button variant="outline" size="sm">Thay đổi</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thống kê shop</p>
                  <p className="text-sm text-muted-foreground">Hàng tuần</p>
                </div>
                <Button variant="outline" size="sm">Thay đổi</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cập nhật gói dịch vụ</p>
                  <p className="text-sm text-muted-foreground">Hàng tháng</p>
                </div>
                <Button variant="outline" size="sm">Thay đổi</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
