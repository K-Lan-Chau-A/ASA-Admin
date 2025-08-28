"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Filter, Store, Calendar, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Transaction {
  id: string
  shopName: string
  shopOwner: string
  package: "basic" | "premium"
  amount: number
  type: "subscription" | "renewal" | "upgrade" | "refund"
  status: "completed" | "pending" | "failed"
  date: string
  paymentMethod: string
  invoiceNumber: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    shopName: "Coffee House",
    shopOwner: "Nguyễn Văn A",
    package: "premium",
    amount: 300000,
    type: "subscription",
    status: "completed",
    date: "2024-01-15",
    paymentMethod: "Chuyển khoản",
    invoiceNumber: "INV-001"
  },
  {
    id: "2",
    shopName: "Bakery Sweet",
    shopOwner: "Trần Thị B",
    package: "basic",
    amount: 150000,
    type: "renewal",
    status: "completed",
    date: "2024-01-14",
    paymentMethod: "Chuyển khoản",
    invoiceNumber: "INV-002"
  },
  {
    id: "3",
    shopName: "Tech Store",
    shopOwner: "Lê Văn C",
    package: "premium",
    amount: 300000,
    type: "upgrade",
    status: "pending",
    date: "2024-01-13",
    paymentMethod: "Thẻ tín dụng",
    invoiceNumber: "INV-003"
  },
  {
    id: "4",
    shopName: "Fashion Boutique",
    shopOwner: "Phạm Thị D",
    package: "basic",
    amount: 150000,
    type: "subscription",
    status: "completed",
    date: "2024-01-12",
    paymentMethod: "Chuyển khoản",
    invoiceNumber: "INV-004"
  },
  {
    id: "5",
    shopName: "Restaurant Deluxe",
    shopOwner: "Hoàng Văn E",
    package: "premium",
    amount: 300000,
    type: "renewal",
    status: "completed",
    date: "2024-01-11",
    paymentMethod: "Thẻ tín dụng",
    invoiceNumber: "INV-005"
  },
  {
    id: "6",
    shopName: "Pharmacy Plus",
    shopOwner: "Võ Thị F",
    package: "basic",
    amount: 150000,
    type: "subscription",
    status: "failed",
    date: "2024-01-10",
    paymentMethod: "Chuyển khoản",
    invoiceNumber: "INV-006"
  }
]

export default function TransactionsPage() {
  const { t } = useLanguage()

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case "subscription":
        return t('transactions.subscription')
      case "renewal":
        return t('transactions.renewal')
      case "upgrade":
        return t('transactions.upgrade')
      case "refund":
        return t('transactions.refund')
      default:
        return type
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "Chuyển khoản":
        return t('transactions.bankTransfer')
      case "Thẻ tín dụng":
        return t('transactions.creditCard')
      default:
        return method
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
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+12% {t('transactions.fromLastMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.monthlyRevenue')}</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₫45,000,000</div>
            <p className="text-xs text-muted-foreground">+8.5% {t('transactions.fromLastMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.successfulTransactions')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,180</div>
            <p className="text-xs text-muted-foreground">{t('transactions.successRate')} 94.4%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('transactions.failedTransactions')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70</div>
            <p className="text-xs text-muted-foreground">{t('transactions.failureRate')} 5.6%</p>
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
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.shopName}</div>
                        <div className="text-sm text-muted-foreground">{transaction.shopOwner}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.package === 'premium' ? 'default' : 'secondary'}>
                        {transaction.package === 'premium' ? t('common.premium') : t('common.basic')}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₫{transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTransactionTypeText(transaction.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          transaction.status === 'completed' ? 'default' :
                          transaction.status === 'pending' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {transaction.status === 'completed' ? t('common.completed') :
                         transaction.status === 'pending' ? t('common.pending') : t('common.failed')}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{getPaymentMethodText(transaction.paymentMethod)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t('common.details')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
