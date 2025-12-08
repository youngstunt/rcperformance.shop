import { ToolGuide } from "../types"

export const ecuflashReadingGuide: ToolGuide = {
  tool: "EcuFlash",
  softwareRequired: ["EcuFlash software", "Appropriate ECU definition files"],
  softwareDownloadUrls: {
    EcuFlash: "https://www.tactrix.com/index.php?page=shop.product_details&flypage=flypage.tpl&product_id=17&category_id=6",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows 7/10/11",
    "USB port (direct connection, no hubs)",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install EcuFlash",
      description:
        "Download EcuFlash from Tactrix website or OpenECU project. Install the software - it includes Tactrix USB drivers.",
      tip: "EcuFlash is free software that works with the Tactrix Openport cable.",
    },
    {
      step: 2,
      title: "Install Definition Files",
      description:
        "Download ECU definition files for your vehicle from RomRaider forums or OpenECU. Place XML definition files in EcuFlash's 'rommetadata' folder.",
      warning: "Without proper definition files, EcuFlash won't recognize your ECU properly.",
    },
    {
      step: 3,
      title: "Connect Hardware",
      description:
        "Connect Tactrix cable to laptop USB port (direct, no hub). Connect other end to vehicle OBD-II port. Turn ignition to ON (engine off).",
    },
    {
      step: 4,
      title: "Configure EcuFlash",
      description:
        "Launch EcuFlash. Go to Tools > Options. Select the Tactrix cable as your interface. Verify connection status shows 'Connected'.",
    },
    {
      step: 5,
      title: "Test ECU Connection",
      description:
        "Go to ECU > Test ECU Communications. EcuFlash will attempt to communicate with your ECU and display ECU ID information.",
    },
    {
      step: 6,
      title: "Read ECU",
      description:
        "Go to ECU > Read ECU. EcuFlash will identify your ECU and begin reading. Progress bar shows status. Takes 5-15 minutes.",
      warning: "Do not interrupt the read process. Keep ignition ON and stable.",
    },
    {
      step: 7,
      title: "Save ROM File",
      description:
        "When complete, save immediately (File > Save As). Name clearly: YEAR_MAKE_MODEL_STOCK_DATE.bin. Make backup copy.",
    },
    {
      step: 8,
      title: "Verify Read",
      description:
        "Reopen the saved file in EcuFlash. Verify it loads correctly and shows your ECU's data tables. Compare file size to expected size.",
    },
  ],
  troubleshooting: [
    {
      problem: "ECU not recognized",
      solution:
        "Ensure correct definition files are installed. Check that ignition is ON. Verify Tactrix cable is connected properly.",
    },
    {
      problem: "Communication error during read",
      solution:
        "Check battery voltage. Try with engine running. Ensure no accessories are on. Verify USB connection is direct.",
    },
    {
      problem: "Wrong ECU definition loaded",
      solution:
        "Download correct definition for your specific ECU ID. ECU ID is shown when testing communications.",
    },
  ],
  warnings: [
    "EcuFlash requires correct definition files for your specific ECU",
    "Using wrong definitions can cause incorrect data interpretation",
    "Never disconnect during read operation",
    "Keep original ROM backed up in multiple locations",
  ],
  tips: [
    "RomRaider forums have extensive definition file collections",
    "Your ECU ID determines which definition you need",
    "EcuFlash can read but may not edit all ECU types",
    "For Subaru/Mitsubishi, EcuFlash is the primary read/write tool",
  ],
}

