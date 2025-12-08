import { ToolGuide, EcuTool, GuideType } from "../types"

// Import all tool guides
import {
  tactrixReadingGuide,
  tactrixWritingGuide,
  tactrixDataloggingGuide,
} from "./tactrix"
import {
  hptunersReadingGuide,
  hptunersWritingGuide,
  hptunersDataloggingGuide,
} from "./hptuners"
import {
  cobbReadingGuide,
  cobbWritingGuide,
  cobbDataloggingGuide,
} from "./cobb"
import {
  pcmflashReadingGuide,
  pcmflashWritingGuide,
  pcmflashDataloggingGuide,
} from "./pcmflash"
import {
  ecuflashReadingGuide,
  ecuflashWritingGuide,
  ecuflashDataloggingGuide,
} from "./ecuflash"
import {
  romraiderReadingGuide,
  romraiderWritingGuide,
  romraiderDataloggingGuide,
} from "./romraider"
import {
  mpvi2ReadingGuide,
  mpvi2WritingGuide,
  mpvi2DataloggingGuide,
} from "./mpvi2"
import {
  ktagReadingGuide,
  ktagWritingGuide,
  ktagDataloggingGuide,
} from "./ktag"
import {
  otherReadingGuide,
  otherWritingGuide,
  otherDataloggingGuide,
} from "./other"

// Guide registry organized by tool and type
export const toolGuides: Record<EcuTool, Record<GuideType, ToolGuide>> = {
  "Tactrix Openport 2.0": {
    reading: tactrixReadingGuide,
    writing: tactrixWritingGuide,
    datalogging: tactrixDataloggingGuide,
  },
  "HP Tuners": {
    reading: hptunersReadingGuide,
    writing: hptunersWritingGuide,
    datalogging: hptunersDataloggingGuide,
  },
  "PCMFlash": {
    reading: pcmflashReadingGuide,
    writing: pcmflashWritingGuide,
    datalogging: pcmflashDataloggingGuide,
  },
  "COBB Accessport": {
    reading: cobbReadingGuide,
    writing: cobbWritingGuide,
    datalogging: cobbDataloggingGuide,
  },
  "EcuFlash": {
    reading: ecuflashReadingGuide,
    writing: ecuflashWritingGuide,
    datalogging: ecuflashDataloggingGuide,
  },
  "RomRaider": {
    reading: romraiderReadingGuide,
    writing: romraiderWritingGuide,
    datalogging: romraiderDataloggingGuide,
  },
  "MPVI2": {
    reading: mpvi2ReadingGuide,
    writing: mpvi2WritingGuide,
    datalogging: mpvi2DataloggingGuide,
  },
  "K-TAG": {
    reading: ktagReadingGuide,
    writing: ktagWritingGuide,
    datalogging: ktagDataloggingGuide,
  },
  "Other": {
    reading: otherReadingGuide,
    writing: otherWritingGuide,
    datalogging: otherDataloggingGuide,
  },
}

/**
 * Get a specific guide for a tool and guide type
 */
export function getToolGuide(tool: EcuTool, guideType: GuideType): ToolGuide {
  return toolGuides[tool][guideType]
}

/**
 * Get all guides for a specific tool
 */
export function getAllGuidesForTool(tool: EcuTool): Record<GuideType, ToolGuide> {
  return toolGuides[tool]
}

/**
 * Get all reading guides
 */
export function getAllReadingGuides(): ToolGuide[] {
  return Object.values(toolGuides).map((guides) => guides.reading)
}

/**
 * Get all writing guides
 */
export function getAllWritingGuides(): ToolGuide[] {
  return Object.values(toolGuides).map((guides) => guides.writing)
}

/**
 * Get all datalogging guides
 */
export function getAllDataloggingGuides(): ToolGuide[] {
  return Object.values(toolGuides).map((guides) => guides.datalogging)
}

// Export all individual guides for direct import if needed
export {
  tactrixReadingGuide,
  tactrixWritingGuide,
  tactrixDataloggingGuide,
  hptunersReadingGuide,
  hptunersWritingGuide,
  hptunersDataloggingGuide,
  cobbReadingGuide,
  cobbWritingGuide,
  cobbDataloggingGuide,
  pcmflashReadingGuide,
  pcmflashWritingGuide,
  pcmflashDataloggingGuide,
  ecuflashReadingGuide,
  ecuflashWritingGuide,
  ecuflashDataloggingGuide,
  romraiderReadingGuide,
  romraiderWritingGuide,
  romraiderDataloggingGuide,
  mpvi2ReadingGuide,
  mpvi2WritingGuide,
  mpvi2DataloggingGuide,
  ktagReadingGuide,
  ktagWritingGuide,
  ktagDataloggingGuide,
  otherReadingGuide,
  otherWritingGuide,
  otherDataloggingGuide,
}
