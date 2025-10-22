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
import { Edit } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import API_URL from "@/config/api"
import provinces from "@/constant/donViHanhChinh34TinhThanh.json"
import vietQrBanks from "@/constant/vietQrBank.json"

type ShopDetail = {
  shopId: number
  shopName: string
  fullname: string
  phonenumber: string
  email?: string | null
  address?: string | null
  status: number
  productType?: string | null
  productId?: number | null
  expiredAt?: string | null
  createdAt?: string
  bankName?: string | null
  bankCode?: string | null
  bankNum?: string | null
  shopToken?: string | null
  qrcodeUrl?: string | null
  sepayApiKey?: string | null
}

type FormData = {
  shopName: string
  fullname: string
  phonenumber: string
  email: string
  houseNumber: string
  provinceCode: string
  wardCode: string
  status: number
  shopToken: string
  qrcodeUrl: string
  sepayApiKey: string
  bankCode: string
  bankNum: string
}

type EditShopDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shop: ShopDetail
  onShopUpdated: () => void
}

export function EditShopDialog({ open, onOpenChange, shop, onShopUpdated }: EditShopDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    shopName: '',
    fullname: '',
    phonenumber: '',
    email: '',
    houseNumber: '',
    provinceCode: '',
    wardCode: '',
    status: 1,
    shopToken: '',
    qrcodeUrl: '',
    sepayApiKey: '',
    bankCode: '',
    bankNum: ''
  })

  // Initialize form data when shop changes
  useEffect(() => {
    if (shop) {
      // Parse address to extract components
      const addressParts = shop.address?.split(', ') || []
      setFormData({
        shopName: shop.shopName || '',
        fullname: shop.fullname || '',
        phonenumber: shop.phonenumber || '',
        email: shop.email || '',
        houseNumber: addressParts[0] || '',
        provinceCode: '',
        wardCode: '',
        status: shop.status,
        shopToken: shop.shopToken || '',
        qrcodeUrl: shop.qrcodeUrl || '',
        sepayApiKey: shop.sepayApiKey || '',
        bankCode: shop.bankCode || '',
        bankNum: shop.bankNum || ''
      })
    }
  }, [shop])

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const selectedProvince = useMemo(() => {
    return provinces.find(p => p.code === formData.provinceCode) || null
  }, [formData.provinceCode])

  const wardOptions = useMemo(() => {
    return selectedProvince?.wards ?? []
  }, [selectedProvince])

  const selectedWard = useMemo(() => {
    return wardOptions.find(w => w.code === formData.wardCode) || null
  }, [wardOptions, formData.wardCode])

  const bankOptions = useMemo(() => {
    return vietQrBanks?.data ?? []
  }, [])

  const selectedBank = useMemo(() => {
    return bankOptions.find(b => b.bin === formData.bankCode) || null
  }, [bankOptions, formData.bankCode])

  const buildAddress = () => {
    const parts = []
    if (formData.houseNumber) parts.push(formData.houseNumber)
    const wardName = selectedWard?.name
    if (wardName) parts.push(wardName)
    if (selectedProvince?.fullName) parts.push(selectedProvince.fullName)
    return parts.join(', ')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        shopName: formData.shopName,
        fullname: formData.fullname,
        phonenumber: formData.phonenumber,
        email: formData.email,
        address: buildAddress(),
        status: formData.status,
        shopToken: formData.shopToken || null,
        qrcodeUrl: formData.qrcodeUrl || null,
        sepayApiKey: formData.sepayApiKey || null,
        bankName: selectedBank?.name || null,
        bankCode: selectedBank?.bin || null,
        bankNum: formData.bankNum || null
      }

      console.log('Updating shop with payload:', payload)

      const res = await fetch(`${API_URL}/api/shops/${shop.shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed with ${res.status}`)
      }

      onOpenChange(false)
      onShopUpdated()
      alert('Cập nhật cửa hàng thành công!')
    } catch (err) {
      console.error('Update shop failed:', err)
      alert('Cập nhật cửa hàng thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Chỉnh sửa cửa hàng
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cửa hàng {shop.shopName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Shop Name and Owner Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Tên cửa hàng *</Label>
                <Input
                  id="shopName"
                  value={formData.shopName}
                  onChange={(e) => handleInputChange('shopName', e.target.value)}
                  placeholder="VD: Cửa hàng ABC"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullname">Tên chủ cửa hàng *</Label>
                <Input
                  id="fullname"
                  value={formData.fullname}
                  onChange={(e) => handleInputChange('fullname', e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phonenumber">Số điện thoại *</Label>
                <Input
                  id="phonenumber"
                  type="tel"
                  value={formData.phonenumber}
                  onChange={(e) => handleInputChange('phonenumber', e.target.value)}
                  placeholder="VD: 0901234567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="VD: abc@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="houseNumber">Số nhà, đường *</Label>
              <Input
                id="houseNumber"
                value={formData.houseNumber}
                onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                placeholder="VD: 123 Nguyễn Huệ"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tỉnh/Thành *</Label>
                <Select
                  value={formData.provinceCode}
                  onValueChange={(value) => {
                    handleInputChange('provinceCode', value)
                    handleInputChange('wardCode', '') // Reset ward
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn Tỉnh/Thành" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(p => (
                      <SelectItem key={p.code} value={p.code}>{p.fullName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phường/Xã *</Label>
                <Select
                  value={formData.wardCode}
                  onValueChange={(value) => handleInputChange('wardCode', value)}
                  required
                  disabled={!wardOptions.length}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn Phường/Xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wardOptions.map(w => (
                      <SelectItem key={w.code} value={w.code}>{w.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bank Info */}
            <div className="space-y-2">
              <Label>Ngân hàng</Label>
              <Select
                value={formData.bankCode}
                onValueChange={(value) => handleInputChange('bankCode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngân hàng (tuỳ chọn)" />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map(b => (
                    <SelectItem key={b.bin} value={b.bin}>{b.shortName || b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankNum">Số tài khoản</Label>
              <Input
                id="bankNum"
                value={formData.bankNum}
                onChange={(e) => handleInputChange('bankNum', e.target.value)}
                placeholder="Nhập số tài khoản"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select
                value={formData.status.toString()}
                onValueChange={(value) => handleInputChange('status', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Không hoạt động</SelectItem>
                  <SelectItem value="1">Hoạt động</SelectItem>
                  <SelectItem value="2">Dùng thử</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Technical Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin kỹ thuật</h3>
              
              <div className="space-y-2">
                <Label htmlFor="shopToken">Shop Token</Label>
                <Input
                  id="shopToken"
                  value={formData.shopToken}
                  onChange={(e) => handleInputChange('shopToken', e.target.value)}
                  placeholder="Nhập Shop Token"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qrcodeUrl">QR Code URL</Label>
                <Input
                  id="qrcodeUrl"
                  value={formData.qrcodeUrl}
                  onChange={(e) => handleInputChange('qrcodeUrl', e.target.value)}
                  placeholder="Nhập QR Code URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sepayApiKey">Sepay API Key</Label>
                <Input
                  id="sepayApiKey"
                  value={formData.sepayApiKey}
                  onChange={(e) => handleInputChange('sepayApiKey', e.target.value)}
                  placeholder="Nhập Sepay API Key"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
