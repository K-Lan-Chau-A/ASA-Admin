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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Package } from "lucide-react"
import { useState, useEffect } from "react"
import API_URL from "@/config/api"
import { useLanguage } from "@/contexts/language-context"
import { packagesTranslations } from "@/lib/packages-i18n"
import { toast } from "@/hooks/use-toast"

type Feature = {
  featureId: number
  featureName: string
  description?: string
  isActive?: boolean
}

interface CreatePackageDialogProps {
  onPackageCreated?: () => void
}

export function CreatePackageDialog({ onPackageCreated }: CreatePackageDialogProps) {
  const { language } = useLanguage()
  const pt = packagesTranslations[language]
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingFeatures, setLoadingFeatures] = useState(false)
  const [features, setFeatures] = useState<Feature[]>([])
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    requestLimit: '',
    accountLimit: '',
    discount: '',
    status: '1', // 0: inactive, 1: active
    qrcodeUrl: '',
    duration: '',
    featureIds: [] as number[]
  })

  // Load features when dialog opens
  useEffect(() => {
    if (open) {
      const loadFeatures = async () => {
        try {
          setLoadingFeatures(true)
          const res = await fetch(`${API_URL}/api/features?page=1&pageSize=20`)
          if (res.ok) {
            const data = await res.json()
            setFeatures(data.items || [])
          }
        } catch (error) {
          console.error('Failed to load features:', error)
        } finally {
          setLoadingFeatures(false)
        }
      }
      loadFeatures()
    } else {
      // Reset form when dialog closes
      setFormData({
        productName: '',
        description: '',
        price: '',
        requestLimit: '',
        accountLimit: '',
        discount: '',
        status: '1',
        qrcodeUrl: '',
        duration: '',
        featureIds: []
      })
    }
  }, [open])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Convert duration to API format (e.g., "30" -> "30.00:00:00")
  const formatDurationForAPI = (duration: string): string => {
    if (!duration) return ''
    // If it's just a number, convert to d.hh:mm:ss format
    if (/^\d+$/.test(duration)) {
      const days = parseInt(duration, 10)
      return `${days}.00:00:00`
    }
    // Otherwise return as-is
    return duration
  }

  const handleFeatureToggle = (featureId: number) => {
    setFormData(prev => {
      const currentIds = prev.featureIds
      const newIds = currentIds.includes(featureId)
        ? currentIds.filter(id => id !== featureId)
        : [...currentIds, featureId]
      return { ...prev, featureIds: newIds }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.productName || !formData.price) {
      toast({
        title: pt.error,
        description: pt.fillRequiredFields,
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const payload = {
        productName: formData.productName,
        description: formData.description || '',
        price: Number(formData.price || 0),
        requestLimit: Number(formData.requestLimit || 0),
        accountLimit: Number(formData.accountLimit || 0),
        discount: Number(formData.discount || 0),
        status: Number(formData.status),
        qrcodeUrl: formData.qrcodeUrl || '',
        duration: formatDurationForAPI(formData.duration || ''),
        featureIds: formData.featureIds,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast({
          title: pt.success,
          description: pt.createSuccess
        })
        setOpen(false)
        setFormData({
          productName: '',
          description: '',
          price: '',
          requestLimit: '',
          accountLimit: '',
          discount: '',
          status: '1',
          qrcodeUrl: '',
          duration: '',
          featureIds: []
        })
        onPackageCreated?.()
      } else {
        const errorData = await response.json().catch(() => ({}))
        toast({
          title: pt.error,
          description: errorData.message || pt.createError,
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {pt.createPackage}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {pt.createPackage}
          </DialogTitle>
          <DialogDescription>
            {pt.createPackageDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">
                {pt.productName} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder={pt.productNamePlaceholder}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{pt.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={pt.descriptionPlaceholder}
                rows={3}
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">
                {pt.price} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder={pt.pricePlaceholder}
                required
              />
            </div>

            {/* Request Limit */}
            <div className="space-y-2">
              <Label htmlFor="requestLimit">{pt.requestLimit}</Label>
              <Input
                id="requestLimit"
                type="number"
                value={formData.requestLimit}
                onChange={(e) => handleInputChange('requestLimit', e.target.value)}
                placeholder={pt.requestLimitPlaceholder}
              />
            </div>

            {/* Account Limit */}
            <div className="space-y-2">
              <Label htmlFor="accountLimit">{pt.accountLimit}</Label>
              <Input
                id="accountLimit"
                type="number"
                value={formData.accountLimit}
                onChange={(e) => handleInputChange('accountLimit', e.target.value)}
                placeholder={pt.accountLimitPlaceholder}
              />
            </div>

            {/* Discount */}
            <div className="space-y-2">
              <Label htmlFor="discount">{pt.discount}</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                placeholder={pt.discountPlaceholder}
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">{pt.duration}</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder={pt.durationPlaceholder}
              />
              <p className="text-xs text-muted-foreground">{pt.durationHelper}</p>
            </div>

            {/* QR Code URL */}
            <div className="space-y-2">
              <Label htmlFor="qrcodeUrl">{pt.qrcodeUrl}</Label>
              <Input
                id="qrcodeUrl"
                value={formData.qrcodeUrl}
                onChange={(e) => handleInputChange('qrcodeUrl', e.target.value)}
                placeholder={pt.qrcodeUrlPlaceholder}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">{pt.status}</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="1">{pt.active}</option>
                <option value="0">{pt.inactive}</option>
              </select>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label>{pt.selectFeatures}</Label>
              {loadingFeatures ? (
                <div className="text-sm text-muted-foreground">{pt.loadingFeatures}</div>
              ) : (
                <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                  {features.length === 0 ? (
                    <div className="text-sm text-muted-foreground">{pt.noFeaturesAvailable}</div>
                  ) : (
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div key={feature.featureId} className="flex items-start gap-2">
                          <Checkbox
                            id={`feature-${feature.featureId}`}
                            checked={formData.featureIds.includes(feature.featureId)}
                            onCheckedChange={() => handleFeatureToggle(feature.featureId)}
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={`feature-${feature.featureId}`}
                              className="font-normal cursor-pointer"
                            >
                              {feature.featureName}
                            </Label>
                            {feature.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {pt.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? pt.creating : pt.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

