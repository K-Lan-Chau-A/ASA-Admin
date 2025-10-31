"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Download, Filter, Store, Calendar, DollarSign, QrCode } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState, useRef, useCallback } from "react"
import API_URL from "@/config/api"

interface Order {
  orderId: number
  shopId: number
  productId: number
  productName: string
  userId: number
  totalPrice: number
  paymentMethod: string
  status: number
  discount: number
  createdAt: string
  expiredAt?: string | null
  note: string
}

interface Shop {
  shopId: number
  shopName: string
  fullname: string
}

interface Product {
  productId: number
  productName: string
  price: number
}

interface ApiResponse {
  items: Order[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}


export default function TransactionsPage() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState<Order[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [monthlySummary, setMonthlySummary] = useState<{ totalTransactions: number; successTransactions: number; failedTransactions: number; revenue: number }>({ totalTransactions: 0, successTransactions: 0, failedTransactions: 0, revenue: 0 })
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
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
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Format currency with dots as thousands separator
  const formatCurrency = (value: number) => {
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `₫${formatted}`
  }

  const successRate = (() => {
    const total = monthlySummary.successTransactions + monthlySummary.failedTransactions
    if (total === 0) return 0
    return Math.round((monthlySummary.successTransactions / total) * 1000) / 10
  })()

  const failureRate = (() => {
    const total = monthlySummary.successTransactions + monthlySummary.failedTransactions
    if (total === 0) return 0
    return Math.round((monthlySummary.failedTransactions / total) * 1000) / 10
  })()

  const loadOrders = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const res = await fetch(`${API_URL}/api/orders?page=${page}&pageSize=10`)
      if (!res.ok) throw new Error('Failed to fetch orders')
      
      const data: ApiResponse = await res.json()
      
      if (append) {
        setOrders(prev => [...prev, ...data.items])
      } else {
        setOrders(data.items)
      }
      
      setCurrentPage(page)
      setHasMore(page < data.totalPages)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadShops = async (orderList: Order[]) => {
    try {
      // Get unique shop IDs from orders
      const uniqueShopIds = [...new Set(orderList.map(order => order.shopId))]
      
      // Fetch shop details for each unique shop ID
      const shopPromises = uniqueShopIds.map(async (shopId) => {
        try {
          const res = await fetch(`${API_URL}/api/shops?shopId=${shopId}&page=1&pageSize=1`)
          if (res.ok) {
            const data = await res.json()
            return data.items?.[0] || null
          }
        } catch (error) {
          console.error(`Failed to load shop ${shopId}:`, error)
        }
        return null
      })
      
      const shopResults = await Promise.all(shopPromises)
      const validShops = shopResults.filter(shop => shop !== null)
      setShops(validShops)
    } catch (error) {
      console.error('Failed to load shops:', error)
    }
  }

  const loadProducts = async (orderList: Order[]) => {
    try {
      // Get unique product IDs from orders
      const uniqueProductIds = [...new Set(orderList.map(order => order.productId))]
      
      // Fetch product details for each unique product ID
      const productPromises = uniqueProductIds.map(async (productId) => {
        try {
          const res = await fetch(`${API_URL}/api/products?productId=${productId}&page=1&pageSize=1`)
          if (res.ok) {
            const data = await res.json()
            return data.items?.[0] || null
          }
        } catch (error) {
          console.error(`Failed to load product ${productId}:`, error)
        }
        return null
      })
      
      const productResults = await Promise.all(productPromises)
      const validProducts = productResults.filter(product => product !== null)
      setProducts(validProducts)
    } catch (error) {
      console.error('Failed to load products:', error)
    }
  }

  useEffect(() => {
    loadOrders(1)
    // Load monthly summary for top KPIs
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/api/reports/monthly-order-summary`)
        if (res.ok) {
          const json = await res.json()
          if (json?.success && json?.data) {
            setMonthlySummary({
              totalTransactions: json.data.totalTransactions ?? 0,
              successTransactions: json.data.successTransactions ?? 0,
              failedTransactions: json.data.failedTransactions ?? 0,
              revenue: json.data.revenue ?? 0,
            })
          }
        }
      } catch (e) {
        // silent fail for KPIs
      }
    })()
  }, [])

  useEffect(() => {
    if (orders.length > 0) {
      loadShops(orders)
      loadProducts(orders)
    }
  }, [orders])

  const lastOrderElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (loadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadOrders(currentPage + 1, true)
      }
    })
    if (node && observerRef.current) observerRef.current.observe(node)
  }, [loadingMore, hasMore, currentPage])

  const getShopName = (shopId: number) => {
    const shop = shops.find(s => s.shopId === shopId)
    return shop ? shop.shopName : `Shop ${shopId}`
  }

  const getShopOwner = (shopId: number) => {
    const shop = shops.find(s => s.shopId === shopId)
    return shop ? shop.fullname : 'N/A'
  }

  const getProductName = (productId: number) => {
    const product = products.find(p => p.productId === productId)
    return product ? product.productName : `Product ${productId}`
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "1":
        return "Tiền mặt"
      case "2":
        return "Chuyển khoản"
      default:
        return method
    }
  }

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Chờ thanh toán"
      case 1:
        return "Đã thanh toán"
      case 2:
        return "Đã hủy"
      default:
        return "Unknown"
    }
  }

  const getStatusVariant = (status: number) => {
    switch (status) {
      case 0:
        return "secondary"
      case 1:
        return "default"
      case 2:
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleViewQR = async (orderId: number, amount: number) => {
    try {
      const res = await fetch(`${API_URL}/api/sepay/vietqr?orderId=${orderId}`)
      if (res.ok) {
        const data = await res.json()
        if (data?.success && data?.url) {
          setQrModal({
            show: true,
            qrUrl: data.url,
            orderId: data.orderId ?? orderId,
            amount: data.amount ?? amount
          })
        }
      }
    } catch (error) {
      console.error('Failed to load QR code:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('transactions.title')}</h1>
          <p className="text-muted-foreground">{t('transactions.subtitle')}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.totalTransactions')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlySummary.totalTransactions.toLocaleString('vi-VN')}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.monthlyRevenue')}</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlySummary.revenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.successfulTransactions')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlySummary.successTransactions.toLocaleString('vi-VN')}</div>
            <p className="text-xs text-muted-foreground">{t('transactions.successRate')} {successRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.failedTransactions')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlySummary.failedTransactions.toLocaleString('vi-VN')}</div>
            <p className="text-xs text-muted-foreground">{t('transactions.failureRate')} {failureRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('transactions.searchTransaction')} className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t('transactions.exportData')}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {t('transactions.filter')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('transactions.shop')}</TableHead>
                  <TableHead>{t('transactions.package')}</TableHead>
                  <TableHead>{t('common.amount')}</TableHead>
                  <TableHead>{t('transactions.type')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead>{t('common.date')}</TableHead>
                  <TableHead>{t('transactions.paymentMethod')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Đang tải dữ liệu...
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order, index) => (
                    <TableRow 
                      key={order.orderId}
                      ref={index === orders.length - 1 ? lastOrderElementRef : null}
                    >
                    <TableCell>
                      <div>
                          <div className="font-medium">{getShopName(order.shopId)}</div>
                          <div className="text-sm text-muted-foreground">{getShopOwner(order.shopId)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">
                          {order.productName || getProductName(order.productId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        ₫{order.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                          {order.discount > 0 ? `Giảm ${order.discount.toLocaleString()}₫` : 'Không giảm'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(order.status) as any}>
                          {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>{getPaymentMethodText(order.paymentMethod)}</TableCell>
                    <TableCell className="text-right">
                      {order.paymentMethod === "1" ? (
                        <span className="text-sm text-muted-foreground">Tiền mặt</span>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewQR(order.orderId, order.totalPrice)}
                        >
                          <QrCode className="mr-2 h-4 w-4" />
                          Xem QR
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  ))
                )}
                {loadingMore && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Đang tải thêm...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Modal */}
      {qrModal.show && (
        <Dialog open={qrModal.show} onOpenChange={() => setQrModal(prev => ({ ...prev, show: false }))}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-green-600" />
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
                      // You could add a toast notification here
                    } catch (err) {
                      console.error('Failed to copy QR code:', err)
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
    </div>
  )
}
