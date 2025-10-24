"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { uiTranslations } from "@/lib/ui-i18n"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, initialized } = useAuth()
  const { language } = useLanguage()
  const ui = uiTranslations[language]
  const router = useRouter()

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.push("/login")
    }
  }, [initialized, isAuthenticated, router])

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{ui.checkingAccess}</h2>
          <p className="text-muted-foreground">{ui.pleaseWait}</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{ui.checkingAccess}</h2>
          <p className="text-muted-foreground">{ui.pleaseLogin}</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
