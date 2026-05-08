"use client"

import {
  LayoutDashboard,
  FileInput,
  BarChart3,
  Lightbulb,
  Bell,
  LogOut,
  Leaf,
  Zap,
  Menu,
  X,
} from "lucide-react"
import { useNavigation } from "@/contexts/navigation-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type NavItem = {
  icon: React.ElementType
  label: string
  screen: "dashboard" | "data-entry" | "reports" | "recommendations" | "alerts"
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", screen: "dashboard" },
  { icon: FileInput, label: "Data Entry", screen: "data-entry" },
  { icon: BarChart3, label: "Reports", screen: "reports" },
  { icon: Lightbulb, label: "Recommendations", screen: "recommendations" },
  { icon: Bell, label: "Alerts", screen: "alerts" },
]

export function Sidebar() {
  const { currentScreen, setCurrentScreen, setIsAuthenticated, setUser, user } = useNavigation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCurrentScreen("login")
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-green to-eco-teal flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-eco-blue flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">EcoSave AI</h1>
            <p className="text-xs text-muted-foreground">Smart Savings</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen
            return (
              <li key={item.screen}>
                <button
                  onClick={() => {
                    setCurrentScreen(item.screen)
                    setIsMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.screen === "alerts" && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-eco-green/20 flex items-center justify-center">
            <span className="text-sm font-medium text-eco-green">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive mt-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-200 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  )
}
