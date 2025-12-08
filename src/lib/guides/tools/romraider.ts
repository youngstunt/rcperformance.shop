import { ToolGuide } from "../types"

export const romraiderReadingGuide: ToolGuide = {
  tool: "RomRaider",
  softwareRequired: ["RomRaider Editor", "ECU definition files"],
  softwareDownloadUrls: {
    RomRaider: "https://www.romraider.com/downloads.html",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable (recommended)",
    "Laptop with Windows/Mac/Linux",
    "Java Runtime Environment",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install RomRaider",
      description:
        "Download RomRaider from romraider.com. Install both the Editor and Logger components. Java Runtime is required.",
      tip: "RomRaider is open-source and free. It's the primary tool for Subaru and some Mitsubishi ECUs.",
    },
    {
      step: 2,
      title: "Install ECU Definitions",
      description:
        "Download definition files for your ECU from RomRaider forums. In RomRaider, go to Edit > Settings > Definitions and add the XML files.",
    },
    {
      step: 3,
      title: "Configure ECU Connection",
      description:
        "Go to Edit > Settings > Logger. Select Tactrix Openport as your interface. Set the correct COM port.",
    },
    {
      step: 4,
      title: "Read ECU ROM",
      description:
        "For reading, RomRaider typically uses EcuFlash. Open EcuFlash, read the ROM, then open the saved file in RomRaider Editor for viewing/editing.",
      tip: "RomRaider Editor is for editing ROMs. EcuFlash handles the actual reading from the ECU.",
    },
    {
      step: 5,
      title: "Verify ROM in RomRaider",
      description:
        "Open the read ROM file in RomRaider Editor. It should auto-detect the ECU and load the appropriate definition. You can view all maps and tables.",
    },
    {
      step: 6,
      title: "Upload for Tuning",
      description:
        "Save the ROM file and upload to your RC Performance ticket. RomRaider files are typically .bin format.",
    },
  ],
  troubleshooting: [
    {
      problem: "RomRaider won't open ROM file",
      solution:
        "Ensure correct definition is installed. Check that Java is installed and up to date. Try updating RomRaider.",
    },
    {
      problem: "Tables show incorrect values",
      solution:
        "Wrong definition selected. Find the correct definition for your specific ECU ID from RomRaider forums.",
    },
    {
      problem: "RomRaider crashes on startup",
      solution:
        "Update Java. Check RomRaider version compatibility. Delete settings file and restart.",
    },
  ],
  warnings: [
    "RomRaider Editor is for viewing/editing, not reading from ECU",
    "Use EcuFlash for the actual ECU read operation",
    "Wrong definitions = wrong table interpretations",
    "Always use appropriate definition for your ECU ID",
  ],
  tips: [
    "RomRaider community forums are excellent resources",
    "Learn your ECU ID - it determines which definition to use",
    "RomRaider can compare two ROMs to see differences",
    "The logger and editor work together but serve different functions",
  ],
}

export const romraiderWritingGuide: ToolGuide = {
  tool: "RomRaider",
  softwareRequired: ["RomRaider Editor (for viewing)", "EcuFlash (for writing)"],
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows",
    "Battery maintainer recommended",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Receive Tune File",
      description:
        "Download the tune file from your RC Performance ticket. This will be a .bin file ready for flashing.",
    },
    {
      step: 2,
      title: "Optional: Review in RomRaider",
      description:
        "You can open the tune file in RomRaider Editor to view the changes. This is optional but educational.",
      tip: "RomRaider shows all the maps and values in the tune.",
    },
    {
      step: 3,
      title: "Open in EcuFlash",
      description:
        "RomRaider Editor doesn't write to ECU. Open EcuFlash for the actual flash operation. Load your tune file.",
    },
    {
      step: 4,
      title: "Flash via EcuFlash",
      description:
        "Follow the EcuFlash writing guide to flash the tune to your ECU. RomRaider is for editing, EcuFlash for flashing.",
    },
    {
      step: 5,
      title: "Post-Flash",
      description:
        "After flashing via EcuFlash, follow standard post-flash procedures: cycle ignition, start vehicle, allow relearn.",
    },
  ],
  troubleshooting: [
    {
      problem: "Can't write from RomRaider",
      solution:
        "RomRaider Editor doesn't write to ECU. Use EcuFlash for the actual flash operation.",
    },
    {
      problem: "Tune file won't open in RomRaider",
      solution:
        "Check definition files are installed. The file should still flash fine via EcuFlash even if RomRaider can't display it.",
    },
  ],
  warnings: [
    "RomRaider Editor cannot write to ECU - use EcuFlash",
    "Follow EcuFlash guide for actual writing procedure",
    "Don't make changes in RomRaider unless instructed by RC Performance",
  ],
  tips: [
    "RomRaider is great for learning what's in a tune",
    "You can compare your stock vs tuned file in RomRaider",
    "EcuFlash and RomRaider use the same definition files",
  ],
}

