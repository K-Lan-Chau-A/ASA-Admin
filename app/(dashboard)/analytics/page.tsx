"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, TrendingUp, Users, Store, DollarSign, Package } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('analytics.title')}</h1>
        <p className="text-muted-foreground">{t('analytics.subtitle')}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('analytics.overview')}</TabsTrigger>
          <TabsTrigger value="revenue">{t('analytics.revenue')}</TabsTrigger>
          <TabsTrigger value="shops">{t('analytics.shops')}</TabsTrigger>
          <TabsTrigger value="packages">{t('analytics.packages')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.totalRevenue')}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫1,250,000,000</div>
                <p className="text-xs text-muted-foreground">+15.2% {t('analytics.fromLastYear')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.totalShops')}</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+8.3% {t('analytics.fromLastMonth')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.retentionRate')}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% {t('analytics.fromLastMonth')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.premiumPackages')}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67</div>
                <p className="text-xs text-muted-foreground">42.9% {t('analytics.totalShopsCount')}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('analytics.newVsRenewal')}</CardTitle>
                <CardDescription>{t('analytics.newVsRenewalSubtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-sm text-blue-600">{t('analytics.newRegistrations')}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">67</div>
                    <div className="text-sm text-purple-600">{t('analytics.renewals')}</div>
                  </div>
                </div>
                <div className="h-56">
                  <NewVsRenewalChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('analytics.areaDistribution')}</CardTitle>
                <CardDescription>{t('analytics.areaDistributionSubtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { district: t('analytics.district1'), count: 28, percentage: 17.9 },
                    { district: t('analytics.district3'), count: 25, percentage: 16.0 },
                    { district: t('analytics.district5'), count: 22, percentage: 14.1 },
                    { district: t('analytics.district10'), count: 20, percentage: 12.8 },
                    { district: t('analytics.district7'), count: 18, percentage: 11.5 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.district}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.revenueChart')}</CardTitle>
              <CardDescription>{t('analytics.revenueChartSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <RevenueChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.shopPackageChart')}</CardTitle>
              <CardDescription>{t('analytics.shopPackageChartSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ShopPackageChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.packagePerformance')}</CardTitle>
              <CardDescription>{t('analytics.packagePerformanceSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PackagePerformanceChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Revenue Chart Component
function RevenueChart() {
  const { t } = useLanguage()
  
  const data = [
    { month: 'T1', revenue: 125, target: 120 },
    { month: 'T2', revenue: 135, target: 125 },
    { month: 'T3', revenue: 142, target: 130 },
    { month: 'T4', revenue: 138, target: 135 },
    { month: 'T5', revenue: 155, target: 140 },
    { month: 'T6', revenue: 168, target: 145 },
    { month: 'T7', revenue: 175, target: 150 },
    { month: 'T8', revenue: 182, target: 155 },
    { month: 'T9', revenue: 195, target: 160 },
    { month: 'T10', revenue: 208, target: 165 },
    { month: 'T11', revenue: 220, target: 170 },
    { month: 'T12', revenue: 250, target: 175 }
  ]

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">₫2.5T</div>
          <div className="text-sm text-blue-600">{t('analytics.totalRevenueYear')}</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">+15.2%</div>
          <div className="text-sm text-green-600">{t('analytics.growth')}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">₫208M</div>
          <div className="text-sm text-purple-600">{t('analytics.averagePerMonth')}</div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`₫${value}M`, t('analytics.revenueAmount')]}
              labelFormatter={(label) => `${t('analytics.month')} ${label}`}
            />
            <Bar dataKey="revenue" fill="#3b82f6" name={t('analytics.revenueActual')} />
            <Bar dataKey="target" fill="#10b981" name={t('analytics.target')} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// New vs Renewal Chart
function NewVsRenewalChart() {
  const { t } = useLanguage()
  const data = [
    { month: 'T1', new: 8, renewal: 5 },
    { month: 'T2', new: 10, renewal: 6 },
    { month: 'T3', new: 12, renewal: 7 },
    { month: 'T4', new: 9, renewal: 8 },
    { month: 'T5', new: 14, renewal: 9 },
    { month: 'T6', new: 16, renewal: 11 },
    { month: 'T7', new: 15, renewal: 12 },
    { month: 'T8', new: 17, renewal: 13 },
    { month: 'T9', new: 18, renewal: 14 },
    { month: 'T10', new: 19, renewal: 16 },
    { month: 'T11', new: 20, renewal: 15 },
    { month: 'T12', new: 22, renewal: 17 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => [value, 'Shops']} labelFormatter={(l) => `${t('analytics.month')} ${l}`} />
        <Bar dataKey="new" name={t('analytics.newRegistrations')} fill="#3b82f6" />
        <Bar dataKey="renewal" name={t('analytics.renewals')} fill="#8b5cf6" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

// Shop Package Chart Component
function ShopPackageChart() {
  const { t } = useLanguage()
  
  const data = [
    { name: t('analytics.basicPackage'), value: 89, color: '#3b82f6' },
    { name: t('analytics.premiumPackage'), value: 67, color: '#8b5cf6' }
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{data[0].value}</div>
          <div className="text-sm text-blue-600">{t('analytics.basicPackage')}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{data[1].value}</div>
          <div className="text-sm text-purple-600">{t('analytics.premiumPackage')}</div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [value, t('analytics.shopCount')]} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Package Performance Chart Component
function PackagePerformanceChart() {
  const { t } = useLanguage()
  
  const data = [
    { month: 'T1', basic: 75, premium: 45 },
    { month: 'T2', basic: 78, premium: 48 },
    { month: 'T3', basic: 82, premium: 52 },
    { month: 'T4', basic: 79, premium: 50 },
    { month: 'T5', basic: 85, premium: 55 },
    { month: 'T6', basic: 89, premium: 58 },
    { month: 'T7', basic: 87, premium: 60 },
    { month: 'T8', basic: 91, premium: 62 },
    { month: 'T9', basic: 88, premium: 65 },
    { month: 'T10', basic: 93, premium: 67 },
    { month: 'T11', basic: 89, premium: 64 },
    { month: 'T12', basic: 89, premium: 67 }
  ]

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">89</div>
          <div className="text-sm text-blue-600">{t('analytics.basicPackage')}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">67</div>
          <div className="text-sm text-purple-600">{t('analytics.premiumPackage')}</div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [value, t('analytics.shopCount')]}
              labelFormatter={(label) => `${t('analytics.month')} ${label}`}
            />
            <Line type="monotone" dataKey="basic" stroke="#3b82f6" name={t('analytics.basicPackage')} strokeWidth={2} />
            <Line type="monotone" dataKey="premium" stroke="#8b5cf6" name={t('analytics.premiumPackage')} strokeWidth={2} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
