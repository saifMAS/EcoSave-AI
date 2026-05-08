"use client"

import { useState } from "react"
import {
  Sparkles,
  Droplets,
  Zap,
  ThermometerSun,
  Lightbulb,
  Timer,
  Leaf,
  ChevronRight,
  Check,
  Bookmark,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Recommendation {
  id: number
  category: "water" | "electricity" | "general"
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  savings: string
  difficulty: "Easy" | "Moderate" | "Hard"
  icon: React.ElementType
  implemented: boolean
  saved: boolean
}

const initialRecommendations: Recommendation[] = [
  {
    id: 1,
    category: "water",
    title: "Reduce shower duration by 2 minutes",
    description:
      "Based on your usage patterns, reducing shower time could save significant water. The average shower uses about 6 liters per minute.",
    impact: "High",
    savings: "Save 12L water daily",
    difficulty: "Easy",
    icon: Timer,
    implemented: false,
    saved: false,
  },
  {
    id: 2,
    category: "electricity",
    title: "Switch remaining bulbs to LED",
    description:
      "You have 5 non-LED bulbs detected in your usage pattern. LED bulbs use 75% less energy than incandescent lighting.",
    impact: "High",
    savings: "Save 15% on lighting costs",
    difficulty: "Easy",
    icon: Lightbulb,
    implemented: false,
    saved: true,
  },
  {
    id: 3,
    category: "water",
    title: "Fix detected minor leak",
    description:
      "Our AI detected unusual water consumption pattern suggesting a minor leak. Even small leaks can waste 10,000 liters per year.",
    impact: "High",
    savings: "Save up to 30L daily",
    difficulty: "Moderate",
    icon: Droplets,
    implemented: false,
    saved: false,
  },
  {
    id: 4,
    category: "electricity",
    title: "Optimize AC temperature settings",
    description:
      "Setting your AC 2 degrees higher in summer can reduce energy consumption by up to 10% without significant comfort impact.",
    impact: "Medium",
    savings: "Save 10% on cooling",
    difficulty: "Easy",
    icon: ThermometerSun,
    implemented: true,
    saved: false,
  },
  {
    id: 5,
    category: "general",
    title: "Install a smart power strip",
    description:
      "Phantom loads from devices on standby account for 5-10% of residential energy use. Smart strips eliminate this waste.",
    impact: "Medium",
    savings: "Save 5-10% on electricity",
    difficulty: "Easy",
    icon: Zap,
    implemented: false,
    saved: true,
  },
  {
    id: 6,
    category: "water",
    title: "Use dishwasher on full loads only",
    description:
      "Running full loads instead of partial ones can save up to 20 liters per cycle. Our data shows you run 3 partial loads weekly.",
    impact: "Medium",
    savings: "Save 60L weekly",
    difficulty: "Easy",
    icon: Droplets,
    implemented: false,
    saved: false,
  },
]

type FilterCategory = "all" | "water" | "electricity" | "general"

export function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredRecommendations =
    activeFilter === "all"
      ? recommendations
      : recommendations.filter((r) => r.category === activeFilter)

  const handleImplemented = (id: number) => {
    setRecommendations(
      recommendations.map((r) => (r.id === id ? { ...r, implemented: !r.implemented } : r))
    )
  }

  const handleSave = (id: number) => {
    setRecommendations(
      recommendations.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r))
    )
  }

  const implementedCount = recommendations.filter((r) => r.implemented).length
  const totalSavings = "$47/month"

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "water":
        return "text-eco-blue bg-eco-blue/10"
      case "electricity":
        return "text-warning bg-warning/10"
      default:
        return "text-eco-green bg-eco-green/10"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-eco-green bg-eco-green/10"
      case "Medium":
        return "text-eco-blue bg-eco-blue/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-eco-green" />
            AI Recommendations
          </h1>
          <p className="text-muted-foreground mt-1">
            Personalized tips powered by AI to help you save more
          </p>
        </div>

        {/* Stats Banner */}
        <Card className="mb-8 bg-gradient-to-r from-eco-green/10 via-eco-teal/10 to-eco-blue/10 border-border/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Recommendations</p>
                <p className="text-2xl font-bold text-foreground">{recommendations.length} tips</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Implemented</p>
                <p className="text-2xl font-bold text-eco-green">
                  {implementedCount}/{recommendations.length}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold text-eco-green">{totalSavings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(["all", "water", "electricity", "general"] as FilterCategory[]).map((filter) => (
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
              {filter === "water" && <Droplets className="w-4 h-4 mr-1" />}
              {filter === "electricity" && <Zap className="w-4 h-4 mr-1" />}
              {filter === "general" && <Leaf className="w-4 h-4 mr-1" />}
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <Card
              key={rec.id}
              className={`bg-card border-border/50 transition-all ${
                rec.implemented ? "opacity-70" : ""
              }`}
            >
              <CardContent className="p-0">
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(rec.category)}`}>
                      <rec.icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3
                            className={`font-medium text-foreground ${
                              rec.implemented ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {rec.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(rec.impact)}`}>
                              {rec.impact} impact
                            </span>
                            <span className="text-xs text-eco-green font-medium">{rec.savings}</span>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-muted-foreground transition-transform ${
                            expandedId === rec.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === rec.id && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-16 pl-4 border-l-2 border-border">
                      <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                          Difficulty: {rec.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={rec.implemented ? "outline" : "default"}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImplemented(rec.id)
                          }}
                          className={rec.implemented ? "border-eco-green text-eco-green" : "bg-primary text-primary-foreground"}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {rec.implemented ? "Implemented" : "Mark as Done"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSave(rec.id)
                          }}
                          className={rec.saved ? "text-warning" : "text-muted-foreground"}
                        >
                          <Bookmark className={`w-4 h-4 ${rec.saved ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <Card className="bg-card border-border/50">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recommendations in this category</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
