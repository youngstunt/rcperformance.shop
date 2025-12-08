import { ToolGuide } from "../types"

// MPVI2 uses the same HP Tuners software, so guides are essentially identical
// but we create separate entries for clarity

export const mpvi2ReadingGuide: ToolGuide = {
  tool: "MPVI2",
  softwareRequired: ["HP Tuners VCM Suite (licensed)"],
  softwareDownloadUrls: {
    "VCM Suite": "https://www.hptuners.com/downloads/",
  },
  hardwareRequired: [
    "HP Tuners MPVI2 interface",
    "USB cable (included)",
    "Laptop with Windows 10/11",
    "Valid HP Tuners credits for your vehicle",
  ],
  estimatedTime: "10-20 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Install VCM Suite",
      description:
        "Download and install HP Tuners VCM Suite from hptuners.com. Create account if needed. Connect MPVI2 to update firmware.",
      tip: "MPVI2 is the interface hardware. VCM Suite is the software that runs on your laptop.",
    },
    {
      step: 2,
      title: "Register and License",
      description:
        "Ensure you have credits/licenses for your vehicle platform. First read of a new VIN consumes credits. Credits are per-vehicle.",
    },
    {
      step: 3,
      title: "Connect to Vehicle",
      description:
        "Connect MPVI2 to laptop via USB. Connect OBD-II cable to vehicle. Turn ignition ON (engine off for most vehicles).",
    },
    {
      step: 4,
      title: "Open VCM Editor",
      description:
        "Launch VCM Editor from VCM Suite. It should auto-detect your vehicle. If not, manually select your make/model/year.",
    },
    {
      step: 5,
      title: "Read Vehicle",
      description:
        "Click 'Read Vehicle' button. VCM Editor reads ECU, TCM, and other supported modules. Progress shown on screen.",
      warning: "Do not disconnect or turn off ignition during read.",
    },
    {
      step: 6,
      title: "Save File",
      description:
        "Save the stock file immediately: File > Save. Use naming: YEAR_MAKE_MODEL_STOCK_DATE.hpt. Create backup copy.",
    },
    {
      step: 7,
      title: "Upload to Ticket",
      description:
        "Upload the .hpt file to your RC Performance ticket. Include any notes about vehicle modifications.",
    },
  ],
  troubleshooting: [
    {
      problem: "MPVI2 not detected",
      solution:
        "Try different USB port. Reinstall VCM Suite. Check that LED on MPVI2 is lit. Update firmware via VCM Suite.",
    },
    {
      problem: "Credits required",
      solution:
        "Purchase credits from hptuners.com. Credits are consumed on first read of each VIN.",
    },
    {
      problem: "Vehicle not supported",
      solution:
        "Check HP Tuners vehicle coverage list. Some vehicles need specific module versions.",
    },
  ],
  warnings: [
    "Credits are consumed per VIN - verify vehicle support before reading",
    "Never disconnect during read/write operations",
    "Keep firmware updated for best compatibility",
  ],
  tips: [
    "MPVI2 works with same software as MPVI3, just slower",
    "Credits are lifetime per VIN - read as many times as needed",
    "VCM Suite updates frequently - keep it current",
  ],
}

