"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Screen = 
  | "login" 
  | "register" 
  | "dashboard" 
  | "data-entry" 
  | "reports" 
  | "recommendations" 
  | "alerts"

interface NavigationContextType {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: { name: string; email: string } | null
  setUser: (user: { name: string; email: string } | null) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
