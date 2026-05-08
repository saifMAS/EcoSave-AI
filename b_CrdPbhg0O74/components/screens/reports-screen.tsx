"use client"

import { useState } from "react"
import { BarChart3, TrendingDown, TrendingUp, Sparkles, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyData = [
  { name: "Mon", water: 120, electricity: 85, prevWater: 135, prevElectricity: 92 },
  { name: "Tue", water: 98, electricity: 92, prevWater: 110, prevElectricity: 88 },
  { name: "Wed", water: 145, electricity: 78, prevWater: 150, prevElectricity: 85 },
  { name: "Thu", water: 110, electricity: 88, prevWater: 125, prevElectricity: 90 },
  { name: "Fri", water: 89, electricity: 95, prevWater: 105, prevElectricity: 98 },
  { name: "Sat", water: 156, electricity: 110, prevWater: 170, prevElectricity: 115 },
  { name: "Sun", water: 132, electricity: 98, prevWater: 145, prevElectricity: 105 },
]

const monthlyData = [
  { name: "Jan", water: 3200, electricity: 2800 },
  { name: "Feb", water: 2900, electricity: 2600 },
  { name: "Mar", water: 3100, electricity: 2500 },
  { name: "Apr", water: 2700, electricity: 2400 },
  { name: "May", water: 2500, electricity: 2300 },
  { name: "Jun", water: 2300, electricity: 2100 },
]

const distributionData = [
  { name: "Kitchen", value: 35, color: "oklch(0.65 0.15 230)" },
  { name: "Bathroom", value: 40, color: "oklch(0.7 0.18 160)" },
  { name: "Garden", value: 15, color: "oklch(0.65 0.12 180)" },
  { name: "Other", value: 10, color: "oklch(0.6 0.12 200)" },
]

const aiPredictions = [
  { month: "Jul", predicted: 2200, confidence: 92 },
  { month: "Aug", predicted: 2350, confidence: 88 },
  { month: "Sep", predicted: 2150, confidence: 85 },
]

type TimeRange = "week" | "month"

export function ReportsScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week")

  const totalWaterSaved = 245
  const totalElectricitySaved = 32
  const percentageWaterReduction = 12
  const percentageElectricityReduction = 8

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your consumption patterns and trends
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
            <Button
              variant={timeRange === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("week")}
              className={timeRange === "week" ? "bg-primary text-primary-foreground" : ""}
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("month")}
              className={timeRange === "month" ? "bg-primary text-primary-foreground" : ""}
            >
              Monthly
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-eco-blue mb-2">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">Water Saved</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalWaterSaved} L</p>
              <p className="text-sm text-muted-foreground">This {timeRange}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-warning mb-2">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">Energy Saved</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalElectricitySaved} kWh</p>
              <p className="text-sm text-muted-foreground">This {timeRange}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-eco-green mb-2">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">Water Reduction</span>
              </div>
              <p className="text-2xl font-bold text-foreground">-{percentageWaterReduction}%</p>
              <p className="text-sm text-muted-foreground">vs. previous {timeRange}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-eco-teal mb-2">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">Energy Reduction</span>
              </div>
              <p className="text-2xl font-bold text-foreground">-{percentageElectricityReduction}%</p>
              <p className="text-sm text-muted-foreground">vs. previous {timeRange}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Comparison Chart */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-eco-blue" />
                {timeRange === "week" ? "Weekly" : "Monthly"} Comparison
              </CardTitle>
              <CardDescription>Current vs. previous period consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
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
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="oklch(0.65 0.15 230)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.65 0.15 230)" }}
                      name="Water (Current)"
                    />
                    <Line
                      type="monotone"
                      dataKey="prevWater"
                      stroke="oklch(0.65 0.15 230)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "oklch(0.65 0.15 230)" }}
                      name="Water (Previous)"
                    />
                    <Line
                      type="monotone"
                      dataKey="electricity"
                      stroke="oklch(0.75 0.15 80)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.75 0.15 80)" }}
                      name="Energy (Current)"
                    />
                    <Line
                      type="monotone"
                      dataKey="prevElectricity"
                      stroke="oklch(0.75 0.15 80)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "oklch(0.75 0.15 80)" }}
                      name="Energy (Previous)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-eco-green" />
                6-Month Trend
              </CardTitle>
              <CardDescription>Long-term consumption analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
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
                    <Bar
                      dataKey="water"
                      fill="oklch(0.65 0.15 230)"
                      radius={[4, 4, 0, 0]}
                      name="Water (L)"
                    />
                    <Bar
                      dataKey="electricity"
                      fill="oklch(0.75 0.15 80)"
                      radius={[4, 4, 0, 0]}
                      name="Energy (kWh)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water Distribution */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Water Usage Distribution</CardTitle>
              <CardDescription>Breakdown by area of usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.16 0.01 240)",
                          border: "1px solid oklch(0.25 0.02 240)",
                          borderRadius: "8px",
                          color: "oklch(0.95 0 0)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {distributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="bg-card border-border/50 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-eco-green" />
                AI Predictions
              </CardTitle>
              <CardDescription>Forecasted consumption for upcoming months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPredictions.map((prediction) => (
                  <div
                    key={prediction.month}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{prediction.month} 2026</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-eco-green/10 text-eco-green">
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-eco-green">
                        {prediction.predicted.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">L predicted water usage</span>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-eco-green rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
