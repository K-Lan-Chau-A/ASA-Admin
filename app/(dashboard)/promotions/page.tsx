"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Plus, Gift, Calendar, Users, Percent, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import API_URL from "@/config/api"
import { useEffect, useMemo, useState } from "react"
import { CreatePromotionDialog } from "@/components/create-promotion-dialog"
import { EditPromotionDialog } from "@/components/edit-promotion-dialog"
import { toast } from "@/hooks/use-toast"

type ApiPromotion = {
  promotionId: number
  promotionName: string
  description?: string
  startDate: string
  endDate: string
  value: number
  type: string // "%" | "VNĐ"
  status: number // 1 active; others inactive/expired per backend
  productIds?: number[]
}

export default function PromotionsPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ApiPromotion[]>([])
  const [editingPromotion, setEditingPromotion] = useState<ApiPromotion | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const loadPromotions = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${API_URL}/api/promotions?page=1&pageSize=10`)
      const json = await res.json().catch(() => ({}))
      const arr: any[] = Array.isArray(json?.items) ? json.items : []
      setItems(arr as any)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load promotions')
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPromotions()
  }, [])

  const handleEditPromotion = (promotion: ApiPromotion) => {
    setEditingPromotion(promotion)
    setEditDialogOpen(true)
  }

  const handlePromotionUpdated = () => {
    loadPromotions()
  }

  const convertApiPromotionToPromotion = (apiPromotion: ApiPromotion) => ({
    promotionId: apiPromotion.promotionId,
    promotionName: apiPromotion.promotionName,
    description: apiPromotion.description,
    startDate: apiPromotion.startDate,
    endDate: apiPromotion.endDate,
    value: apiPromotion.value,
    type: apiPromotion.type === '%' ? 0 : 1, // Convert string to number
    status: apiPromotion.status,
    productIds: apiPromotion.productIds,
  })

  const handleSuspendPromotion = async (promotion: ApiPromotion) => {
    try {
      const newStatus = promotion.status === 1 ? 0 : 1 // Toggle status
      const response = await fetch(`${API_URL}/api/promotions/${promotion.promotionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promotionName: promotion.promotionName,
          description: promotion.description || '',
          startDate: promotion.startDate,
          endDate: promotion.endDate,
          value: promotion.value,
          type: promotion.type === '%' ? 0 : 1, // Convert string to number
          status: newStatus,
          productIds: promotion.productIds || [],
        }),
      })

      if (response.ok) {
        setSuccessMessage(newStatus === 0 ? "Đã tạm dừng promotion thành công" : "Đã kích hoạt promotion thành công")
        setSuccessModalOpen(true)
        loadPromotions()
      } else {
        const errorData = await response.json().catch(() => ({}))
        toast({
          title: "Lỗi",
          description: errorData.message || "Không thể cập nhật trạng thái promotion",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật trạng thái promotion",
        variant: "destructive"
      })
    }
  }

  const getStatusText = (status: string | number) => {
    const s = String(status)
    if (s === '1' || s.toLowerCase() === 'active') return t('promotions.currentlyActive')
    if (s === '0' || s.toLowerCase() === 'inactive') return t('promotions.suspended')
    if (s.toLowerCase() === 'expired') return t('promotions.expired')
    return s
  }

  const getTargetPackageText = (target: string) => {
    switch (target) {
      case "all":
        return t('promotions.all')
      case "basic":
        return t('promotions.basicPackage')
      case "premium":
        return t('promotions.premiumPackage')
      default:
        return target
    }
  }

  const normalized = useMemo(() => {
    return items.map((p) => ({
      id: String(p.promotionId),
      name: p.promotionName,
      description: p.description || '',
      startDate: p.startDate,
      endDate: p.endDate,
      value: Number(p.value || 0),
      type: p.type, // "%" or "VNĐ"
      status: p.status,
    }))
  }, [items])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('promotions.title')}</h1>
          <p className="text-muted-foreground">{t('promotions.subtitle')}</p>
        </div>
        <CreatePromotionDialog onPromotionCreated={handlePromotionUpdated} />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('promotions.searchPromotion')} className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}
        {loading ? (
          <div className="text-sm text-muted-foreground">{t('common.loading')}...</div>
        ) : (
          normalized.map((promotion) => (
          <Card key={promotion.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{promotion.name}</CardTitle>
                <Badge 
                  variant={
                    String(promotion.status) === '1' ? 'default' :
                    String(promotion.status) === '0' ? 'destructive' :
                    'destructive'
                  }
                >
                  {getStatusText(promotion.status)}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                {promotion.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('promotions.discountType')}:</span>
                <div className="flex items-center gap-2">
               
                  <span className="font-medium">
                    {String(promotion.type) === '%' ? `${promotion.value}%` : `₫${Number(promotion.value).toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{t('promotions.from')} {promotion.startDate} {t('promotions.to')} {promotion.endDate}</span>
              </div>

              {/* Target package is not provided by API; omitted */}

              {/* Usage/min months not provided by API; omitted */}

              <div className="pt-2 border-t">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditPromotion(items.find(item => String(item.promotionId) === promotion.id)!)}
                  >
                    {t('common.edit')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleSuspendPromotion(items.find(item => String(item.promotionId) === promotion.id)!)}
                  >
                    {String(promotion.status) === '1' ? t('promotions.suspend') : t('promotions.activate')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      <EditPromotionDialog
        promotion={editingPromotion ? convertApiPromotionToPromotion(editingPromotion) : null}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onPromotionUpdated={handlePromotionUpdated}
      />

      {/* Success Modal */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Thành công
            </DialogTitle>
            <DialogDescription>
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSuccessModalOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
