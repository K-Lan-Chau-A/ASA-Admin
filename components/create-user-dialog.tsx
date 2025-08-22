"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function CreateUserDialog() {
  const { t } = useLanguage()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('users.addEmployee')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{t('users.addEmployee')}</DialogTitle>
          <DialogDescription>
            Thêm nhân viên mới vào hệ thống. Họ sẽ nhận email để thiết lập tài khoản.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              {t('common.name')}
            </Label>
            <Input
              id="firstName"
              placeholder="Nhập tên"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="surname" className="text-right">
              Họ
            </Label>
            <Input
              id="surname"
              placeholder="Nhập họ"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              {t('users.role')}
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super-admin">{t('users.superAdmin')}</SelectItem>
                <SelectItem value="admin">{t('users.admin')}</SelectItem>
                <SelectItem value="support">{t('users.support')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              {t('users.phoneNumber')}
            </Label>
            <Input
              id="phone"
              placeholder="0901234567"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Phòng ban
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn phòng ban" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">Công nghệ thông tin</SelectItem>
                <SelectItem value="business">Kinh doanh</SelectItem>
                <SelectItem value="support">Hỗ trợ khách hàng</SelectItem>
                <SelectItem value="finance">Tài chính</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{t('users.addEmployee')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