export const romraiderDataloggingGuide: ToolGuide = {
  tool: "RomRaider",
  softwareRequired: ["RomRaider Logger", "Logger definition files"],
  softwareDownloadUrls: {
    RomRaider: "https://www.romraider.com/downloads.html",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows/Mac/Linux",
    "Laptop mount for in-car logging",
  ],
  estimatedTime: "Setup: 15 min, Logging: varies",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install RomRaider Logger",
      description:
        "During RomRaider installation, ensure Logger component is selected. Java Runtime required.",
    },
    {
      step: 2,
      title: "Configure Logger",
      description:
        "Open RomRaider Logger. Go to Settings. Select Tactrix Openport as interface. Select appropriate COM port.",
    },
    {
      step: 3,
      title: "Load Logger Definition",
      description:
        "Logger definitions determine what parameters are available. Load the definition matching your ECU from RomRaider forums.",
      tip: "Different from Editor definitions - Logger definitions are specifically for live data.",
    },
    {
      step: 4,
      title: "Connect to Vehicle",
      description:
        "Connect Tactrix cable to laptop and vehicle OBD-II port. Start engine. Click Connect in RomRaider Logger.",
    },
    {
      step: 5,
      title: "Select Parameters",
      description:
        "Choose parameters from the list. Essential: RPM, AFR/Lambda, Boost, Knock Correction, Feedback Knock, Timing, IAT, ECT.",
      tip: "Keep parameter count reasonable (10-15) for good logging speed.",
    },
    {
      step: 6,
      title: "Configure Gauges",
      description:
        "Set up gauge display for easy viewing while driving. Arrange most important parameters prominently.",
    },
    {
      step: 7,
      title: "Start Logging",
      description:
        "Click Start to begin live data. Click Record before your pull to save data. Watch knock values closely.",
    },
    {
      step: 8,
      title: "Perform Pulls",
      description:
        "For WOT: 3rd gear, rolling start 2500+ RPM, full throttle to redline. Capture 3-5 good pulls plus some part-throttle.",
      warning: "Only perform WOT in safe, legal conditions. Lift throttle if knock is excessive.",
    },
    {
      step: 9,
      title: "Save and Upload",
      description:
        "Stop recording. Save log file (.csv). Upload to your RC Performance ticket with notes on conditions.",
    },
  ],
  troubleshooting: [
    {
      problem: "Cannot connect to ECU",
      solution:
        "Verify Tactrix drivers installed. Check COM port setting. Ensure engine is running. Try different USB port.",
    },
    {
      problem: "Parameters not showing data",
      solution:
        "Check logger definition matches your ECU. Some parameters only show data under certain conditions.",
    },
    {
      problem: "Slow logging rate",
      solution:
        "Reduce number of parameters. Close other programs. Use direct USB connection.",
    },
  ],
  warnings: [
    "Never operate laptop while driving alone - use a passenger",
    "Watch knock values - lift throttle if high",
    "Secure laptop and cables in vehicle",
    "Only log in safe driving conditions",
  ],
  tips: [
    "Warm up fully before logging WOT pulls",
    "RomRaider can display learned values (fuel trims, knock learn)",
    "Log 3-5 WOT pulls for good tune analysis data",
    "Include ambient temp and fuel grade in your notes",
  ],
}
