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
import { Plus, ShoppingCart } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import API_URL from "@/config/api"
import provinces from "@/constant/donViHanhChinh34TinhThanh.json"
import vietQrBanks from "@/constant/vietQrBank.json"

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

type Shop = {
  shopId: number
  shopName: string
  fullname: string
  phonenumber: string
  email?: string | null
  address?: string | null
  shopToken?: string | null
  qrcodeUrl?: string | null
  sepayApiKey?: string | null
  bankName?: string | null
  bankCode?: string | null
  bankNum?: string | null
}

type OrderFormData = {
  shopId: number
  productId: number
  userId: number
  totalPrice: number
  paymentMethod: number
  status: number
  discount: number
  createdAt: string
  note: string
  phonenumber: string
  shopName: string
  address: string
  shopToken: string
  qrcodeUrl: string
  sepayApiKey: string
  bankName: string
  bankCode: string
  bankNum: string
  fullname: string
  email: string
  houseNumber: string
  provinceCode: string
  wardCode: string
  wardName: string
}

type CreateOrderDialogProps = {
  onOrderCreated?: () => void
}

export function CreateOrderDialog({ onOrderCreated }: CreateOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [shops, setShops] = useState<Shop[]>([])
  const [loadingShops, setLoadingShops] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({
    show: false,
    type: 'success',
    message: ''
  })

  const [qrModal, setQrModal] = useState<{
    show: boolean
    qrUrl: string
    orderId: number
    amount: number
  }>({
    show: false,
    qrUrl: '',
    orderId: 0,
    amount: 0
  })

  const [formData, setFormData] = useState<OrderFormData>({
    shopId: 0,
    productId: 0,
    userId: 0,
    totalPrice: 0,
    paymentMethod: 1, // Default to Tiền mặt
    status: 0, // Default to Chờ thanh toán
    discount: 0,
    createdAt: new Date().toISOString(),
    note: '',
    phonenumber: '',
    shopName: '',
    address: '',
    shopToken: '',
    qrcodeUrl: '',
    sepayApiKey: '',
    bankName: '',
    bankCode: '',
    bankNum: '',
    fullname: '',
    email: '',
    houseNumber: '',
    provinceCode: '',
    wardCode: '',
    wardName: '',
  })

  const handleInputChange = (field: keyof OrderFormData, value: string | number) => {
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
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // Load products and shops when dialog opens
  useEffect(() => {
    if (open) {
      const loadData = async () => {
        try {
          // Load products
          setLoadingProducts(true)
          const productsRes = await fetch(`${API_URL}/api/products?page=1&pageSize=10`)
          if (productsRes.ok) {
            const productsData = await productsRes.json()
            setProducts(productsData.items || [])
          }

          // Load shops
          setLoadingShops(true)
          const shopsRes = await fetch(`${API_URL}/api/shops?page=1&pageSize=100`)
          if (shopsRes.ok) {
            const shopsData = await shopsRes.json()
            setShops(shopsData.items || [])
          }

          // Get userId from localStorage
          if (typeof window !== 'undefined') {
            let userIdFromStorage: number | null = null
            const storedUserId = localStorage.getItem('userId')
            if (storedUserId && !isNaN(parseInt(storedUserId))) {
              userIdFromStorage = parseInt(storedUserId)
            } else {
              // Try parse from authUser object
              const rawAuthUser = localStorage.getItem('authUser')
              if (rawAuthUser) {
                try {
                  const parsed = JSON.parse(rawAuthUser)
                  const maybeId = parsed?.userId ?? parsed?.id ?? parsed?.user?.id
                  if (typeof maybeId === 'number') {
                    userIdFromStorage = maybeId
                  } else if (typeof maybeId === 'string' && !isNaN(parseInt(maybeId))) {
                    userIdFromStorage = parseInt(maybeId)
                  }
                } catch {}
              }
            }

            if (userIdFromStorage && !isNaN(userIdFromStorage)) {
              setFormData(prev => ({ ...prev, userId: userIdFromStorage! }))
              // Cache normalized key for future reads
              try { localStorage.setItem('userId', String(userIdFromStorage)) } catch {}
            } else {
              showNotification('error', 'User ID not found. Please log in.')
            }
          }
        } catch (error) {
          console.error('Failed to load data:', error)
          showNotification('error', 'Failed to load data')
        } finally {
          setLoadingProducts(false)
          setLoadingShops(false)
        }
      }
      loadData()
    }
  }, [open])

  const selectedProduct = useMemo(() => {
    return products.find(p => p.productId === formData.productId) || null
  }, [formData.productId, products])

  const selectedShop = useMemo(() => {
    return shops.find(s => s.shopId === formData.shopId) || null
  }, [formData.shopId, shops])

  // Update totalPrice when product changes
  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, totalPrice: selectedProduct.price }))
    }
  }, [selectedProduct])

  // Update shop-related fields when selectedShop changes
  useEffect(() => {
    if (selectedShop) {
      // Parse address to extract components
      const addressParts = selectedShop.address?.split(', ') || []
      const houseNumber = addressParts[0] || ''
      const wardName = addressParts[1] || ''
      const provinceName = addressParts[2] || ''

      const province = provinces.find(p => p.fullName === provinceName)
      const ward = province?.wards.find(w => w.name === wardName)

      setFormData(prev => ({
        ...prev,
        shopName: selectedShop.shopName || '',
        fullname: selectedShop.fullname || '',
        phonenumber: selectedShop.phonenumber || '',
        email: selectedShop.email || '',
        houseNumber: houseNumber,
        provinceCode: province?.code || '',
        wardCode: ward?.code || '',
        wardName: ward?.name || '',
        bankName: selectedShop.bankName || '',
        bankCode: selectedShop.bankCode || '',
        bankNum: selectedShop.bankNum || '',
        shopToken: selectedShop.shopToken || '',
        qrcodeUrl: selectedShop.qrcodeUrl || '',
        sepayApiKey: selectedShop.sepayApiKey || '',
      }))
    }
  }, [selectedShop])

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

    // Validation
    if (formData.shopId === 0) {
      showNotification('error', 'Vui lòng chọn cửa hàng')
      return
    }
    if (formData.productId === 0) {
      showNotification('error', 'Vui lòng chọn gói sản phẩm')
      return
    }
    if (!formData.fullname || !formData.phonenumber || !formData.email) {
      showNotification('error', 'Vui lòng điền đầy đủ thông tin người mua')
      return
    }
    if (!formData.houseNumber || !formData.provinceCode || !formData.wardCode) {
      showNotification('error', 'Vui lòng điền đầy đủ địa chỉ')
      return
    }
    if (formData.paymentMethod === 2 && (!formData.bankName || !formData.bankNum)) {
      showNotification('error', 'Vui lòng điền thông tin ngân hàng cho phương thức chuyển khoản')
      return
    }

    setIsSubmitting(true)

    try {
      const payload: any = {
        shopId: formData.shopId,
        productId: formData.productId,
        userId: formData.userId,
        totalPrice: formData.totalPrice,
        paymentMethod: String(formData.paymentMethod),
        discount: formData.discount,
        createdAt: new Date().toISOString(),
        note: formData.note,
        phonenumber: formData.phonenumber,
        shopName: formData.shopName,
        address: buildAddress(),
        bankName: selectedBank?.name ?? '',
        bankCode: selectedBank?.bin ?? '',
        bankNum: formData.bankNum,
        fullname: formData.fullname,
        email: formData.email,
      }

      // Only include status when payment method is not bank transfer
      if (formData.paymentMethod !== 2) {
        payload.status = formData.status
      }

      // Conditionally add optional technical fields
      if (formData.shopToken && formData.shopToken.trim()) {
        payload.shopToken = formData.shopToken.trim()
      }
      if (formData.qrcodeUrl && formData.qrcodeUrl.trim()) {
        payload.qrcodeUrl = formData.qrcodeUrl.trim()
      }
      if (formData.sepayApiKey && formData.sepayApiKey.trim()) {
        payload.sepayApiKey = formData.sepayApiKey.trim()
      }

      console.log('Creating order with payload:', payload)

      const res = await fetch(`${API_URL}/api/orders`, {
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

      const orderResponse = await res.json()
      const orderId = orderResponse?.data?.orderId ?? orderResponse?.orderId

      // Call VietQR API only for bank transfer (paymentMethod = 2)
      if (formData.paymentMethod === 2 && orderId && typeof orderId === 'number') {
        try {
          const qrRes = await fetch(`${API_URL}/api/sepay/vietqr?orderId=${orderId}`)
          if (qrRes.ok) {
            const qrData = await qrRes.json()
            if (qrData?.success && qrData?.url) {
              setQrModal({
                show: true,
                qrUrl: qrData.url,
                orderId: qrData.orderId ?? orderId,
                amount: qrData.amount ?? formData.totalPrice
              })
            }
          }
        } catch (qrErr) {
          console.warn('Failed to fetch QR code:', qrErr)
          // Don't fail the whole flow if QR fails
        }
      }

      // Reset form and close dialog
      setFormData({
        shopId: 0,
        productId: 0,
        userId: formData.userId, // Keep userId
        totalPrice: 0,
        paymentMethod: 1,
        status: 0,
        discount: 0,
        createdAt: new Date().toISOString(),
        note: '',
        phonenumber: '',
        shopName: '',
        address: '',
        shopToken: '',
        qrcodeUrl: '',
        sepayApiKey: '',
        bankName: '',
        bankCode: '',
        bankNum: '',
        fullname: '',
        email: '',
        houseNumber: '',
        provinceCode: '',
        wardCode: '',
        wardName: '',
      })
      setOpen(false)

      // Notify parent component to refresh the list
      if (onOrderCreated) {
        onOrderCreated()
      }

      showNotification('success', 'Tạo đơn hàng thành công!')
    } catch (err) {
      console.error('Create order failed:', err)
      showNotification('error', 'Tạo đơn hàng thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Tạo đơn hàng
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Tạo đơn hàng mới
            </DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo một đơn hàng mới.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Shop Selection */}
              <div className="space-y-2">
                <Label>Cửa hàng *</Label>
                <Select
                  value={formData.shopId === 0 ? "" : formData.shopId.toString()}
                  onValueChange={(value) => handleInputChange('shopId', parseInt(value))}
                  disabled={loadingShops}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingShops ? "Đang tải cửa hàng..." : "Chọn cửa hàng *"} />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map(shop => (
                      <SelectItem key={shop.shopId} value={shop.shopId.toString()}>
                        {shop.shopName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label>Gói sản phẩm *</Label>
                <Select
                  value={formData.productId === 0 ? "" : formData.productId.toString()}
                  onValueChange={(value) => handleInputChange('productId', parseInt(value))}
                  disabled={loadingProducts}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingProducts ? "Đang tải sản phẩm..." : "Chọn gói sản phẩm *"} />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.productId} value={product.productId.toString()}>
                        {product.productName} - {product.price.toLocaleString('vi-VN')} VNĐ
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Total Price (Read-only) */}
              <div className="space-y-2">
                <Label>Tổng giá trị</Label>
                <Input
                  value={formData.totalPrice.toLocaleString('vi-VN') + ' VNĐ'}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label htmlFor="discount">Giảm giá (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              {/* Buyer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Tên người mua *</Label>
                  <Input
                    id="fullname"
                    value={formData.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phonenumber">Số điện thoại *</Label>
                  <Input
                    id="phonenumber"
                    value={formData.phonenumber}
                    onChange={(e) => handleInputChange('phonenumber', e.target.value)}
                    placeholder="0901234567"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                  required
                />
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
                  <Label>Tỉnh/Thành phố *</Label>
                  <Select
                    value={formData.provinceCode}
                    onValueChange={(value) => {
                      handleInputChange('provinceCode', value)
                      handleInputChange('wardCode', '') // Reset ward when province changes
                      handleInputChange('wardName', '')
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố *" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province.code} value={province.code}>
                          {province.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Phường/Xã *</Label>
                  <Select
                    value={formData.wardCode}
                    onValueChange={(value) => {
                      handleInputChange('wardCode', value)
                      const selected = wardOptions.find(w => w.code === value)
                      handleInputChange('wardName', selected?.name || '')
                    }}
                    disabled={!formData.provinceCode}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Phường/Xã *" />
                    </SelectTrigger>
                    <SelectContent>
                      {wardOptions.map(ward => (
                        <SelectItem key={ward.code} value={ward.code}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Phương thức thanh toán *</Label>
                <Select
                  value={formData.paymentMethod.toString()}
                  onValueChange={(value) => handleInputChange('paymentMethod', parseInt(value))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức thanh toán *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tiền mặt</SelectItem>
                    <SelectItem value="2">Chuyển khoản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bank Info (Conditional) */}
              {formData.paymentMethod === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Ngân hàng *</Label>
                    <Select
                      value={formData.bankCode}
                      onValueChange={(value) => {
                        const bank = bankOptions.find(b => b.bin === value)
                        handleInputChange('bankCode', value)
                        handleInputChange('bankName', bank?.name || '')
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ngân hàng *" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankOptions.map(bank => (
                          <SelectItem key={bank.bin} value={bank.bin}>
                            {bank.shortName || bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankNum">Số tài khoản *</Label>
                    <Input
                      id="bankNum"
                      value={formData.bankNum}
                      onChange={(e) => handleInputChange('bankNum', e.target.value)}
                      placeholder="Nhập số tài khoản"
                      required
                    />
                  </div>
                </>
              )}

              {/* Order Status - hidden when bank transfer */}
              {formData.paymentMethod !== 2 && (
                <div className="space-y-2">
                  <Label>Trạng thái đơn hàng *</Label>
                  <Select
                    value={formData.status.toString()}
                    onValueChange={(value) => handleInputChange('status', parseInt(value))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái đơn hàng *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Chờ thanh toán</SelectItem>
                      <SelectItem value="1">Đã thanh toán</SelectItem>
                      <SelectItem value="2">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Ghi chú</Label>
                <Input
                  id="note"
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Ghi chú thêm về đơn hàng"
                />
              </div>

              {/* Optional Technical Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông tin kỹ thuật (tuỳ chọn)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="shopToken">Shop Token</Label>
                  <Input
                    id="shopToken"
                    value={formData.shopToken}
                    onChange={(e) => handleInputChange('shopToken', e.target.value)}
                    placeholder="Nhập Shop Token nếu có"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qrcodeUrl">QR Code URL</Label>
                  <Input
                    id="qrcodeUrl"
                    value={formData.qrcodeUrl}
                    onChange={(e) => handleInputChange('qrcodeUrl', e.target.value)}
                    placeholder="Nhập QR Code URL nếu có"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sepayApiKey">Sepay API Key</Label>
                  <Input
                    id="sepayApiKey"
                    value={formData.sepayApiKey}
                    onChange={(e) => handleInputChange('sepayApiKey', e.target.value)}
                    placeholder="Nhập Sepay API Key nếu có"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang tạo...' : 'Tạo đơn hàng'}
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
      {/* QR Code Modal */}
      {qrModal.show && (
        <Dialog open={qrModal.show} onOpenChange={() => setQrModal(prev => ({ ...prev, show: false }))}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                QR Code Thanh Toán
              </DialogTitle>
              <DialogDescription>
                Quét mã QR để thanh toán đơn hàng #{qrModal.orderId}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src={qrModal.qrUrl} 
                  alt={`QR Code for Order #${qrModal.orderId}`}
                  className="max-w-full h-auto border rounded-lg"
                  style={{ maxWidth: '350px', maxHeight: '350px' }}
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Sử dụng ứng dụng ngân hàng để quét mã QR này
              </p>
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    try {
                      const response = await fetch(qrModal.qrUrl)
                      const blob = await response.blob()
                      await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                      ])
                      showNotification('success', 'Đã copy QR code vào clipboard!')
                    } catch (err) {
                      showNotification('error', 'Không thể copy QR code')
                    }
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy QR Code
                </Button>
                <Button onClick={() => setQrModal(prev => ({ ...prev, show: false }))}>
                  Đóng
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
