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
import { Textarea } from "@/components/ui/textarea"
import { Edit, Percent, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import API_URL from "@/config/api"
import { toast } from "@/hooks/use-toast"
import { promotionsTranslations } from "@/lib/promotions-i18n"

interface Product {
  productId: number
  productName: string
}

interface Promotion {
  promotionId: number
  promotionName: string
  description?: string
  startDate: string
  endDate: string
  value: number
  type: number
  status: number
  productIds?: number[]
}

interface EditPromotionDialogProps {
  promotion: Promotion | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPromotionUpdated?: () => void
}

export function EditPromotionDialog({ promotion, open, onOpenChange, onPromotionUpdated }: EditPromotionDialogProps) {
  const { language } = useLanguage()
  const pt = promotionsTranslations[language]
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [formData, setFormData] = useState({
    promotionName: '',
    description: '',
    startDate: '',
    endDate: '',
    value: '',
    type: '0',
    status: '1',
    productIds: [] as number[],
  })

  const loadProducts = async () => {
    try {
      setLoadingProducts(true)
      const res = await fetch(`${API_URL}/api/products?page=1&pageSize=100`)
      const json = await res.json().catch(() => ({}))
      const items = Array.isArray(json?.items) ? json.items : []
      setProducts(items.map((item: any) => ({
        productId: item.productId || item.id,
        productName: item.productName || item.name
      })))
    } catch (error) {
      console.error('Error loading products:', error)
      toast({
        title: pt.error,
        description: pt.loadProductsError,
        variant: "destructive"
      })
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    if (promotion) {
      setFormData({
        promotionName: promotion.promotionName || '',
        description: promotion.description || '',
        startDate: promotion.startDate || '',
        endDate: promotion.endDate || '',
        value: String(promotion.value || 0),
        type: String(promotion.type || 0),
        status: String(promotion.status || 1),
        productIds: promotion.productIds || [],
      })
    }
  }, [promotion])

  useEffect(() => {
    if (open) {
      loadProducts()
    }
  }, [open])

  const handleInputChange = (field: string, value: string | number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProductToggle = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!promotion) return

    // Validation
    if (!formData.promotionName || !formData.startDate || !formData.endDate || !formData.value) {
      toast({
        title: pt.error,
        description: pt.fillAllFields,
        variant: "destructive"
      })
      return
    }

    const value = Number(formData.value)
    if (formData.type === '0' && (value <= 0 || value > 100)) {
      toast({
        title: pt.error,
        description: pt.percentageRangeError,
        variant: "destructive"
      })
      return
    }

    if (formData.type === '1' && value <= 0) {
      toast({
        title: pt.error,
        description: pt.amountRangeError,
        variant: "destructive"
      })
      return
    }

    if (formData.productIds.length === 0) {
      toast({
        title: pt.error,
        description: pt.selectAtLeastOneProduct,
        variant: "destructive"
      })
      return
    }

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    
    if (startDate >= endDate) {
      toast({
        title: pt.error,
        description: pt.endDateAfterStartDate,
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/promotions/${promotion.promotionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promotionName: formData.promotionName,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          value: Number(formData.value),
          type: Number(formData.type),
          status: Number(formData.status),
          productIds: formData.productIds,
        }),
      })

      if (response.ok) {
        toast({
          title: pt.success,
          description: pt.updateSuccess
        })
        onOpenChange(false)
        onPromotionUpdated?.()
      } else {
        const errorData = await response.json().catch(() => ({}))
        toast({
          title: pt.error,
          description: errorData.message || pt.updateError,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: pt.error,
        description: pt.generalError,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!promotion) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {pt.editPromotion}
          </DialogTitle>
          <DialogDescription>
            {pt.editPromotionDescription} {promotion.promotionName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotionName" className="text-right">
                {pt.promotionName} {pt.required}
              </Label>
              <Input
                id="promotionName"
                value={formData.promotionName}
                onChange={(e) => handleInputChange('promotionName', e.target.value)}
                placeholder={pt.promotionNamePlaceholder}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                {pt.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={pt.descriptionPlaceholder}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                {pt.startDate} {pt.required}
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                {pt.endDate} {pt.required}
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                {pt.discountType} {pt.required}
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={pt.selectDiscountType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      {pt.percentage}
                    </div>
                  </SelectItem>
                  <SelectItem value="1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {pt.fixedAmount}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                {pt.value} {pt.required}
              </Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder={formData.type === '0' ? pt.percentagePlaceholder : pt.amountPlaceholder}
                className="col-span-3"
                required
                min="0"
                max={formData.type === '0' ? '100' : undefined}
                step={formData.type === '0' ? '0.01' : '1'}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {pt.status} {pt.required}
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={pt.selectStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{pt.inactive}</SelectItem>
                  <SelectItem value="1">{pt.active}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                {pt.products} {pt.required}
              </Label>
              <div className="col-span-3">
                {loadingProducts ? (
                  <div className="text-sm text-muted-foreground">{pt.loadingProducts}</div>
                ) : (
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2 space-y-2">
                    {products.map((product) => (
                      <label key={product.productId} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.productIds.includes(product.productId)}
                          onChange={() => handleProductToggle(product.productId)}
                          className="rounded"
                        />
                        <span className="text-sm">{product.productName}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {pt.selectedProducts}: {formData.productIds.length} {pt.products}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {pt.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? pt.updating : pt.update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
