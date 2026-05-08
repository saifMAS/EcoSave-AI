"use client"

import { useState } from "react"
import { Droplets, Zap, Calendar, CheckCircle, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ConsumptionEntry {
  id: number
  date: string
  water: number
  electricity: number
  status: "pending" | "submitted"
}

export function DataEntryScreen() {
  const [waterUsage, setWaterUsage] = useState("")
  const [electricityUsage, setElectricityUsage] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [recentEntries, setRecentEntries] = useState<ConsumptionEntry[]>([
    { id: 1, date: "2026-05-08", water: 145, electricity: 12, status: "submitted" },
    { id: 2, date: "2026-05-07", water: 132, electricity: 14, status: "submitted" },
    { id: 3, date: "2026-05-06", water: 156, electricity: 11, status: "submitted" },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newEntry: ConsumptionEntry = {
      id: Date.now(),
      date: selectedDate,
      water: parseFloat(waterUsage),
      electricity: parseFloat(electricityUsage),
      status: "submitted",
    }

    setRecentEntries([newEntry, ...recentEntries])
    setWaterUsage("")
    setElectricityUsage("")
    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDelete = (id: number) => {
    setRecentEntries(recentEntries.filter((entry) => entry.id !== id))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Data Entry</h1>
          <p className="text-muted-foreground mt-1">
            Record your daily water and electricity consumption
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-eco-green/10 border border-eco-green/30 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-eco-green" />
            <p className="text-sm text-eco-green font-medium">
              Consumption data submitted successfully!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entry Form */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-eco-green" />
                New Entry
              </CardTitle>
              <CardDescription>Enter your consumption data for a specific date</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-input border-border"
                    required
                  />
                </div>

                {/* Water Usage */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-eco-blue" />
                    Water Usage (Liters)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter water consumption"
                      value={waterUsage}
                      onChange={(e) => setWaterUsage(e.target.value)}
                      className="bg-input border-border pr-12"
                      min="0"
                      step="0.1"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      L
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average household: 100-150 liters/day
                  </p>
                </div>

                {/* Electricity Usage */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-warning" />
                    Electricity Usage (kWh)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter electricity consumption"
                      value={electricityUsage}
                      onChange={(e) => setElectricityUsage(e.target.value)}
                      className="bg-input border-border pr-16"
                      min="0"
                      step="0.1"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      kWh
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average household: 10-15 kWh/day
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Entry"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Recent Entries</CardTitle>
              <CardDescription>Your latest consumption records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No entries yet</p>
                    <p className="text-sm">Start by adding your first consumption record</p>
                  </div>
                ) : (
                  recentEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-eco-green/10 text-eco-green">
                            {entry.status}
                          </span>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-eco-blue" />
                          <span className="text-sm text-muted-foreground">
                            {entry.water} L
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-warning" />
                          <span className="text-sm text-muted-foreground">
                            {entry.electricity} kWh
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Card */}
        <Card className="mt-6 bg-gradient-to-r from-eco-green/10 to-eco-blue/10 border-border/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Quick Tip</h3>
            <p className="text-sm text-muted-foreground">
              For the most accurate tracking, try to record your consumption at the same time each
              day. Check your water meter and electricity meter readings to get precise values.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
