"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoreIcon, WalletIcon, PackageIcon, TrendingUpIcon } from "lucide-react"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from 'react'
import API_URL from '@/config/api'

export default function DashboardPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('daily')
  const [reportData, setReportData] = useState({
    today: { newShops: 0, activeShops: 0, revenue: 0, premiumSold: 0 },
    week: { newShops: 0, activeShops: 0, revenue: 0, premiumSold: 0 },
    month: { newShops: 0, activeShops: 0, revenue: 0, premiumSold: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reports/get-report-data`)
        const json = await res.json()
        
        if (json.success && json.data) {
          setReportData(json.data)
        }
      } catch (error) {
        console.error('Failed to fetch report data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchReportData()
  }, [])

  // Format currency with dots as thousands separator
  const formatCurrency = (value: number) => {
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `₫${formatted}`
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">{t('dashboard.daily')}</TabsTrigger>
            <TabsTrigger value="weekly">{t('dashboard.weekly')}</TabsTrigger>
            <TabsTrigger value="monthly">{t('dashboard.monthly')}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.newShopsToday')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.today.newShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.totalActiveShops')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.today.activeShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.revenueToday')}</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : formatCurrency(reportData.today.revenue)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.premiumPackages')}</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.today.premiumSold}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.newShopsThisWeek')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.week.newShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.totalActiveShops')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.week.activeShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.revenueThisWeek')}</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : formatCurrency(reportData.week.revenue)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.premiumPackages')}</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.week.premiumSold}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.newShopsThisMonth')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.month.newShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.totalActiveShops')}</CardTitle>
                <StoreIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.month.activeShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.revenueThisMonth')}</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : formatCurrency(reportData.month.revenue)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{t('dashboard.premiumPackages')}</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? '...' : reportData.month.premiumSold}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-foreground">{t('dashboard.revenueOverview')}</CardTitle>
            <CardDescription>{t('dashboard.revenueOverviewSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-foreground">{t('dashboard.recentShopActivities')}</CardTitle>
            <CardDescription>{t('dashboard.recentShopActivitiesSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
