"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-provider"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Store, Users, Wallet, BarChart3, Settings, HelpCircle, LogOut, Menu, Gift, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()
  const { t } = useLanguage()

  const navItems = [
    { name: t('common.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('common.shops'), href: "/shops", icon: Store, badge: "12" },
    { name: t('common.users'), href: "/users", icon: Users, badge: "8" },
    { name: t('common.transactions'), href: "/transactions", icon: Wallet },
    { name: t('common.promotions'), href: "/promotions", icon: Gift },
    { name: t('common.packages'), href: "/packages", icon: Package },
    { name: t('common.analytics'), href: "/analytics", icon: BarChart3 },
  ]

  const footerItems = [
    {
      name: t('common.settings'),
      href: "/settings",
      icon: Settings,
      subItems: [
        { name: t('settings.profile'), href: "/settings/profile", description: t('settings.updateDetails') },
        { name: t('settings.security'), href: "/settings/security", description: t('settings.managePassword') },
        { name: t('settings.communication'), href: "/settings/communication", description: t('settings.emailPhone') },
        { name: t('settings.permissions'), href: "/settings/permissions", description: t('settings.accessControl') },
      ],
    },
    { name: t('common.help'), href: "/help", icon: HelpCircle, description: "Get support" },
    { name: t('common.logout'), href: "/logout", icon: LogOut, description: "Exit the app" },
  ]

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">POS Admin</span>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-2">
            <nav className="grid gap-1">
              {footerItems.map((item, index) => (
                <div key={index}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                      <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                              pathname === subItem.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                            )}
                          >
                            <span>{subItem.name}</span>
                            {subItem.description && (
                              <span className="ml-auto text-xs text-muted-foreground">{subItem.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      {item.description && (
                        <span className="ml-auto text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
