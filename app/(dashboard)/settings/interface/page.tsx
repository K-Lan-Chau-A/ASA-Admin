"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { Palette, Monitor, Sun, Moon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InterfaceSettingsPage() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "dark":
        return <Moon className="h-5 w-5 text-blue-500" />
      default:
        return <Monitor className="h-5 w-5 text-gray-500" />
    }
  }

  const getThemeText = () => {
    switch (theme) {
      case "light":
        return "Sáng"
      case "dark":
        return "Tối"
      default:
        return "Hệ thống"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cài đặt giao diện</h1>
          <p className="text-muted-foreground">Tùy chỉnh giao diện và chủ đề</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-6 w-6 text-purple-500" />
              <div>
                <CardTitle>Chủ đề</CardTitle>
                <CardDescription>
                  Chọn chủ đề giao diện phù hợp với sở thích của bạn
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getThemeIcon()}
                <div>
                  <p className="font-medium">Chủ đề hiện tại</p>
                  <p className="text-sm text-muted-foreground">
                    {getThemeText()} - {theme === "system" ? "Tự động theo hệ thống" : "Chủ đề tùy chỉnh"}
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            
            <Separator />
            
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span><strong>Sáng:</strong> Giao diện sáng với nền trắng, phù hợp cho môi trường có ánh sáng tốt</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-blue-500" />
                <span><strong>Tối:</strong> Giao diện tối với nền đen, giúp giảm mỏi mắt trong môi trường thiếu sáng</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-gray-500" />
                <span><strong>Hệ thống:</strong> Tự động chuyển đổi theo cài đặt hệ điều hành của bạn</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Interface Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin bổ sung</CardTitle>
            <CardDescription>
              Các tùy chọn giao diện khác sẽ được thêm vào đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Tính năng này đang được phát triển. Trong tương lai, bạn sẽ có thể tùy chỉnh:
            </p>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1">
              <li>• Kích thước font chữ</li>
              <li>• Mật độ hiển thị</li>
              <li>• Màu sắc tùy chỉnh</li>
              <li>• Bố cục giao diện</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