export const mpvi2WritingGuide: ToolGuide = {
  tool: "MPVI2",
  softwareRequired: ["HP Tuners VCM Suite"],
  hardwareRequired: [
    "HP Tuners MPVI2 interface",
    "Laptop with Windows 10/11",
    "Battery maintainer strongly recommended",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Prepare Environment",
      description:
        "Connect battery maintainer. Ensure laptop is charged or plugged in. Close unnecessary programs.",
    },
    {
      step: 2,
      title: "Download Tune File",
      description:
        "Download the .hpt tune file from your RC Performance ticket. Do not modify the file.",
    },
    {
      step: 3,
      title: "Open Tune in VCM Editor",
      description:
        "Launch VCM Editor. Open the tune file. Verify it matches your vehicle (year, make, model).",
    },
    {
      step: 4,
      title: "Connect to Vehicle",
      description:
        "Connect MPVI2 to laptop and vehicle OBD-II port. Turn ignition ON. Verify connection in VCM Editor.",
    },
    {
      step: 5,
      title: "Write to Vehicle",
      description:
        "Click 'Write Vehicle'. Select modules to write (typically just ECM/PCM). Confirm warnings.",
      warning: "Do not interrupt the write process under any circumstances.",
    },
    {
      step: 6,
      title: "Wait for Completion",
      description:
        "Writing takes 5-15 minutes depending on modules. Some vehicles cycle power during write - this is normal.",
    },
    {
      step: 7,
      title: "Post-Write",
      description:
        "Turn ignition OFF when complete. Wait 30 seconds. Start vehicle and idle for 2-3 minutes.",
    },
    {
      step: 8,
      title: "Relearn Period",
      description:
        "Drive gently for 20-50 miles. ECU needs time to relearn. Use VCM Scanner for relearn procedures if needed.",
    },
  ],
  troubleshooting: [
    {
      problem: "Write fails",
      solution:
        "Check battery voltage. Do not disconnect. Wait, then retry. Contact RC Performance if repeated failures.",
    },
    {
      problem: "Vehicle won't start",
      solution:
        "Wait 2 minutes. Retry start. May need crank/cam relearn via VCM Scanner. Contact RC Performance.",
    },
  ],
  warnings: [
    "Stable battery voltage is critical during write",
    "Never interrupt write operation",
    "Keep stock file for recovery",
  ],
  tips: [
    "Battery maintainer is highly recommended for GM vehicles",
    "Write during mild temperatures",
    "Have RC Performance contact ready during first flash",
  ],
}

export const mpvi2DataloggingGuide: ToolGuide = {
  tool: "MPVI2",
  softwareRequired: ["HP Tuners VCM Scanner"],
  hardwareRequired: [
    "HP Tuners MPVI2 interface",
    "Laptop with Windows 10/11",
    "Secure laptop mount for in-car use",
  ],
  estimatedTime: "Setup: 10 min, Logging: varies",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Launch VCM Scanner",
      description:
        "Open VCM Scanner from VCM Suite. Connect MPVI2 to laptop and vehicle. Start engine.",
    },
    {
      step: 2,
      title: "Select Parameters",
      description:
        "Choose logging parameters. Essential: RPM, MAP/Boost, AFR, Spark, Knock Retard, IAT, ECT, MAF, Fuel Pressure.",
    },
    {
      step: 3,
      title: "Configure Display",
      description:
        "Arrange gauges for visibility. Set up charts for post-analysis. Use large gauge view for driving.",
    },
    {
      step: 4,
      title: "Start Recording",
      description:
        "Click Play for live data. Click Record before pulls. Name logs descriptively.",
    },
    {
      step: 5,
      title: "Perform Logging",
      description:
        "For WOT: 3rd/4th gear, 2000+ RPM rolling start, full throttle to redline. Capture multiple pulls plus part-throttle.",
      warning: "Safe conditions only. Have passenger operate laptop.",
    },
    {
      step: 6,
      title: "Save and Upload",
      description:
        "Stop recording. Save .hpl file. Upload to RC Performance ticket with condition notes.",
    },
  ],
  troubleshooting: [
    {
      problem: "Slow data rate",
      solution:
        "Reduce parameters. MPVI2 is slower than MPVI3 - normal. Use USB 3.0 if available.",
    },
    {
      problem: "Parameters showing zero",
      solution:
        "Ensure engine running. Check connection. Some parameters conditional.",
    },
  ],
  warnings: [
    "MPVI2 logging speed is adequate but slower than MPVI3",
    "Secure all equipment in vehicle",
    "Don't operate laptop while driving",
  ],
  tips: [
    "MPVI2 works well for logging, just not as fast as newer hardware",
    "VCM Scanner is included with VCM Suite",
    "Log at least 3 good WOT pulls",
  ],
}
