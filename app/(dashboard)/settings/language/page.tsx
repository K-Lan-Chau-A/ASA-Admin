"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSettingsPage() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    {
      code: 'vi' as const,
      name: 'Tiếng Việt',
      nativeName: 'Tiếng Việt',
      description: 'Ngôn ngữ chính thức của Việt Nam',
      flag: '🇻🇳',
      isCurrent: language === 'vi'
    },
    {
      code: 'en' as const,
      name: 'English',
      nativeName: 'English',
      description: 'International language for business',
      flag: '🇺🇸',
      isCurrent: language === 'en'
    }
  ]

  const handleLanguageChange = (lang: 'vi' | 'en') => {
    setLanguage(lang)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.language')}</h1>
          <p className="text-muted-foreground">{t('settings.languageSubtitle')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-500" />
            <div>
              <CardTitle>{t('settings.selectLanguage')}</CardTitle>
              <CardDescription>
                Chọn ngôn ngữ bạn muốn sử dụng trong ứng dụng. Thay đổi sẽ được áp dụng ngay lập tức.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                lang.isCurrent
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-200 hover:border-gray-300 cursor-pointer'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{lang.flag}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{lang.name}</h3>
                    {lang.isCurrent && (
                      <Badge variant="default" className="text-xs">
                        Hiện tại
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{lang.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {lang.isCurrent && (
                  <Check className="h-5 w-5 text-blue-500" />
                )}
                <Button
                  variant={lang.isCurrent ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLanguageChange(lang.code)
                  }}
                >
                  {lang.isCurrent ? 'Đang sử dụng' : 'Chọn'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lưu ý</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Thay đổi ngôn ngữ sẽ được áp dụng ngay lập tức cho toàn bộ ứng dụng</p>
          <p>• Cài đặt ngôn ngữ sẽ được lưu trong trình duyệt của bạn</p>
          <p>• Một số nội dung có thể vẫn hiển thị bằng ngôn ngữ gốc</p>
        </CardContent>
      </Card>
    </div>
  )
}
