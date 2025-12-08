import { ToolGuide } from "../types"

export const hptunersReadingGuide: ToolGuide = {
  tool: "HP Tuners",
  softwareRequired: ["HP Tuners VCM Suite (licensed)"],
  softwareDownloadUrls: {
    "VCM Suite": "https://www.hptuners.com/downloads/",
  },
  hardwareRequired: [
    "HP Tuners MPVI2 or MPVI3 interface",
    "Laptop with Windows 10/11",
    "USB cable (included with interface)",
    "Valid HP Tuners credits/license for your vehicle",
  ],
  estimatedTime: "10-20 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Install VCM Suite",
      description:
        "Download VCM Suite from hptuners.com. Install and launch the software. Connect your MPVI2/MPVI3 interface - it will update firmware if needed.",
      tip: "Create an HP Tuners account to manage your licenses and credits.",
    },
    {
      step: 2,
      title: "Connect Interface to Vehicle",
      description:
        "Plug the MPVI2/MPVI3 into your laptop via USB. Connect the OBD-II end to your vehicle. Turn the ignition to ON (engine off).",
    },
    {
      step: 3,
      title: "Open VCM Editor",
      description:
        "In VCM Suite, open VCM Editor. The software should auto-detect your vehicle. If not, go to Vehicle > Select Vehicle and choose your make/model/year.",
    },
    {
      step: 4,
      title: "Read Vehicle",
      description:
        "Click the 'Read Vehicle' button (or File > Read Vehicle). VCM Editor will read your ECU, TCM (if equipped), and other supported modules.",
      warning: "Do not disconnect or turn off ignition during the read process.",
    },
    {
      step: 5,
      title: "Save the Stock File",
      description:
        "Once complete, immediately save the file (File > Save). Use a clear naming convention: YEAR_MAKE_MODEL_STOCK_DATE.hpt. Save a backup copy.",
      tip: "HP Tuners files include all read modules in one .hpt file.",
    },
    {
      step: 6,
      title: "Export for Tuning",
      description:
        "RC Performance will need the .hpt file. You can also export individual calibration files if requested. Compress and upload to your ticket.",
    },
  ],
  troubleshooting: [
    {
      problem: "Interface not detected",
      solution:
        "Try a different USB port. Reinstall VCM Suite. Check that interface LEDs are lit when connected.",
    },
    {
      problem: "Vehicle not recognized",
      solution:
        "Ensure ignition is ON. Check that you have credits/license for this vehicle platform. Some vehicles require engine running.",
    },
    {
      problem: "Read fails partway through",
      solution:
        "Check battery voltage. Ensure no accessories are on. Try with engine running if battery is low.",
    },
  ],
  warnings: [
    "HP Tuners uses a credit system - ensure you have credits for your vehicle before attempting to read",
    "First read of a new vehicle will consume credits",
    "Never disconnect during read/write operations",
    "Keep your interface firmware updated",
  ],
  tips: [
    "Credits are tied to VIN - you only pay once per vehicle",
    "MPVI3 is faster than MPVI2 but both work well",
    "VCM Suite includes both Editor and Scanner in one package",
    "Check for software updates before each use",
  ],
}

export const hptunersWritingGuide: ToolGuide = {
  tool: "HP Tuners",
  softwareRequired: ["HP Tuners VCM Suite (licensed)"],
  hardwareRequired: [
    "HP Tuners MPVI2 or MPVI3 interface",
    "Laptop with Windows 10/11",
    "Battery maintainer strongly recommended",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Prepare the Tune File",
      description:
        "Download the tune file from your RC Performance ticket. This will be a .hpt file. Do not rename or modify the file.",
      warning: "Only flash tune files provided by RC Performance for your specific vehicle.",
    },
    {
      step: 2,
      title: "Connect Battery Maintainer",
      description:
        "Connect a battery maintainer to ensure stable voltage during the flash. This is especially important for GM vehicles with multiple modules.",
    },
    {
      step: 3,
      title: "Open the Tune File",
      description:
        "Launch VCM Editor. Open the tune file (File > Open). Review the file to ensure it matches your vehicle (year, make, model, VIN).",
    },
    {
      step: 4,
      title: "Connect to Vehicle",
      description:
        "Connect MPVI2/MPVI3 to laptop and vehicle. Turn ignition to ON. VCM Editor should connect automatically.",
    },
    {
      step: 5,
      title: "Write to Vehicle",
      description:
        "Click 'Write Vehicle' (or File > Write Vehicle). Select which modules to write (usually ECM/PCM). Confirm when prompted.",
      warning:
        "CRITICAL: Do not touch anything during the write. Do not turn off ignition, disconnect cables, or interact with the vehicle.",
    },
    {
      step: 6,
      title: "Wait for Completion",
      description:
        "The write process typically takes 5-15 minutes per module. Progress will be displayed. Wait for 'Write Complete' message.",
      tip: "Some vehicles automatically turn off and back on during the write - this is normal.",
    },
    {
      step: 7,
      title: "Post-Flash Reset",
      description:
        "Turn ignition OFF. Wait 30 seconds. Disconnect the interface. Start the vehicle and allow it to idle for 2-3 minutes.",
    },
    {
      step: 8,
      title: "Perform Relearn Procedures",
      description:
        "Some GM vehicles require throttle body relearn or idle relearn. VCM Scanner can perform these procedures. Drive 20-50 miles for ECU adaptation.",
      tip: "GM trucks may need a 'Cam Relearn' if the cam position was reset. VCM Scanner handles this.",
    },
  ],
  troubleshooting: [
    {
      problem: "Write fails or times out",
      solution:
        "Check battery voltage (must be above 12V). Ensure no accessories are on. Try with engine running. Contact RC Performance if persistent.",
    },
    {
      problem: "Vehicle cranks but won't start",
      solution:
        "Wait 2 minutes and try again. If still no start, may need crank relearn via VCM Scanner. Contact RC Performance.",
    },
    {
      problem: "Check engine light after flash",
      solution:
        "Use VCM Scanner to read codes. Some codes clear after driving. Report persistent codes to RC Performance.",
    },
  ],
  warnings: [
    "Battery voltage MUST remain stable during write - use a maintainer",
    "Writing incorrect files can cause no-start conditions",
    "Never attempt to write during a thunderstorm (power surge risk)",
    "Keep your stock file - you may need to revert",
    "Some modules require dealer tools to recover if corrupted",
  ],
  tips: [
    "Write during mild temperatures (40-90°F)",
    "Disable laptop sleep/hibernate before starting",
    "Close unnecessary programs",
    "Have RC Performance contact info ready in case of issues",
  ],
}

