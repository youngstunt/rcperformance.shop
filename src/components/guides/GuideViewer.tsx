"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Clock,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Download,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Wrench,
} from "lucide-react"
import type { ToolGuide, GuideType } from "@/lib/guides/types"

interface GuideViewerProps {
  guide: ToolGuide
  guideType: GuideType
  vehicleInfo?: {
    year?: string
    make?: string
    model?: string
  }
  obdLocation?: string
  compact?: boolean
}

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
}

const guideTypeTitles: Record<GuideType, string> = {
  reading: "ECU Reading Guide",
  writing: "ECU Flashing Guide",
  datalogging: "Datalogging Guide",
}

const guideTypeDescriptions: Record<GuideType, string> = {
  reading: "Follow these steps to read your ECU and submit your stock file",
  writing: "Follow these steps to flash your tune file after receiving it",
  datalogging: "Follow these steps to create datalogs for tune refinement",
}

export function GuideViewer({
  guide,
  guideType,
  vehicleInfo,
  obdLocation,
  compact = false,
}: GuideViewerProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>("step-1")

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              {guideTypeTitles[guideType]}
            </CardTitle>
            <Badge variant="outline" className={difficultyColors[guide.difficulty]}>
              {guide.difficulty}
            </Badge>
          </div>
          <CardDescription>
            Using {guide.tool}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick overview */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {guide.estimatedTime}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              {guide.steps.length} steps
            </div>
          </div>

          {/* Steps as accordion */}
          <Accordion
            type="single"
            collapsible
            value={expandedStep || undefined}
            onValueChange={(val) => setExpandedStep(val)}
          >
            {guide.steps.map((step) => (
              <AccordionItem key={step.step} value={`step-${step.step}`}>
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {step.step}
                    </span>
                    {step.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2 pl-8">
                  <p className="text-muted-foreground">{step.description}</p>
                  {step.warning && (
                    <Alert variant="destructive" className="py-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">{step.warning}</AlertDescription>
                    </Alert>
                  )}
                  {step.tip && (
                    <div className="flex items-start gap-2 text-xs text-blue-500 bg-blue-500/10 p-2 rounded">
                      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {step.tip}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {guideTypeTitles[guideType]}
              </CardTitle>
              <CardDescription className="mt-1">
                {guideTypeDescriptions[guideType]}
              </CardDescription>
            </div>
            <Badge variant="outline" className={difficultyColors[guide.difficulty]}>
              {guide.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{guide.tool}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{guide.estimatedTime}</span>
            </div>
            {vehicleInfo && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="font-medium">
                  {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* OBD Location */}
      {obdLocation && (
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>OBD-II Port Location</AlertTitle>
          <AlertDescription>{obdLocation}</AlertDescription>
        </Alert>
      )}

      {/* Requirements */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              Software Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.softwareRequired.map((sw, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{sw}</span>
                  {guide.softwareDownloadUrls?.[sw] && (
                    <a
                      href={guide.softwareDownloadUrls[sw]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span className="text-xs">Download</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Hardware Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.hardwareRequired.map((hw, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {hw}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Important Warnings */}
      {guide.warnings.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Warnings</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {guide.warnings.map((warning, i) => (
                <li key={i} className="text-sm">{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Step-by-Step Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {guide.steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < guide.steps.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-border" />
                )}

                <div className="flex gap-4">
                  {/* Step number */}
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
                    {step.step}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-6">
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{step.description}</p>

                    {step.warning && (
                      <Alert variant="destructive" className="mb-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{step.warning}</AlertDescription>
                      </Alert>
                    )}

                    {step.tip && (
                      <div className="flex items-start gap-2 text-sm text-blue-500 bg-blue-500/10 p-3 rounded-lg">
                        <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      {guide.troubleshooting && guide.troubleshooting.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {guide.troubleshooting.map((item, i) => (
                <AccordionItem key={i} value={`trouble-${i}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {item.problem}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.solution}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {guide.tips.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
