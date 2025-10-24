"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Upload, X, Edit } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import API_URL from "@/config/api"
import { toast } from "@/hooks/use-toast"
import { usersTranslations } from "@/lib/users-i18n"

interface User {
  userId: number
  username: string
  fullName: string
  email: string
  phoneNumber: string
  status: number
  role: number
  avatar?: string
}

interface EditUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserUpdated?: () => void
}

export function EditUserDialog({ user, open, onOpenChange, onUserUpdated }: EditUserDialogProps) {
  const { language } = useLanguage()
  const ut = usersTranslations[language]
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    role: '1',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        role: String(user.role || 1),
      })
      setAvatarPreview(user.avatar || null)
      setAvatarFile(null)
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

    // Validation
    if (!formData.username || !formData.email || !formData.fullName || !formData.phoneNumber) {
      toast({
        title: ut.error,
        description: ut.fillAllFields,
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('username', formData.username)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('phoneNumber', formData.phoneNumber)
      formDataToSend.append('role', formData.role)
      
      if (avatarFile) {
        formDataToSend.append('avatarFile', avatarFile)
      }

      const response = await fetch(`${API_URL}/api/users/${user.userId}`, {
        method: 'PUT',
        body: formDataToSend,
      })

      if (response.ok) {
        toast({
          title: ut.success,
          description: ut.updateSuccess
        })
        onOpenChange(false)
        onUserUpdated?.()
      } else {
        const errorData = await response.json().catch(() => ({}))
        toast({
          title: ut.error,
          description: errorData.message || ut.updateError,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: ut.error,
        description: ut.generalError,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {ut.editUser}
          </DialogTitle>
          <DialogDescription>
            {ut.editUserDescription} {user.fullName || user.username}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {ut.username} {ut.required}
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={ut.usernamePlaceholder}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {ut.email} {ut.required}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={ut.emailPlaceholder}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                {ut.fullName} {ut.required}
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder={ut.fullNamePlaceholder}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                {ut.phoneNumber} {ut.required}
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder={ut.phonePlaceholder}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {ut.role} {ut.required}
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={ut.selectRole} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{ut.admin}</SelectItem>
                  <SelectItem value="2">{ut.staff}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                {ut.avatar}
              </Label>
              <div className="col-span-3">
                {avatarPreview ? (
                  <div className="flex items-center gap-2">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('avatar')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {ut.changeImage}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeAvatar}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {ut.removeImage}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('avatar')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {ut.chooseImage}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {ut.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? ut.updating : ut.update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
