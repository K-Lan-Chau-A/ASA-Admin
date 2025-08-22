"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useLanguage } from "@/contexts/language-context"

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

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₫${(value / 1000000).toFixed(0)}M`}
        />
        <Tooltip 
          formatter={(value: number) => [`₫${value.toLocaleString()}`, t('common.amount')]}
          labelFormatter={(label) => `Tháng ${label}`}
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
