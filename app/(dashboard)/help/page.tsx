"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, HelpCircle, BookOpen, MessageSquare, Phone, Mail, FileText, Video, Users } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HelpPage() {
  const { t } = useLanguage()

  const helpCategories = [
    {
      title: "Hướng dẫn sử dụng",
      description: "Tìm hiểu cách sử dụng các tính năng của hệ thống",
      icon: BookOpen,
      items: [
        { name: "Hướng dẫn Dashboard", description: "Cách đọc và hiểu Dashboard", type: "guide" },
        { name: "Quản lý Shop", description: "Thêm, sửa, xóa shop", type: "guide" },
        { name: "Quản lý Khuyến mãi", description: "Tạo và quản lý chương trình khuyến mãi", type: "guide" },
        { name: "Quản lý Gói dịch vụ", description: "Cấu hình gói dịch vụ POS", type: "guide" },
      ]
    },
    {
      title: "Video hướng dẫn",
      description: "Xem video hướng dẫn chi tiết",
      icon: Video,
      items: [
        { name: "Tổng quan hệ thống", description: "Video giới thiệu tổng quan", type: "video", duration: "5:30" },
        { name: "Quản lý Shop", description: "Hướng dẫn quản lý shop", type: "video", duration: "8:15" },
        { name: "Báo cáo và Analytics", description: "Cách đọc báo cáo", type: "video", duration: "6:45" },
        { name: "Cài đặt hệ thống", description: "Cấu hình hệ thống", type: "video", duration: "4:20" },
      ]
    },
    {
      title: "Tài liệu kỹ thuật",
      description: "Tài liệu chi tiết cho nhà phát triển",
      icon: FileText,
      items: [
        { name: "API Documentation", description: "Tài liệu API", type: "document" },
        { name: "Database Schema", description: "Cấu trúc cơ sở dữ liệu", type: "document" },
        { name: "Security Guidelines", description: "Hướng dẫn bảo mật", type: "document" },
        { name: "Deployment Guide", description: "Hướng dẫn triển khai", type: "document" },
      ]
    },
    {
      title: "FAQ",
      description: "Câu hỏi thường gặp",
      icon: HelpCircle,
      items: [
        { name: "Làm thế nào để thêm shop mới?", description: "Hướng dẫn thêm shop", type: "faq" },
        { name: "Cách tạo chương trình khuyến mãi?", description: "Hướng dẫn tạo khuyến mãi", type: "faq" },
        { name: "Làm sao để xem báo cáo doanh thu?", description: "Hướng dẫn xem báo cáo", type: "faq" },
        { name: "Cách thay đổi ngôn ngữ hệ thống?", description: "Hướng dẫn thay đổi ngôn ngữ", type: "faq" },
      ]
    }
  ]

  const contactMethods = [
    {
      title: "Hỗ trợ qua Email",
      description: "Gửi email cho đội ngũ hỗ trợ",
      icon: Mail,
      action: "Gửi Email",
      contact: "support@posadmin.com"
    },
    {
      title: "Hỗ trợ qua điện thoại",
      description: "Gọi điện trực tiếp cho chúng tôi",
      icon: Phone,
      action: "Gọi ngay",
      contact: "1900-1234"
    },
    {
      title: "Chat trực tuyến",
      description: "Chat với nhân viên hỗ trợ",
      icon: MessageSquare,
      action: "Bắt đầu chat",
      contact: "Trực tuyến 24/7"
    },
    {
      title: "Đội ngũ hỗ trợ",
      description: "Liên hệ trực tiếp với đội ngũ",
      icon: Users,
      action: "Liên hệ",
      contact: "admin@posadmin.com"
    }
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('common.help')}</h1>
          <p className="text-muted-foreground">Tìm kiếm trợ giúp và hỗ trợ cho hệ thống POS Admin</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {helpCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.type === 'video' && item.duration && (
                      <Badge variant="secondary">{item.duration}</Badge>
                    )}
                    <Badge variant={item.type === 'guide' ? 'default' : item.type === 'video' ? 'secondary' : 'outline'}>
                      {item.type === 'guide' ? 'Hướng dẫn' : item.type === 'video' ? 'Video' : item.type === 'document' ? 'Tài liệu' : 'FAQ'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Liên hệ hỗ trợ
          </CardTitle>
          <CardDescription>Chọn cách liên hệ phù hợp với bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <div key={method.title} className="text-center p-4 border rounded-lg">
                <method.icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h4 className="font-medium mb-1">{method.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <p className="text-sm font-medium mb-2">{method.contact}</p>
                <Button size="sm" className="w-full">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Tìm kiếm trợ giúp
          </CardTitle>
          <CardDescription>Tìm kiếm nhanh trong cơ sở kiến thức</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button>Tìm kiếm</Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Gợi ý: "shop", "khuyến mãi", "báo cáo", "cài đặt"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
