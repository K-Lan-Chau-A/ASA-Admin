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

interface User {
  id: string
  name: string
  email: string
  role: "super-admin" | "admin" | "support"
  phone: string
  status: "working" | "suspended"
}

const users: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@posadmin.com",
    role: "super-admin",
    phone: "0901234567",
    status: "working",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@posadmin.com",
    role: "admin",
    phone: "0901234568",
    status: "working",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@posadmin.com",
    role: "admin",
    phone: "0901234569",
    status: "working",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@posadmin.com",
    role: "support",
    phone: "0901234570",
    status: "working",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@posadmin.com",
    role: "support",
    phone: "0901234571",
    status: "suspended",
  },
  {
    id: "6",
    name: "Võ Thị F",
    email: "vothif@posadmin.com",
    role: "support",
    phone: "0901234572",
    status: "working",
  },
  {
    id: "7",
    name: "Đặng Văn G",
    email: "dangvang@posadmin.com",
    role: "admin",
    phone: "0901234573",
    status: "working",
  },
  {
    id: "8",
    name: "Bùi Thị H",
    email: "buithih@posadmin.com",
    role: "support",
    phone: "0901234574",
    status: "working",
  },
]

export default function UsersPage() {
  const { t } = useLanguage()

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
