"use client"

import { useState } from "react"
import {
  Bell,
  AlertTriangle,
  Droplets,
  Zap,
  CheckCircle,
  Info,
  X,
  Filter,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Alert {
  id: number
  type: "critical" | "warning" | "info" | "success"
  category: "water" | "electricity" | "system"
  title: string
  message: string
  suggestedAction: string
  timestamp: string
  read: boolean
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: "critical",
    category: "water",
    title: "Potential Water Leak Detected",
    message:
      "Abnormal water flow detected during nighttime hours (2 AM - 5 AM). This pattern suggests a possible leak in your plumbing system.",
    suggestedAction: "Check all faucets, toilets, and visible pipes for leaks. Consider calling a plumber if issue persists.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    category: "electricity",
    title: "High Energy Consumption Alert",
    message:
      "Your electricity usage yesterday was 35% higher than your weekly average. Main contributors: HVAC system and kitchen appliances.",
    suggestedAction: "Review HVAC settings and check if any appliances were left running unnecessarily.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    category: "water",
    title: "Unusual Water Usage Pattern",
    message:
      "Water consumption increased by 23% compared to last week. This might be normal if you had guests or increased outdoor watering.",
    suggestedAction: "Review your water usage breakdown in the Reports section to identify the cause.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "info",
    category: "system",
    title: "New AI Recommendations Available",
    message:
      "Based on your recent consumption patterns, we have generated 3 new personalized tips that could help you save more.",
    suggestedAction: "Visit the Recommendations section to view your personalized tips.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "success",
    category: "water",
    title: "Monthly Water Goal Achieved",
    message:
      "Congratulations! You have achieved your monthly water conservation goal, saving 15% compared to last month.",
    suggestedAction: "Keep up the great work! Consider setting a more ambitious goal for next month.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "success",
    category: "electricity",
    title: "Energy Efficiency Milestone",
    message:
      "You have maintained below-average electricity consumption for 7 consecutive days. Your eco score has improved.",
    suggestedAction: "Review what strategies worked and continue implementing them.",
    timestamp: "3 days ago",
    read: true,
  },
]

type FilterType = "all" | "critical" | "warning" | "info" | "success"

export function AlertsScreen() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredAlerts =
    activeFilter === "all" ? alerts : alerts.filter((a) => a.type === activeFilter)

  const unreadCount = alerts.filter((a) => !a.read).length
  const criticalCount = alerts.filter((a) => a.type === "critical").length

  const handleMarkAsRead = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }

  const handleDismiss = (id: number) => {
    setAlerts(alerts.filter((a) => a.id !== id))
  }

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })))
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          icon: AlertTriangle,
          iconColor: "text-destructive",
          badge: "bg-destructive text-destructive-foreground",
        }
      case "warning":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          icon: AlertTriangle,
          iconColor: "text-warning",
          badge: "bg-warning text-warning-foreground",
        }
      case "success":
        return {
          bg: "bg-eco-green/10",
          border: "border-eco-green/30",
          icon: CheckCircle,
          iconColor: "text-eco-green",
          badge: "bg-eco-green/20 text-eco-green",
        }
      default:
        return {
          bg: "bg-eco-blue/10",
          border: "border-eco-blue/30",
          icon: Info,
          iconColor: "text-eco-blue",
          badge: "bg-eco-blue/20 text-eco-blue",
        }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "water":
        return Droplets
      case "electricity":
        return Zap
      default:
        return Bell
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
              <Bell className="w-8 h-8 text-eco-blue" />
              Alerts & Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay informed about your consumption and system updates
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              className="border-border text-muted-foreground hover:text-foreground"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
              <p className="text-xs text-muted-foreground">Total Alerts</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-eco-blue">{unreadCount}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-eco-green">
                {alerts.filter((a) => a.type === "success").length}
              </p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(["all", "critical", "warning", "info", "success"] as FilterType[]).map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {filter !== "all" && (
                <span className="ml-1 text-xs">
                  ({alerts.filter((a) => a.type === filter).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type)
            const CategoryIcon = getCategoryIcon(alert.category)
            const AlertIcon = styles.icon

            return (
              <Card
                key={alert.id}
                className={`${styles.bg} border ${styles.border} transition-all ${
                  !alert.read ? "ring-1 ring-ring/20" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${styles.bg}`}>
                      <AlertIcon className={`w-5 h-5 ${styles.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground">{alert.title}</h3>
                            {!alert.read && (
                              <span className="w-2 h-2 rounded-full bg-eco-blue" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
                              {alert.type}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CategoryIcon className="w-3 h-3" />
                              {alert.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDismiss(alert.id)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Dismiss alert"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>

                      <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <p className="text-xs font-medium text-foreground mb-1">Suggested Action:</p>
                        <p className="text-xs text-muted-foreground">{alert.suggestedAction}</p>
                      </div>

                      {!alert.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="bg-card border-border/50">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No alerts in this category</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
