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
import { Store, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useMemo, useEffect } from "react"
import API_URL from "@/config/api"
import provinces from "@/constant/donViHanhChinh34TinhThanh.json"
import vietQrBanks from "@/constant/vietQrBank.json"

type FormData = {
  businessName: string
  ownerName: string
  phone: string
  email: string
  houseNumber: string
  provinceCode: string
  wardCode: string
  wardName: string
  bankCode: string
  bankNum: string
  status: number
  productId: number
  shopToken?: string
  qrcodeUrl?: string
  sepayApiKey?: string
}

type Product = {
  productId: number
  productName: string
  description: string
  price: number
  requestLimit: number
  accountLimit: number
  createdAt: string
  updatedAt: string
  discount: number
  status: number
  qrcodeUrl: string
  promotionValue: number
  promotionType: string
  features: Array<{
    featureId: number
    featureName: string
    description: string
    createdAt: string
    updatedAt: string
    isActive: boolean
  }>
}

type CreateShopDialogProps = {
  onShopCreated?: () => void
  trialMode?: boolean
}

export function CreateShopDialog({ onShopCreated, trialMode = false }: CreateShopDialogProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({
    show: false,
    type: 'success',
    message: ''
  })
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    houseNumber: '',
    provinceCode: '',
    wardCode: '',
    wardName: '',
    bankCode: '',
    bankNum: '',
    status: trialMode ? 2 : 0, 
    productId: trialMode ? 1 : 0,
    shopToken: '',
    qrcodeUrl: '',
    sepayApiKey: '' 
  })

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      show: true,
      type,
      message
    })
    // Auto hide after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // Load products when dialog opens (skip in trial mode)
  useEffect(() => {
    if (open && !trialMode) {
      const loadProducts = async () => {
        try {
          setLoadingProducts(true)
          const res = await fetch(`${API_URL}/api/products?page=1&pageSize=10`)
          if (res.ok) {
            const data = await res.json()
            setProducts(data.items || [])
            if (data.items && data.items.length > 0) {
              setFormData(prev => ({ ...prev, productId: data.items[0].productId }))
            }
          }
        } catch (error) {
          console.error('Failed to load products:', error)
        } finally {
          setLoadingProducts(false)
        }
      }
      loadProducts()
    }
    // Force trial status/product when in trial mode
    if (open && trialMode) {
      setFormData(prev => ({ ...prev, status: 2, productId: 1 }))
    }
  }, [open, trialMode])

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
    const wardName = formData.wardName || selectedWard?.name
    if (wardName) parts.push(wardName)
    if (selectedProvince?.fullName) parts.push(selectedProvince.fullName)
    return parts.join(', ')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate product only when not in trial mode
    if (!trialMode && formData.productId === 0) {
      showNotification('error', 'Vui lòng chọn gói sản phẩm')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const selectedProduct = trialMode ? undefined : products.find(p => p.productId === formData.productId)
      
      const payload: any = {
        shopName: formData.businessName,
        fullname: formData.ownerName,
        phonenumber: formData.phone,
        email: formData.email,
        address: buildAddress(),
        status: trialMode ? 2 : formData.status,
        bankName: selectedBank?.name ?? '',
        bankCode: selectedBank?.bin ?? '',
        bankNum: formData.bankNum,
        productId: trialMode ? 1 : formData.productId,
        productType: selectedProduct?.productName ?? ''
      }

      // Conditionally include optional technical fields only when filled
      if (formData.shopToken && formData.shopToken.trim().length > 0) {
        payload.shopToken = formData.shopToken.trim()
      }
      if (formData.qrcodeUrl && formData.qrcodeUrl.trim().length > 0) {
        payload.qrcodeUrl = formData.qrcodeUrl.trim()
      }
      if (formData.sepayApiKey && formData.sepayApiKey.trim().length > 0) {
        payload.sepayApiKey = formData.sepayApiKey.trim()
      }

      console.log('Creating shop with payload:', payload)

      const res = await fetch(`${API_URL}/api/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed with ${res.status}`)
      }

      // Reset form and close dialog
      setFormData({
        businessName: '',
        ownerName: '',
        phone: '',
        email: '',
        houseNumber: '',
        provinceCode: '',
        wardCode: '',
        wardName: '',
        bankCode: '',
        bankNum: '',
        status: trialMode ? 2 : 1,
        productId: trialMode ? 1 : 0
      })
      setOpen(false)
      
      // Notify parent component to refresh the list
      if (onShopCreated) {
        onShopCreated()
      }

      showNotification('success', 'Tạo cửa hàng thành công!')
    } catch (err) {
      console.error('Create shop failed:', err)
      showNotification('error', 'Tạo cửa hàng thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('shops.addShop')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Tạo cửa hàng mới
            </DialogTitle>
            <DialogDescription>
              Thêm cửa hàng mới vào hệ thống với đầy đủ thông tin.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Shop Name and Owner Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Tên cửa hàng *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="VD: Cửa hàng ABC"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Tên chủ cửa hàng *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    required
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
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
                    onValueChange={(value) => handleInputChange('provinceCode', value)}
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
                    onValueChange={(value) => {
                      const ward = wardOptions.find(w => w.code === value)
                      handleInputChange('wardCode', value)
                      handleInputChange('wardName', ward?.name || '')
                    }}
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
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* Status and Product */}
              <div className="grid grid-cols-2 gap-4">
                {/* Technical optional fields shown here for convenience */}
                <div className="space-y-2">
                  <Label htmlFor="shopToken">Shop Token (tuỳ chọn)</Label>
                  <Input
                    id="shopToken"
                    value={formData.shopToken || ''}
                    onChange={(e) => handleInputChange('shopToken', e.target.value)}
                    placeholder="Nhập Shop Token nếu có"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qrcodeUrl">QR Code URL (tuỳ chọn)</Label>
                  <Input
                    id="qrcodeUrl"
                    value={formData.qrcodeUrl || ''}
                    onChange={(e) => handleInputChange('qrcodeUrl', e.target.value)}
                    placeholder="Nhập URL QR nếu có"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sepayApiKey">Sepay API Key (tuỳ chọn)</Label>
                  <Input
                    id="sepayApiKey"
                    value={formData.sepayApiKey || ''}
                    onChange={(e) => handleInputChange('sepayApiKey', e.target.value)}
                    placeholder="Nhập Sepay API Key nếu có"
                  />
                </div>
                {!trialMode && (
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
                )}
                {!trialMode && (
                  <div className="space-y-2">
                    <Label>Gói sản phẩm *</Label>
                    <Select
                      value={formData.productId === 0 ? "" : formData.productId.toString()}
                      onValueChange={(value) => handleInputChange('productId', parseInt(value))}
                      disabled={loadingProducts}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingProducts ? "Đang tải..." : "Chọn gói sản phẩm *"} />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.productId} value={product.productId.toString()}>
                            {product.productName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang tạo...' : (trialMode ? 'Tạo cửa hàng dùng thử' : 'Tạo cửa hàng')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Notification Modal */}
      {notification.show && (
        <Dialog open={notification.show} onOpenChange={() => setNotification(prev => ({ ...prev, show: false }))}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {notification.type === 'success' ? 'Thành công' : 'Lỗi'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
            <DialogFooter>
              <Button 
                onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                className={notification.type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
