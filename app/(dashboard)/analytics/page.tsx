"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, PieChart, TrendingUp, Users, Store, DollarSign, Package } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'
import { useState, useEffect } from 'react'
import API_URL from '@/config/api'

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [overviewData, setOverviewData] = useState({
    totalRevenue: 0,
    totalShops: 0,
    trialPackages: 0,
    premiumPackages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true)
        
        // Fetch monthly revenue
        const revenueRes = await fetch(`${API_URL}/api/reports/monthly-revenue`)
        const revenueJson = await revenueRes.json()
        
        // Fetch shop by package
        const packageRes = await fetch(`${API_URL}/api/reports/shop-by-package`)
        const packageJson = await packageRes.json()
        
        // Calculate total revenue (sum of 12 months)
        let totalRevenue = 0
        if (revenueJson.success && revenueJson.data) {
          totalRevenue = revenueJson.data.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0)
        }
        
        // Calculate total shops, trial, and premium
        let totalShops = 0
        let trialPackages = 0
        let premiumPackages = 0
        
        if (packageJson.success && packageJson.data) {
          totalShops = packageJson.data.reduce((sum: number, item: { count: number }) => sum + item.count, 0)
          
          // Find trial packages
          const trialItem = packageJson.data.find((item: { packageName: string }) => 
            item.packageName.toLowerCase().includes('trial')
          )
          trialPackages = trialItem ? trialItem.count : 0
          
          // Find premium packages
          const premiumItem = packageJson.data.find((item: { packageName: string }) => 
            item.packageName.toLowerCase().includes('premium')
          )
          premiumPackages = premiumItem ? premiumItem.count : 0
        }
        
        setOverviewData({
          totalRevenue,
          totalShops,
          trialPackages,
          premiumPackages
        })
      } catch (error) {
        console.error('Failed to fetch overview data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOverviewData()
  }, [])

  // Format currency helper
  const formatCurrency = (value: number) => {
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `${formatted}đ`
  }

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
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.totalRevenue')}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : formatCurrency(overviewData.totalRevenue)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.totalShops')}</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : overviewData.totalShops}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gói dùng thử</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : overviewData.trialPackages}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('analytics.premiumPackages')}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : overviewData.premiumPackages}</div>
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
                <NewVsRenewalSection />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('analytics.areaDistribution')}</CardTitle>
                <CardDescription>{t('analytics.areaDistributionSubtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaDistributionSection />
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
      </Tabs>
    </div>
  )
}

// Revenue Chart Component
function RevenueChart() {
  const { t } = useLanguage()
  const [chartData, setChartData] = useState<Array<{ month: string, revenue: number }>>([])
  const [summary, setSummary] = useState({ totalRevenue: 0, averagePerMonth: 0 })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reports/monthly-revenue`)
        const json = await res.json()
        
        if (json.success && json.data) {
          // Transform API data to chart format
          const transformedData = json.data.map((item: { month: string, revenue: number }) => {
            // Convert "2025-10" to "10-2025"
            const [year, month] = item.month.split('-')
            const formattedMonth = `${month}-${year}`
            
            return {
              month: formattedMonth,
              revenue: item.revenue
            }
          })
          setChartData(transformedData)
          
          // Calculate summary statistics
          const totalRevenue = json.data.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0)
          const averagePerMonth = totalRevenue / json.data.length
          setSummary({ 
            totalRevenue, 
            averagePerMonth: averagePerMonth || 0 
          })
        }
      } catch (error) {
        console.error('Failed to fetch revenue data:', error)
        setChartData([])
        setSummary({ totalRevenue: 0, averagePerMonth: 0 })
      } finally {
        setLoading(false)
      }
    }
    
    fetchRevenueData()
  }, [])

  // Format currency with dots as thousands separator
  const formatCurrency = (value: number) => {
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `${formatted}đ`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalRevenue)}</div>
          <div className="text-sm text-blue-600">{t('analytics.totalRevenueYear')}</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">-</div>
          <div className="text-sm text-green-600">{t('analytics.growth')}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(summary.averagePerMonth)}</div>
          <div className="text-sm text-purple-600">{t('analytics.averagePerMonth')}</div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), t('analytics.revenueAmount')]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="revenue" fill="#3b82f6" name={t('analytics.revenueActual')} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// New vs Renewal Section with Chart
function NewVsRenewalSection() {
  const { t } = useLanguage()
  const [summary, setSummary] = useState({ totalNewShops: 0, totalRenewalShops: 0 })
  const [chartData, setChartData] = useState<Array<{ month: string, new: number, renewal: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reports/shop-new-vs-renewal`)
        const json = await res.json()
        
        if (json.success && json.data) {
          // Set summary
          setSummary(json.data.summary || { totalNewShops: 0, totalRenewalShops: 0 })
          
          // Transform monthly data for chart
          const transformedData = json.data.monthlyData.map((item: { month: string, newShops: number, renewalShops: number }) => ({
            month: item.month,
            new: item.newShops,
            renewal: item.renewalShops
          }))
          setChartData(transformedData.reverse())
        }
      } catch (error) {
        console.error('Failed to fetch shop new vs renewal data:', error)
        setSummary({ totalNewShops: 0, totalRenewalShops: 0 })
        setChartData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{summary.totalNewShops}</div>
          <div className="text-sm text-blue-600">{t('analytics.newRegistrations')}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{summary.totalRenewalShops}</div>
          <div className="text-sm text-purple-600">{t('analytics.renewals')}</div>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [value, 'Shops']} labelFormatter={(l) => l} />
            <Bar dataKey="new" name={t('analytics.newRegistrations')} fill="#3b82f6" />
            <Bar dataKey="renewal" name={t('analytics.renewals')} fill="#8b5cf6" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

// Area Distribution Section
function AreaDistributionSection() {
  const [provinceData, setProvinceData] = useState<Array<{ province: string, count: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reports/shop-by-province`)
        const json = await res.json()
        
        if (json.success && json.data) {
          setProvinceData(json.data)
        }
      } catch (error) {
        console.error('Failed to fetch shop by province data:', error)
        setProvinceData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const total = provinceData.reduce((sum, item) => sum + item.count, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {provinceData.map((item, index) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0
        return (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{item.province}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{item.count}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Shop Package Chart Component
function ShopPackageChart() {
  const { t } = useLanguage()
  const [shopData, setShopData] = useState<Array<{ name: string, value: number, color: string }>>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchShopByPackage = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reports/shop-by-package`)
        const json = await res.json()
        
        if (json.success && json.data) {
          // Transform API data to chart format
          const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
          const transformedData = json.data.map((item: { packageName: string, count: number }, index: number) => ({
            name: item.packageName,
            value: item.count,
            color: colors[index % colors.length]
          }))
          setShopData(transformedData)
        }
      } catch (error) {
        console.error('Failed to fetch shop by package data:', error)
        // Fallback to empty data on error
        setShopData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchShopByPackage()
  }, [])

  const total = shopData.reduce((sum, item) => sum + item.value, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const gridColsClass = shopData.length === 1 ? 'grid-cols-1' 
    : shopData.length === 2 ? 'grid-cols-2' 
    : shopData.length === 3 ? 'grid-cols-3' 
    : 'grid-cols-4'

  return (
    <div className="w-full h-full">
      <div className={`grid ${gridColsClass} gap-4 mb-6`}>
        {shopData.map((item, index) => (
          <div key={index} className="text-center p-3 bg-blue-50 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
            <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
            <div className="text-sm" style={{ color: item.color }}>{item.name}</div>
          </div>
        ))}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={shopData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {shopData.map((entry, index) => (
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

