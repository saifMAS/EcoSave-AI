"use client"

import { Droplets, Zap, TrendingDown, TrendingUp, Sparkles, Bell, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { useNavigation } from "@/contexts/navigation-context"

// Sample data for charts
const consumptionData = [
  { name: "Mon", water: 120, electricity: 85 },
  { name: "Tue", water: 98, electricity: 92 },
  { name: "Wed", water: 145, electricity: 78 },
  { name: "Thu", water: 110, electricity: 88 },
  { name: "Fri", water: 89, electricity: 95 },
  { name: "Sat", water: 156, electricity: 110 },
  { name: "Sun", water: 132, electricity: 98 },
]

const monthlyData = [
  { name: "Jan", water: 3200, electricity: 2800 },
  { name: "Feb", water: 2900, electricity: 2600 },
  { name: "Mar", water: 3100, electricity: 2500 },
  { name: "Apr", water: 2700, electricity: 2400 },
  { name: "May", water: 2500, electricity: 2300 },
  { name: "Jun", water: 2300, electricity: 2100 },
]

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High water usage detected",
    message: "Yesterday's usage was 23% above average",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "info",
    title: "New AI recommendation available",
    message: "Check out tips to reduce your electricity bill",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "success",
    title: "Monthly goal achieved",
    message: "You saved 15% on water this month",
    time: "1 day ago",
  },
]

const aiRecommendations = [
  {
    id: 1,
    title: "Optimize shower duration",
    description: "Reducing shower time by 2 minutes could save 12L of water daily",
    impact: "High",
  },
  {
    id: 2,
    title: "Switch to LED bulbs",
    description: "Replace 5 remaining incandescent bulbs to save 15% on lighting",
    impact: "Medium",
  },
]

export function DashboardScreen() {
  const { setCurrentScreen } = useNavigation()

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your water and electricity consumption</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Water Usage */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-eco-blue/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-eco-blue" />
                </div>
                <div className="flex items-center gap-1 text-eco-green text-sm">
                  <TrendingDown className="w-4 h-4" />
                  <span>-12%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">2,340 L</p>
                <p className="text-sm text-muted-foreground">Water this month</p>
              </div>
            </CardContent>
          </Card>

          {/* Electricity Usage */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-warning" />
                </div>
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">487 kWh</p>
                <p className="text-sm text-muted-foreground">Electricity this month</p>
              </div>
            </CardContent>
          </Card>

          {/* Savings */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-eco-green/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-eco-green" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-eco-green/10 text-eco-green">
                  On track
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">$127</p>
                <p className="text-sm text-muted-foreground">Estimated savings</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Score */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                  Good
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">78/100</p>
                <p className="text-sm text-muted-foreground">Eco Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Consumption Chart */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Consumption</CardTitle>
              <CardDescription>Water and electricity usage this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={consumptionData}>
                    <defs>
                      <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.15 230)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.15 230)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="electricityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                    <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 240)",
                        border: "1px solid oklch(0.25 0.02 240)",
                        borderRadius: "8px",
                        color: "oklch(0.95 0 0)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="water"
                      stroke="oklch(0.65 0.15 230)"
                      fill="url(#waterGradient)"
                      strokeWidth={2}
                      name="Water (L)"
                    />
                    <Area
                      type="monotone"
                      dataKey="electricity"
                      stroke="oklch(0.75 0.15 80)"
                      fill="url(#electricityGradient)"
                      strokeWidth={2}
                      name="Electricity (kWh)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Comparison Chart */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Statistics</CardTitle>
              <CardDescription>Comparison over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                    <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 240)",
                        border: "1px solid oklch(0.25 0.02 240)",
                        borderRadius: "8px",
                        color: "oklch(0.95 0 0)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="water" fill="oklch(0.65 0.15 230)" radius={[4, 4, 0, 0]} name="Water (L)" />
                    <Bar dataKey="electricity" fill="oklch(0.75 0.15 80)" radius={[4, 4, 0, 0]} name="Electricity (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Recommendations */}
          <Card className="bg-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-eco-green" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Personalized tips to save more</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-eco-green hover:text-eco-green/80"
                onClick={() => setCurrentScreen("recommendations")}
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-eco-green/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        rec.impact === "High"
                          ? "bg-eco-green/10 text-eco-green"
                          : "bg-eco-blue/10 text-eco-blue"
                      }`}
                    >
                      {rec.impact} impact
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-eco-blue" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>Stay updated on your consumption</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-eco-blue hover:text-eco-blue/80"
                onClick={() => setCurrentScreen("alerts")}
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === "warning"
                        ? "bg-warning"
                        : alert.type === "success"
                        ? "bg-eco-green"
                        : "bg-eco-blue"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