export const hptunersDataloggingGuide: ToolGuide = {
  tool: "HP Tuners",
  softwareRequired: ["HP Tuners VCM Scanner (included with VCM Suite)"],
  hardwareRequired: [
    "HP Tuners MPVI2 or MPVI3 interface",
    "Laptop with Windows 10/11",
    "Secure laptop mount for in-vehicle use",
  ],
  estimatedTime: "Setup: 10 min, Logging: varies",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Launch VCM Scanner",
      description:
        "Open VCM Scanner from the VCM Suite. Connect your interface to the laptop and vehicle. Start the engine.",
    },
    {
      step: 2,
      title: "Auto-Detect Vehicle",
      description:
        "VCM Scanner will auto-detect your vehicle and load appropriate PIDs (parameters). Verify the correct vehicle is shown.",
    },
    {
      step: 3,
      title: "Select Parameters",
      description:
        "Click the Channel Selection tab. Add the parameters RC Performance requests. Common parameters: RPM, MAP/Boost, AFR, Spark Advance, Knock Retard, IAT, ECT, MAF.",
      tip: "HP Tuners has excellent parameter coverage. Add 15-20 parameters without significant speed penalty.",
    },
    {
      step: 4,
      title: "Configure Display",
      description:
        "Arrange gauges in the display view for easy monitoring while driving. Use the Charts tab for time-based graphing during review.",
    },
    {
      step: 5,
      title: "Start Logging",
      description:
        "Click the Play button to start live data. Click the Record button before your pull to save data. Give logs descriptive names.",
    },
    {
      step: 6,
      title: "Perform Logging Runs",
      description:
        "For WOT logs: 3rd or 4th gear, rolling start from 2000-2500 RPM. Full throttle to redline. For part-throttle: normal driving with varied loads.",
      warning: "Only perform WOT runs in safe, legal locations. Have a passenger operate the laptop.",
    },
    {
      step: 7,
      title: "Save and Export",
      description:
        "Stop recording. Save the log file (.hpl format). Upload the file to your RC Performance ticket for analysis.",
      tip: "VCM Scanner logs can also be exported to CSV for use with other analysis tools.",
    },
  ],
  troubleshooting: [
    {
      problem: "Parameters showing zeros or not updating",
      solution:
        "Ensure engine is running. Check interface connection. Some parameters only active under certain conditions.",
    },
    {
      problem: "Slow data rate",
      solution:
        "Reduce number of logged parameters. MPVI3 is faster than MPVI2. Use USB 3.0 port if available.",
    },
    {
      problem: "Interface disconnects while driving",
      solution:
        "Use a shorter USB cable. Ensure OBD-II connection is secure. Check for loose cables.",
    },
  ],
  warnings: [
    "Never operate the laptop while driving - use a passenger",
    "Secure the laptop and interface to prevent them from becoming projectiles",
    "Watch for knock retard during WOT pulls - lift if excessive",
    "Do not datalog in heavy traffic or unsafe conditions",
  ],
  tips: [
    "Log fuel pressure if you have a wideband or flex fuel sensor",
    "Include some cold start and warm-up data",
    "Note ambient conditions and fuel type in your upload",
    "VCM Scanner can also read/clear codes - useful for diagnostic purposes",
  ],
}
