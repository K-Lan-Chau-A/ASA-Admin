"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

const data = [
  {
    month: "T1",
    revenue: 45000000,
  },
  {
    month: "T2",
    revenue: 52000000,
  },
  {
    month: "T3",
    revenue: 48000000,
  },
  {
    month: "T4",
    revenue: 61000000,
  },
  {
    month: "T5",
    revenue: 55000000,
  },
  {
    month: "T6",
    revenue: 67000000,
  },
  {
    month: "T7",
    revenue: 72000000,
  },
  {
    month: "T8",
    revenue: 68000000,
  },
  {
    month: "T9",
    revenue: 75000000,
  },
  {
    month: "T10",
    revenue: 82000000,
  },
  {
    month: "T11",
    revenue: 78000000,
  },
  {
    month: "T12",
    revenue: 95000000,
  },
]

export function DashboardChart() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  // Theme-aware colors
  const textColor = theme === "dark" ? "#e5e7eb" : "#374151"
  const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af"

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
          tickFormatter={(value) => `₫${(value / 1000000).toFixed(0)}M`}
        />
        <Tooltip 
          formatter={(value: number) => [`₫${value.toLocaleString()}`, t('common.amount')]}
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
