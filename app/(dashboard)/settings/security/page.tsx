"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, Lock, Key, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export default function SecuritySettingsPage() {
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.security')}</h1>
          <p className="text-muted-foreground">{t('settings.securitySubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Thay đổi mật khẩu
            </CardTitle>
            <CardDescription>Cập nhật mật khẩu tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button className="w-full">Cập nhật mật khẩu</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Xác thực 2 yếu tố
            </CardTitle>
            <CardDescription>Bảo mật tài khoản với xác thực 2 yếu tố</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Xác thực 2 yếu tố</p>
                <p className="text-sm text-muted-foreground">Bảo vệ tài khoản với mã xác thực</p>
              </div>
              <Button variant="outline" size="sm">Kích hoạt</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Đăng nhập từ thiết bị mới</p>
                <p className="text-sm text-muted-foreground">Yêu cầu xác thực khi đăng nhập từ thiết bị mới</p>
              </div>
              <Button variant="outline" size="sm">Bật</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Lịch sử đăng nhập
            </CardTitle>
            <CardDescription>Theo dõi các lần đăng nhập vào tài khoản</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Chrome - Windows 10</p>
                  <p className="text-muted-foreground">192.168.1.100 • Hôm nay 14:30</p>
                </div>
                <Badge variant="default">Hiện tại</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Safari - iPhone</p>
                  <p className="text-muted-foreground">192.168.1.101 • Hôm qua 09:15</p>
                </div>
                <Badge variant="secondary">Đã đăng xuất</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">Xem tất cả</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Quyền riêng tư
            </CardTitle>
            <CardDescription>Quản lý quyền riêng tư và bảo mật dữ liệu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chia sẻ dữ liệu</p>
                <p className="text-sm text-muted-foreground">Cho phép chia sẻ dữ liệu với bên thứ 3</p>
              </div>
              <Button variant="outline" size="sm">Tắt</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo bảo mật</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo về hoạt động bảo mật</p>
              </div>
              <Button variant="outline" size="sm">Bật</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
