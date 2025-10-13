"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserCog, Shield, UserCheck, UserX } from "lucide-react"
import Link from "next/link"
import { CreateUserDialog } from "@/components/create-user-dialog"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import { useEffect, useMemo, useState } from "react"

type ApiUser = {
  userId: number
  username: string
  fullName: string
  email: string
  phoneNumber: string
  status: number // 1 working, others suspended
  role: number // 1 super-admin, 2 admin, 3 support, 4 customer
  avatar?: string
}

export default function UsersPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ApiUser[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_URL}/api/users?page=1&pageSize=10`)
        const json = await res.json().catch(() => ({}))
        const arr: any[] = Array.isArray(json?.items) ? json.items : []
        setItems(arr as any)
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load users')
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const users = useMemo(() => {
    const mapRole = (code: number): "super-admin" | "admin" | "support" => {
      if (code === 1) return "super-admin"
      if (code === 2) return "admin"
      return "support"
    }
    return items.map((u) => ({
      id: String(u.userId),
      name: u.fullName || u.username,
      email: u.email,
      role: mapRole(Number(u.role || 0)),
      phone: u.phoneNumber,
      status: Number(u.status) === 1 ? "working" as const : "suspended" as const,
    }))
  }, [items])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super-admin":
        return <Shield className="h-4 w-4 text-red-500" />
      case "admin":
        return <UserCheck className="h-4 w-4 text-blue-500" />
      case "support":
        return <UserX className="h-4 w-4 text-green-500" />
      default:
        return <UserCog className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "super-admin":
        return t('users.superAdmin')
      case "admin":
        return t('users.admin')
      case "support":
        return t('users.support')
      default:
        return role
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "working":
        return t('users.working')
      case "suspended":
        return t('users.suspended')
      default:
        return status
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('users.title')}</h1>
          <p className="text-muted-foreground">{t('users.subtitle')}</p>
        </div>
        <CreateUserDialog />
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('users.searchEmployee')} className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                {t('users.export')}
              </Button>
              <Button variant="outline" size="sm">
                {t('users.filter')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[800px]">
            {error && (
              <div className="px-4 py-2 text-sm text-red-600">{error}</div>
            )}
            {loading && (
              <div className="px-4 py-2 text-sm text-muted-foreground">{t('common.loading')}...</div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('users.fullName')}</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>{t('users.role')}</TableHead>
                  <TableHead>{t('users.phoneNumber')}</TableHead>
                  <TableHead>{t('users.status')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span>{getRoleText(user.role)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "working" ? "default" : "secondary"}>
                        {getStatusText(user.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t('common.edit')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
