"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function LogoutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('common.logout')}</h1>
          <p className="text-muted-foreground">Đăng xuất khỏi hệ thống POS Admin</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Xác nhận đăng xuất
            </CardTitle>
            <CardDescription>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Phiên làm việc hiện tại sẽ kết thúc</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Dữ liệu chưa lưu sẽ bị mất</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Bạn cần đăng nhập lại để tiếp tục</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Hủy
              </Button>
              <Button className="flex-1">
                Đăng xuất
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Thông tin bảo mật
            </CardTitle>
            <CardDescription>Thông tin về phiên làm việc hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Thời gian đăng nhập:</span>
                <span className="text-sm font-medium">Hôm nay 09:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Thời gian hoạt động:</span>
                <span className="text-sm font-medium">8 giờ 30 phút</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">IP đăng nhập:</span>
                <span className="text-sm font-medium">192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Thiết bị:</span>
                <span className="text-sm font-medium">Chrome - Windows 10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lưu ý quan trọng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Đảm bảo bạn đã lưu tất cả công việc trước khi đăng xuất</p>
          <p>• Nếu bạn đang thực hiện thao tác quan trọng, hãy hoàn thành trước</p>
          <p>• Sau khi đăng xuất, bạn sẽ cần đăng nhập lại để truy cập hệ thống</p>
          <p>• Thông tin phiên làm việc sẽ được ghi lại trong lịch sử</p>
        </CardContent>
      </Card>
    </div>
  )
}
