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
import { useLanguage } from "@/contexts/language-context"
import { shopsTranslations } from "@/lib/shops-i18n"

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
  const { language } = useLanguage()
  const st = shopsTranslations[language]
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
      alert(st.updateSuccess)
    } catch (err) {
      console.error('Update shop failed:', err)
      alert(st.updateError)
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
            {st.editShop}
          </DialogTitle>
          <DialogDescription>
            {st.editShopDescription} {shop.shopName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Shop Name and Owner Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">{st.shopName} {st.required}</Label>
                <Input
                  id="shopName"
                  value={formData.shopName}
                  onChange={(e) => handleInputChange('shopName', e.target.value)}
                  placeholder={st.shopNamePlaceholder}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullname">{st.ownerName} {st.required}</Label>
                <Input
                  id="fullname"
                  value={formData.fullname}
                  onChange={(e) => handleInputChange('fullname', e.target.value)}
                  placeholder={st.ownerNamePlaceholder}
                  required
                />
              </div>
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phonenumber">{st.phoneNumber} {st.required}</Label>
                <Input
                  id="phonenumber"
                  type="tel"
                  value={formData.phonenumber}
                  onChange={(e) => handleInputChange('phonenumber', e.target.value)}
                  placeholder={st.phonePlaceholder}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{st.email} {st.required}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={st.emailPlaceholder}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="houseNumber">{st.address} {st.required}</Label>
              <Input
                id="houseNumber"
                value={formData.houseNumber}
                onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                placeholder={st.addressPlaceholder}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{st.province} {st.required}</Label>
                <Select
                  value={formData.provinceCode}
                  onValueChange={(value) => {
                    handleInputChange('provinceCode', value)
                    handleInputChange('wardCode', '') // Reset ward
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={st.selectProvince} />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(p => (
                      <SelectItem key={p.code} value={p.code}>{p.fullName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{st.district} {st.required}</Label>
                <Select
                  value={formData.wardCode}
                  onValueChange={(value) => handleInputChange('wardCode', value)}
                  required
                  disabled={!wardOptions.length}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={st.selectDistrict} />
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
              <Label>{st.bankName}</Label>
              <Select
                value={formData.bankCode}
                onValueChange={(value) => handleInputChange('bankCode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={st.selectBank} />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map(b => (
                    <SelectItem key={b.bin} value={b.bin}>{b.shortName || b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankNum">{st.accountNumber}</Label>
              <Input
                id="bankNum"
                value={formData.bankNum}
                onChange={(e) => handleInputChange('bankNum', e.target.value)}
                placeholder={st.accountNumberPlaceholder}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>{st.status}</Label>
              <Select
                value={formData.status.toString()}
                onValueChange={(value) => handleInputChange('status', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={st.selectStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{st.inactive}</SelectItem>
                  <SelectItem value="1">{st.active}</SelectItem>
                  <SelectItem value="2">{st.trial}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Technical Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{st.technicalInfo}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="shopToken">{st.shopToken}</Label>
                <Input
                  id="shopToken"
                  value={formData.shopToken}
                  onChange={(e) => handleInputChange('shopToken', e.target.value)}
                  placeholder={st.shopTokenPlaceholder}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qrcodeUrl">{st.qrCodeUrl}</Label>
                <Input
                  id="qrcodeUrl"
                  value={formData.qrcodeUrl}
                  onChange={(e) => handleInputChange('qrcodeUrl', e.target.value)}
                  placeholder={st.qrCodeUrlPlaceholder}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sepayApiKey">{st.sepayApiKey}</Label>
                <Input
                  id="sepayApiKey"
                  value={formData.sepayApiKey}
                  onChange={(e) => handleInputChange('sepayApiKey', e.target.value)}
                  placeholder={st.sepayApiKeyPlaceholder}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {st.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? st.updating : st.update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
