"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookOpen,
  FileInput,
  FileOutput,
  Activity,
  MapPin,
  Info,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { GuideViewer } from "./GuideViewer"
import { getToolGuide } from "@/lib/guides/tools"
import { findVehicleInfo, getObdLocation } from "@/lib/guides/vehicles"
import type { EcuTool, GuideType, ToolGuide } from "@/lib/guides/types"

interface VehicleGuidePanelProps {
  year?: string
  make?: string
  model?: string
  tool?: EcuTool
  showGuideType?: GuideType
  onClose?: () => void
}

export function VehicleGuidePanel({
  year,
  make,
  model,
  tool,
  showGuideType = "reading",
  onClose,
}: VehicleGuidePanelProps) {
  const [activeTab, setActiveTab] = useState<GuideType>(showGuideType)
  const [fullGuideOpen, setFullGuideOpen] = useState(false)

  // Get vehicle-specific info
  const vehicleInfo = make && model && year
    ? findVehicleInfo(make, model, parseInt(year))
    : null

  // Get OBD location
  const obdLocation = make && model && year
    ? getObdLocation(make, model, parseInt(year))
    : undefined

  // Get the guide for the selected tool
  const guide = tool ? getToolGuide(tool, activeTab) : null

  if (!tool) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            ECU Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select an ECU reading tool above to see detailed instructions.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {tool} Guide
            </CardTitle>
            {year && make && model && (
              <CardDescription className="mt-1">
                for {year} {make} {model}
              </CardDescription>
            )}
          </div>
          <Dialog open={fullGuideOpen} onOpenChange={setFullGuideOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="w-3 h-3" />
                Full Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {tool} - {activeTab === "reading" ? "ECU Reading" : activeTab === "writing" ? "Flashing" : "Datalogging"} Guide
                </DialogTitle>
              </DialogHeader>
              {guide && (
                <GuideViewer
                  guide={guide}
                  guideType={activeTab}
                  vehicleInfo={{ year, make, model }}
                  obdLocation={obdLocation}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OBD Location quick info */}
        {obdLocation && (
          <div className="flex items-start gap-2 p-2 bg-muted rounded-lg text-sm">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">OBD-II Port: </span>
              <span className="text-muted-foreground">{obdLocation}</span>
            </div>
          </div>
        )}

        {/* Vehicle-specific notes */}
        {vehicleInfo?.specificNotes && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {vehicleInfo.specificNotes}
            </AlertDescription>
          </Alert>
        )}

        {/* Guide tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as GuideType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reading" className="text-xs gap-1">
              <FileInput className="w-3 h-3" />
              Read
            </TabsTrigger>
            <TabsTrigger value="writing" className="text-xs gap-1">
              <FileOutput className="w-3 h-3" />
              Flash
            </TabsTrigger>
            <TabsTrigger value="datalogging" className="text-xs gap-1">
              <Activity className="w-3 h-3" />
              Log
            </TabsTrigger>
          </TabsList>

          {guide && (
            <>
              <TabsContent value="reading" className="mt-4">
                <GuideViewer guide={getToolGuide(tool, "reading")} guideType="reading" compact />
              </TabsContent>
              <TabsContent value="writing" className="mt-4">
                <GuideViewer guide={getToolGuide(tool, "writing")} guideType="writing" compact />
              </TabsContent>
              <TabsContent value="datalogging" className="mt-4">
                <GuideViewer guide={getToolGuide(tool, "datalogging")} guideType="datalogging" compact />
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
