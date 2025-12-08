// Guide types for ECU reading, writing, and datalogging instructions

export type EcuTool =
  | "Tactrix Openport 2.0"
  | "HP Tuners"
  | "PCMFlash"
  | "COBB Accessport"
  | "EcuFlash"
  | "RomRaider"
  | "MPVI2"
  | "K-TAG"
  | "Other"

export type GuideType = "reading" | "writing" | "datalogging"

export interface GuideStep {
  step: number
  title: string
  description: string
  warning?: string
  tip?: string
  image?: string
}

export interface ToolGuide {
  tool: EcuTool
  softwareRequired: string[]
  softwareDownloadUrls?: Record<string, string>
  hardwareRequired: string[]
  estimatedTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  steps: GuideStep[]
  troubleshooting?: Array<{
    problem: string
    solution: string
  }>
  warnings: string[]
  tips: string[]
}

export interface VehicleEcuInfo {
  make: string
  models: string[]
  years: { start: number; end: number }
  ecuTypes: string[]
  supportedTools: EcuTool[]
  specificNotes?: string
  obdLocation?: string
  commonIssues?: string[]
}

export interface VehicleGuide {
  vehicle: VehicleEcuInfo
  reading: Partial<Record<EcuTool, ToolGuide>>
  writing: Partial<Record<EcuTool, ToolGuide>>
  datalogging: Partial<Record<EcuTool, ToolGuide>>
}

// Helper to get guide for a specific vehicle and tool
export interface GuideQuery {
  make: string
  model: string
  year: number
  tool: EcuTool
  guideType: GuideType
}
