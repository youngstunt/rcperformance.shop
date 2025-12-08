import { ToolGuide } from "../types"

export const ktagReadingGuide: ToolGuide = {
  tool: "K-TAG",
  softwareRequired: ["K-Suite software (comes with K-TAG)"],
  hardwareRequired: [
    "Alientech K-TAG Master unit",
    "Appropriate positioning frame for your ECU",
    "Laptop with Windows 10/11",
    "12V bench power supply (3-5A minimum)",
    "ECU removed from vehicle",
  ],
  estimatedTime: "30-60 minutes (including ECU removal)",
  difficulty: "Advanced",
  steps: [
    {
      step: 1,
      title: "ECU Removal",
      description:
        "The K-TAG requires bench connection. Remove the ECU from your vehicle following manufacturer procedures. Document connector positions.",
      warning: "ECU removal should be done carefully. Incorrect removal can damage connectors or the ECU.",
    },
    {
      step: 2,
      title: "Set Up K-TAG Station",
      description:
        "Connect K-TAG unit to laptop via USB. Launch K-Suite software. Verify K-TAG is recognized and has valid subscription.",
    },
    {
      step: 3,
      title: "Select ECU in K-Suite",
      description:
        "In K-Suite, navigate to your vehicle make and ECU type. K-Suite will show the required positioning frame and connection type (BDM, Boot, JTAG).",
      tip: "K-Suite provides detailed connection diagrams for each ECU.",
    },
    {
      step: 4,
      title: "Prepare ECU for Connection",
      description:
        "Some ECUs require opening the case to access test points. Follow K-Suite instructions exactly. Use appropriate positioning frame.",
      warning: "Opening ECU cases may void warranty. Some ECUs have tamper seals.",
    },
    {
      step: 5,
      title: "Connect ECU to K-TAG",
      description:
        "Place ECU in positioning frame. Connect bench power supply (12V). Verify power connections before proceeding. Connect K-TAG probe/cable.",
    },
    {
      step: 6,
      title: "Read ECU",
      description:
        "In K-Suite, click Read. The software will communicate with the ECU via the selected protocol. Progress and status shown on screen.",
      warning: "Do not disconnect anything during read. Keep power stable.",
    },
    {
      step: 7,
      title: "Save Original File",
      description:
        "Save the read file immediately. K-Suite saves in its own format. Also export as .bin if option available. Backup to multiple locations.",
    },
    {
      step: 8,
      title: "Reinstall ECU",
      description:
        "After reading (and writing if applicable), carefully reinstall ECU in vehicle. Verify all connections. Clear any codes after reinstall.",
    },
  ],
  troubleshooting: [
    {
      problem: "K-TAG not detecting ECU",
      solution:
        "Check bench power supply voltage. Verify positioning frame alignment. Check K-TAG probe connections. Some ECUs need specific boot procedures.",
    },
    {
      problem: "Read fails partway",
      solution:
        "Check power supply stability. Verify ECU is making good contact with positioning frame. Try different connection speed in K-Suite.",
    },
    {
      problem: "K-Suite shows ECU not supported",
      solution:
        "Verify K-TAG subscription is active. Check for K-Suite updates. Some ECUs require specific protocols or newest updates.",
    },
  ],
  warnings: [
    "K-TAG is professional equipment - improper use can damage ECUs",
    "Opening ECUs has warranty implications",
    "Always use proper bench power supply - wrong voltage = damaged ECU",
    "Keep workspace clean and static-free",
    "Document everything before disconnecting",
  ],
  tips: [
    "K-TAG is ideal for ECUs without OBD flash support",
    "The positioning frames ensure consistent connections",
    "K-Suite provides excellent step-by-step instructions",
    "Take photos before removing any connectors",
  ],
}

