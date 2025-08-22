"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User, Shield, MessageSquare, Key, Globe } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-muted-foreground">Quản lý cài đặt tài khoản và hệ thống</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/settings/profile">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-lg">{t('settings.profile')}</CardTitle>
                  <CardDescription>{t('settings.profileSubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/security">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle className="text-lg">{t('settings.security')}</CardTitle>
                  <CardDescription>{t('settings.securitySubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/communication">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-purple-500" />
                <div>
                  <CardTitle className="text-lg">{t('settings.communication')}</CardTitle>
                  <CardDescription>{t('settings.communicationSubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/permissions">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Key className="h-8 w-8 text-orange-500" />
                <div>
                  <CardTitle className="text-lg">{t('settings.permissions')}</CardTitle>
                  <CardDescription>{t('settings.permissionsSubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/language">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-red-500" />
                <div>
                  <CardTitle className="text-lg">{t('settings.language')}</CardTitle>
                  <CardDescription>{t('settings.languageSubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-gray-500" />
              <div>
                <CardTitle className="text-lg">Hệ thống</CardTitle>
                <CardDescription>Cài đặt hệ thống nâng cao</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" disabled>
              Sắp có
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