export const ecuflashWritingGuide: ToolGuide = {
  tool: "EcuFlash",
  softwareRequired: ["EcuFlash software", "ECU definition files"],
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows",
    "Battery charger/maintainer recommended",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Prepare Tune File",
      description:
        "Download the tune file from your RC Performance ticket. Save it to your computer. Do not modify the filename.",
    },
    {
      step: 2,
      title: "Verify Tune Compatibility",
      description:
        "Open the tune file in EcuFlash. Verify it matches your ECU (same ECU ID and definition). Compare to your stock read.",
      warning: "Flashing an incompatible tune can damage your ECU or prevent starting.",
    },
    {
      step: 3,
      title: "Prepare Vehicle",
      description:
        "Connect battery charger/maintainer. Ensure all accessories are off. Connect Tactrix cable to laptop and OBD-II port. Ignition ON.",
    },
    {
      step: 4,
      title: "Open Tune in EcuFlash",
      description:
        "File > Open and select your tune file. Verify it loads correctly and the ECU definition matches your vehicle.",
    },
    {
      step: 5,
      title: "Write to ECU",
      description:
        "Go to ECU > Write ECU. EcuFlash will verify compatibility, then begin writing. Progress bar shows status.",
      warning:
        "CRITICAL: Do not disconnect, touch cables, or turn off ignition during write. This can take 10-20 minutes.",
    },
    {
      step: 6,
      title: "Wait for Completion",
      description:
        "Let the write complete fully. EcuFlash will show 'Write Complete' when done. Some ECUs may reset during the process.",
    },
    {
      step: 7,
      title: "Post-Write Reset",
      description:
        "Turn ignition OFF. Wait 30 seconds. Disconnect Tactrix cable. Start vehicle and let idle for 2-3 minutes.",
    },
    {
      step: 8,
      title: "ECU Relearn",
      description:
        "Drive gently for 20-50 miles while ECU relearns fuel trims and idle. Some rough idle initially is normal.",
    },
  ],
  troubleshooting: [
    {
      problem: "Write fails or freezes",
      solution:
        "Wait 5 minutes. If no progress, turn ignition off for 60 seconds, back on, retry. Contact RC Performance if repeated failures.",
    },
    {
      problem: "Vehicle won't start after flash",
      solution:
        "Wait 60 seconds. Try starting again. If no luck, reflash stock ROM. Contact RC Performance for recovery.",
    },
    {
      problem: "Checksum error on write",
      solution:
        "EcuFlash should handle checksum automatically. If errors persist, contact RC Performance - file may need correction.",
    },
  ],
  warnings: [
    "Never interrupt a write operation - ECU damage possible",
    "Use battery maintainer to ensure stable voltage",
    "Keep stock ROM for recovery if needed",
    "Only flash files from RC Performance for your specific vehicle",
  ],
  tips: [
    "Write during mild weather conditions",
    "Disable laptop sleep/hibernate",
    "Close unnecessary programs before flashing",
    "Verify file opens correctly before attempting to write",
  ],
}

export const ecuflashDataloggingGuide: ToolGuide = {
  tool: "EcuFlash",
  softwareRequired: ["RomRaider Logger (companion to EcuFlash)", "Logger definition files"],
  softwareDownloadUrls: {
    RomRaider: "https://www.romraider.com/downloads.html",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows",
    "Laptop mount for in-car use",
  ],
  estimatedTime: "Setup: 15 min, Logging: varies",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install RomRaider Logger",
      description:
        "EcuFlash itself doesn't do logging. Download RomRaider from romraider.com. Install the logger component. Java may be required.",
      tip: "RomRaider and EcuFlash use the same Tactrix cable and work together seamlessly.",
    },
    {
      step: 2,
      title: "Configure Logger Definitions",
      description:
        "Download logger definition files for your ECU from RomRaider forums. Place in RomRaider's logger definitions folder.",
    },
    {
      step: 3,
      title: "Connect to Vehicle",
      description:
        "Connect Tactrix to laptop and vehicle OBD-II port. Start vehicle. Launch RomRaider Logger.",
    },
    {
      step: 4,
      title: "Select Parameters",
      description:
        "Choose parameters to log. Essential: RPM, AFR, Boost, Knock Correction, Feedback Knock, IAT, Coolant Temp, Timing.",
      tip: "Start with 10-15 essential parameters. Too many slows logging rate.",
    },
    {
      step: 5,
      title: "Start Logging",
      description:
        "Click Start to see live data. Click Record before your pull. Watch knock values during pulls - lift if excessive.",
    },
    {
      step: 6,
      title: "Perform Logging Pulls",
      description:
        "For WOT logs: 3rd gear, 2500+ RPM start, full throttle to redline. Record 3-5 good pulls. Include some part-throttle data too.",
      warning: "Only do WOT pulls in safe, legal conditions. Have a passenger operate the laptop.",
    },
    {
      step: 7,
      title: "Save and Export",
      description:
        "Stop recording. Save log file. Export to CSV if needed. Upload to your RC Performance ticket.",
    },
  ],
  troubleshooting: [
    {
      problem: "Parameters show N/A",
      solution:
        "Verify correct logger definition for your ECU. Check that vehicle is running. Some parameters only show under specific conditions.",
    },
    {
      problem: "Logging rate is slow",
      solution:
        "Reduce parameter count. Close other programs. Ensure direct USB connection.",
    },
    {
      problem: "Logger won't connect",
      solution:
        "Check Tactrix cable connection. Verify drivers installed. Try cycling ignition.",
    },
  ],
  warnings: [
    "Never operate laptop while driving - use a passenger",
    "Watch knock values closely during pulls",
    "Secure laptop in vehicle to prevent damage",
    "Only log in safe conditions",
  ],
  tips: [
    "Warm up fully before logging (coolant 180°F+)",
    "Log 3-5 WOT pulls for good data",
    "Include notes about fuel, temperature, mods",
    "RomRaider can also display real-time gauges",
  ],
}
