"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, initialized } = useAuth()
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
          <h2 className="text-2xl font-bold">Đang kiểm tra quyền truy cập...</h2>
          <p className="text-muted-foreground">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Đang kiểm tra quyền truy cập...</h2>
          <p className="text-muted-foreground">Vui lòng đăng nhập để tiếp tục</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
