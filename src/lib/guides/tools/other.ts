import { ToolGuide } from "../types"

// Generic guide for "Other" tool selection
export const otherReadingGuide: ToolGuide = {
  tool: "Other",
  softwareRequired: ["Tool-specific software"],
  hardwareRequired: [
    "Your ECU reading interface",
    "Laptop or required device",
    "Appropriate cables/adapters",
  ],
  estimatedTime: "Varies by tool",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Identify Your Tool",
      description:
        "Let us know what specific tool you're using in your ticket notes. Popular tools include: MHD, bootmod3, JB4, Hondata, EcuTek, Uprev, and many others.",
    },
    {
      step: 2,
      title: "General Reading Process",
      description:
        "Most ECU reading follows a similar pattern: Install software, connect interface to vehicle OBD-II port, connect to laptop, read ECU through software.",
    },
    {
      step: 3,
      title: "Follow Tool Documentation",
      description:
        "Each tuning tool has specific procedures. Follow your tool's official documentation for reading your ECU.",
      tip: "Tool manufacturer websites and forums are the best resources for tool-specific instructions.",
    },
    {
      step: 4,
      title: "Save Your Stock File",
      description:
        "Always save your original/stock ECU read. Name it clearly with year, make, model, and date. Keep backups in multiple locations.",
    },
    {
      step: 5,
      title: "Upload to Ticket",
      description:
        "Upload your ECU read file to your RC Performance ticket. Include notes about what tool you used and any specific file format information.",
    },
  ],
  troubleshooting: [
    {
      problem: "Don't know how to use my tool",
      solution:
        "Check the tool manufacturer's website for guides. Forums and YouTube often have tutorials. Contact RC Performance for guidance.",
    },
    {
      problem: "My tool isn't listed",
      solution:
        "No problem! Many tools exist. Note your tool name in the ticket and we'll work with what you have.",
    },
  ],
  warnings: [
    "Always follow your specific tool's procedures",
    "Save your stock file before any modifications",
    "Use official/updated software for your tool",
  ],
  tips: [
    "Mention your specific tool in ticket notes",
    "Include screenshots if you're unsure about file format",
    "RC Performance can often provide tool-specific guidance",
  ],
}

export const otherWritingGuide: ToolGuide = {
  tool: "Other",
  softwareRequired: ["Tool-specific software"],
  hardwareRequired: [
    "Your ECU flashing interface",
    "Laptop or required device",
    "Battery maintainer recommended",
  ],
  estimatedTime: "Varies by tool",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Receive Your Tune",
      description:
        "Download the tune file from your RC Performance ticket. We'll provide it in the format appropriate for your tool.",
    },
    {
      step: 2,
      title: "Prepare for Flash",
      description:
        "Ensure battery is charged (or use maintainer). Have your tool connected and software ready. Close unnecessary programs.",
    },
    {
      step: 3,
      title: "Follow Tool Procedures",
      description:
        "Each tool has specific flashing procedures. Follow your tool's documentation for loading and flashing the tune file.",
    },
    {
      step: 4,
      title: "Flash the Tune",
      description:
        "Load the tune file in your tool's software. Follow prompts to flash to ECU. Do not interrupt the process.",
      warning: "Never interrupt a flash in progress regardless of tool used.",
    },
    {
      step: 5,
      title: "Post-Flash",
      description:
        "After flashing, follow tool-specific reset procedures. Start vehicle and check for proper operation. Allow ECU to relearn.",
    },
  ],
  troubleshooting: [
    {
      problem: "Flash failed",
      solution:
        "Follow your tool's recovery procedure. Most tools have methods to recover from failed flashes. Contact RC Performance with error details.",
    },
    {
      problem: "File format not compatible",
      solution:
        "Let us know - we may be able to provide the tune in a different format for your specific tool.",
    },
  ],
  warnings: [
    "Never interrupt flashing regardless of tool",
    "Maintain stable power during flash",
    "Keep your stock file for recovery",
  ],
  tips: [
    "Follow your tool's specific instructions",
    "Contact us if you need the tune in a different format",
    "Document any errors for troubleshooting",
  ],
}

export const otherDataloggingGuide: ToolGuide = {
  tool: "Other",
  softwareRequired: ["Tool-specific logging software"],
  hardwareRequired: [
    "Your datalogging interface",
    "Laptop or mobile device",
    "Secure mount for in-vehicle use",
  ],
  estimatedTime: "Varies",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Identify Logging Capabilities",
      description:
        "Many tuning tools include datalogging. Check if your tool can log: MHD, bootmod3, JB4, Hondata, EcuTek all have logging features.",
    },
    {
      step: 2,
      title: "Select Parameters",
      description:
        "Common parameters to log: RPM, Boost/MAP, AFR/Lambda, Ignition Timing, Knock Activity, IAT, Coolant Temp, Fuel Pressure.",
    },
    {
      step: 3,
      title: "Set Up Logging",
      description:
        "Follow your tool's procedure to start logging. Configure which parameters to record. Start recording before your pulls.",
    },
    {
      step: 4,
      title: "Perform Logging Runs",
      description:
        "For WOT pulls: 3rd/4th gear, 2500+ RPM start, full throttle to redline. Capture 3-5 pulls plus some part-throttle driving.",
      warning: "Only perform WOT in safe, legal conditions.",
    },
    {
      step: 5,
      title: "Save and Upload",
      description:
        "Save log files in your tool's native format. Also export to CSV if available. Upload to your RC Performance ticket.",
    },
  ],
  troubleshooting: [
    {
      problem: "Tool doesn't support logging",
      solution:
        "Some tools are flash-only. You may need a separate logging device. RC Performance can recommend options.",
    },
    {
      problem: "Can't export logs",
      solution:
        "Upload in native format - we can often work with various formats. Screenshot the data if export isn't possible.",
    },
  ],
  warnings: [
    "Safety first when logging in vehicle",
    "Watch knock/timing values during pulls",
    "Use a passenger for laptop operation",
  ],
  tips: [
    "Most modern tuning apps have excellent logging",
    "Phone-based tools (MHD, JB4) are convenient for logging",
    "Include notes about conditions (temp, fuel, mods)",
  ],
}
