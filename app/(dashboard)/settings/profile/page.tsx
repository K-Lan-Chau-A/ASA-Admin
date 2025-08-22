"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function ProfileSettingsPage() {
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('settings.profile')}</h1>
          <p className="text-muted-foreground">{t('settings.profileSubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t('settings.personalInfo')}
                  </CardTitle>
                  <CardDescription>{t('settings.updatePersonalInfo')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('settings.firstName')}</Label>
                <Input id="firstName" defaultValue="Nguyễn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('settings.lastName')}</Label>
                <Input id="lastName" defaultValue="Văn A" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input id="email" type="email" defaultValue="nguyenvana@posadmin.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('users.phoneNumber')}</Label>
              <Input id="phone" defaultValue="0901234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t('common.address')}</Label>
              <Input id="address" defaultValue="123 Nguyễn Huệ, Q1, TP.HCM" />
            </div>
            <Button className="w-full">{t('settings.updateInfo')}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t('settings.contactInfo')}
            </CardTitle>
            <CardDescription>{t('settings.manageContactInfo')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workEmail">{t('settings.workEmail')}</Label>
              <Input id="workEmail" type="email" defaultValue="admin@posadmin.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workPhone">{t('settings.workPhone')}</Label>
              <Input id="workPhone" defaultValue="0901234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">{t('settings.emergencyContact')}</Label>
              <Input id="emergencyContact" defaultValue="0901234568" />
            </div>
            <Button variant="outline" className="w-full">{t('settings.updateContact')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