export const ktagWritingGuide: ToolGuide = {
  tool: "K-TAG",
  softwareRequired: ["K-Suite software"],
  hardwareRequired: [
    "Alientech K-TAG Master unit",
    "Positioning frame",
    "Bench power supply",
    "ECU removed from vehicle",
  ],
  estimatedTime: "30-60 minutes",
  difficulty: "Advanced",
  steps: [
    {
      step: 1,
      title: "Prepare Tune File",
      description:
        "Download the tune file from your RC Performance ticket. K-Suite may require specific file formats. Follow any provided instructions.",
    },
    {
      step: 2,
      title: "Verify File Compatibility",
      description:
        "Open the tune file in K-Suite. Verify it matches your ECU type and original read. K-Suite will validate the file.",
      warning: "Only flash files specifically provided for your ECU. Wrong files can permanently damage the ECU.",
    },
    {
      step: 3,
      title: "Set Up Bench Connection",
      description:
        "Connect K-TAG to laptop. Place ECU in positioning frame. Connect bench power supply. Verify stable 12V.",
      warning: "Power stability is critical during write. Use a quality bench supply.",
    },
    {
      step: 4,
      title: "Load Tune File",
      description:
        "In K-Suite, load the tune file. Select Write operation. K-Suite will show write procedure for your ECU.",
    },
    {
      step: 5,
      title: "Execute Write",
      description:
        "Click Write. The process typically takes 5-15 minutes depending on ECU and protocol.",
      warning:
        "CRITICAL: Do not touch anything during write. Power interruption = potentially bricked ECU.",
    },
    {
      step: 6,
      title: "Verify Write",
      description:
        "After write completes, K-Suite may offer verification. Always verify if available. This confirms data was written correctly.",
    },
    {
      step: 7,
      title: "Reinstall ECU",
      description:
        "Disconnect from K-TAG. Close ECU case if opened. Reinstall in vehicle. Verify all connections.",
    },
    {
      step: 8,
      title: "Test Vehicle",
      description:
        "Start vehicle. Check for any warning lights. Clear adaptation values if instructed. Allow ECU to relearn during gentle driving.",
    },
  ],
  troubleshooting: [
    {
      problem: "Write fails or hangs",
      solution:
        "Do NOT disconnect power. Wait several minutes. If no progress, note exact error. May need recovery procedure. Contact RC Performance.",
    },
    {
      problem: "Vehicle won't start after reinstall",
      solution:
        "Recheck all ECU connections. Some vehicles need immo/key relearn after ECU removal. May need to reflash stock file.",
    },
    {
      problem: "Checksum errors",
      solution:
        "K-Suite usually handles checksums automatically. If errors persist, tune file may need correction. Contact RC Performance.",
    },
  ],
  warnings: [
    "K-TAG writing is professional-level work",
    "Power interruption during write can brick ECU",
    "Some ECUs have write cycle limits",
    "Keep original file for recovery",
    "Some ECUs require immobilizer procedures after bench work",
  ],
  tips: [
    "Always do a verify read after writing",
    "Document the write procedure for future reference",
    "K-TAG can recover some bricked ECUs via boot mode",
    "Keep K-Suite updated for latest protocols",
  ],
}

export const ktagDataloggingGuide: ToolGuide = {
  tool: "K-TAG",
  softwareRequired: ["Separate datalogging tool"],
  hardwareRequired: [
    "OBD-II logging interface (separate from K-TAG)",
    "Laptop",
  ],
  estimatedTime: "N/A - see note",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Note About K-TAG and Datalogging",
      description:
        "K-TAG is a bench flash tool only - it does not support real-time datalogging. For logging, you need a separate OBD-II tool.",
    },
    {
      step: 2,
      title: "Recommended Logging Tools",
      description:
        "Depending on your vehicle, use: HP Tuners (GM/Ford), Tactrix with RomRaider (Subaru), generic OBD-II scanner, or vehicle-specific tool.",
    },
    {
      step: 3,
      title: "Contact RC Performance",
      description:
        "Ask RC Performance which logging tool they recommend for your specific vehicle. They can advise on the best option.",
    },
  ],
  troubleshooting: [
    {
      problem: "Need to datalog but only have K-TAG",
      solution:
        "K-TAG cannot datalog. You'll need a separate OBD-II tool for real-time data. Many vehicles can use generic OBD scanners for basic data.",
    },
  ],
  warnings: [
    "K-TAG is for bench flash only - no datalogging capability",
    "Purchase appropriate logging tool for your vehicle",
  ],
  tips: [
    "Many OBD-II loggers are affordable and work with multiple vehicles",
    "RC Performance can recommend the best logger for your platform",
    "Some tuners provide 'piggyback' logging solutions",
  ],
}
