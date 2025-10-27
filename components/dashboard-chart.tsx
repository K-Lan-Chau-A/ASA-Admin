"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { useState, useEffect } from 'react'
import API_URL from '@/config/api'

export function DashboardChart() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [chartData, setChartData] = useState<Array<{ month: string, revenue: number }>>([])
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
            // Convert "2025-10" to "T10"
            const [year, month] = item.month.split('-')
            const monthNum = parseInt(month)
            const formattedMonth = `${monthNum}`
            
            return {
              month: formattedMonth,
              revenue: item.revenue
            }
          })
          setChartData(transformedData)
        }
      } catch (error) {
        console.error('Failed to fetch monthly revenue data:', error)
        setChartData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchRevenueData()
  }, [])

  // Format currency helper
  const formatCurrency = (value: number) => {
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `₫${formatted}`
  }

  // Theme-aware colors
  const textColor = theme === "dark" ? "#e5e7eb" : "#374151"
  const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af"

  // Calculate Y-axis domain dynamically based on data
  const calculateYAxisDomain = () => {
    if (chartData.length === 0) return [0, 1000000]
    
    const maxRevenue = Math.max(...chartData.map(item => item.revenue))
    
    // If maxRevenue is less than 1 million, use smaller scale
    if (maxRevenue < 1000000) {
      // Round up to nearest 100k
      const roundUp = Math.ceil(maxRevenue / 100000) * 100000
      return [0, roundUp]
    }
    
    // For larger values, add 20% padding
    const padding = maxRevenue * 0.2
    const maxValue = maxRevenue + padding
    
    return [0, maxValue]
  }

  const yAxisDomain = calculateYAxisDomain()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="month"
          stroke={axisColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: textColor }}
        />
        <YAxis
          stroke={axisColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: textColor }}
          tickFormatter={(value) => {
            const millions = value / 1000000
            // Show decimal if less than 1
            if (millions < 1) {
              return `₫${millions.toFixed(1)}M`
            }
            return `₫${millions.toFixed(0)}M`
          }}
          domain={yAxisDomain}
          allowDecimals={true}
        />
        <Tooltip 
          formatter={(value: number) => [formatCurrency(value), t('common.amount')]}
          labelFormatter={(label) => `Tháng ${label}`}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
            borderRadius: "8px",
            color: textColor
          }}
        />
        <Bar
          dataKey="revenue"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
