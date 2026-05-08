"use client"

import { NavigationProvider, useNavigation } from "@/contexts/navigation-context"
import { LoginScreen } from "@/components/screens/login-screen"
import { RegisterScreen } from "@/components/screens/register-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { DataEntryScreen } from "@/components/screens/data-entry-screen"
import { ReportsScreen } from "@/components/screens/reports-screen"
import { RecommendationsScreen } from "@/components/screens/recommendations-screen"
import { AlertsScreen } from "@/components/screens/alerts-screen"
import { Sidebar } from "@/components/layout/sidebar"

function AppContent() {
  const { currentScreen, isAuthenticated } = useNavigation()

  // Auth screens
  if (!isAuthenticated) {
    if (currentScreen === "register") {
      return <RegisterScreen />
    }
    return <LoginScreen />
  }

  // Main app with sidebar
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col lg:ml-0">
        {currentScreen === "dashboard" && <DashboardScreen />}
        {currentScreen === "data-entry" && <DataEntryScreen />}
        {currentScreen === "reports" && <ReportsScreen />}
        {currentScreen === "recommendations" && <RecommendationsScreen />}
        {currentScreen === "alerts" && <AlertsScreen />}
      </main>
    </div>
  )
}

export default function Home() {
  return <h1>EcoSave AI is working 🚀</h1>
}
