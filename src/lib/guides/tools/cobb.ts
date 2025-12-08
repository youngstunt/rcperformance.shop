import { ToolGuide } from "../types"

export const cobbReadingGuide: ToolGuide = {
  tool: "COBB Accessport",
  softwareRequired: ["COBB Accessport Manager (for firmware updates)"],
  softwareDownloadUrls: {
    "Accessport Manager": "https://www.cobbtuning.com/accessport-manager/",
  },
  hardwareRequired: [
    "COBB Accessport (model appropriate for your vehicle)",
    "OBD-II cable (included with Accessport)",
    "Computer for backup transfer (optional)",
  ],
  estimatedTime: "10-15 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Install/Marry Accessport to Vehicle",
      description:
        "If this is a new Accessport, it must be 'married' to your vehicle first. Connect the AP to OBD-II port, turn ignition ON, and follow the on-screen prompts to install.",
      warning:
        "An Accessport can only be married to one vehicle at a time. Uninstalling frees it for another vehicle.",
    },
    {
      step: 2,
      title: "Navigate to ROM Backup",
      description:
        "On the Accessport main menu, navigate to: Tuning > ROM Backup. Select 'Create ROM Backup' or 'Backup Stock ROM'.",
    },
    {
      step: 3,
      title: "Perform ROM Backup",
      description:
        "The Accessport will read your ECU's current ROM. This process takes 5-10 minutes. A progress bar will show status.",
      warning: "Do not disconnect the Accessport or turn off ignition during the backup process.",
    },
    {
      step: 4,
      title: "Verify Backup",
      description:
        "Once complete, the Accessport will show 'Backup Complete'. The ROM is now stored on the Accessport's internal memory.",
    },
    {
      step: 5,
      title: "Transfer to Computer",
      description:
        "Connect the Accessport to your computer via USB. Open Accessport Manager. Navigate to the ROM backups section and save the file to your computer.",
      tip: "Name the file clearly: YEAR_MAKE_MODEL_STOCK_DATE.bin",
    },
    {
      step: 6,
      title: "Upload to Ticket",
      description:
        "Upload the ROM backup file to your RC Performance ticket. Include details about any modifications or previous tunes.",
    },
  ],
  troubleshooting: [
    {
      problem: "Accessport won't connect to vehicle",
      solution:
        "Check OBD-II cable connection. Ensure ignition is ON. Try cycling power. Verify AP is compatible with your vehicle.",
    },
    {
      problem: "Backup fails or times out",
      solution:
        "Check battery voltage. Ensure no accessories are running. Try in a shaded area if hot. Update AP firmware.",
    },
    {
      problem: "Can't find backup on Accessport",
      solution:
        "Navigate to Tuning > ROM Management > View Backups. If not there, the backup may have failed - retry.",
    },
  ],
  warnings: [
    "Only marry an Accessport to a vehicle you own",
    "Never interrupt the backup process",
    "The Accessport stores your stock ROM - keep it safe",
    "Updating AP firmware may require re-reading the ROM",
  ],
  tips: [
    "Update Accessport firmware before starting (use Accessport Manager)",
    "The Accessport screen is easier to read with engine off (no vibration)",
    "Keep Accessport Manager installed for easy file transfers",
    "Your stock backup allows reverting to stock at any time",
  ],
}

export const cobbWritingGuide: ToolGuide = {
  tool: "COBB Accessport",
  softwareRequired: ["Accessport Manager (for file transfer)"],
  hardwareRequired: [
    "COBB Accessport married to your vehicle",
    "OBD-II cable",
    "Computer for file transfer",
  ],
  estimatedTime: "10-20 minutes",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Download Your Custom Tune",
      description:
        "Download the custom tune file from your RC Performance ticket. This will be a .ptm file (ProTune Map). Save it to your computer.",
    },
    {
      step: 2,
      title: "Transfer Tune to Accessport",
      description:
        "Connect Accessport to computer via USB. Open Accessport Manager. Drag and drop the .ptm file to the Accessport, or use the 'Install File' function.",
    },
    {
      step: 3,
      title: "Safely Disconnect",
      description:
        "Use 'Safely Remove Hardware' in Windows before disconnecting the Accessport USB cable. This prevents file corruption.",
    },
    {
      step: 4,
      title: "Connect to Vehicle",
      description:
        "Connect Accessport to vehicle OBD-II port. Turn ignition to ON (engine off). Wait for Accessport to boot and connect.",
    },
    {
      step: 5,
      title: "Navigate to Tune",
      description:
        "On Accessport: Tuning > Tune Selection. Find the RC Performance tune in the list. Select it.",
    },
    {
      step: 6,
      title: "Flash the Tune",
      description:
        "Select 'Flash' or 'Install'. Read and accept any warnings. The flash process will begin, showing progress on screen.",
      warning:
        "CRITICAL: Do not disconnect the Accessport, turn off ignition, or touch anything during the flash. This typically takes 5-10 minutes.",
    },
    {
      step: 7,
      title: "Complete Flash",
      description:
        "When flash is complete, the Accessport will confirm success. Follow any on-screen instructions (may ask to cycle ignition).",
    },
    {
      step: 8,
      title: "Start and Verify",
      description:
        "Start the vehicle. Check that it idles properly. Verify the new tune name appears on the Accessport home screen. Let engine warm up fully.",
      tip: "Some rough idle is normal initially as the ECU relearns. Drive gently for 20-50 miles.",
    },
  ],
  troubleshooting: [
    {
      problem: "Flash fails partway through",
      solution:
        "Do NOT disconnect. Wait 5 minutes. If still frozen, turn ignition off, wait 60 seconds, turn back on. Contact RC Performance if it won't proceed.",
    },
    {
      problem: "Vehicle won't start after flash",
      solution:
        "Wait 30 seconds and try again. If still no start, reflash the stock tune from the Accessport's backup. Contact RC Performance.",
    },
    {
      problem: "'ECU communication error' during flash",
      solution:
        "Check OBD-II connection. Ensure battery is charged. Try in a different location (away from WiFi interference).",
    },
  ],
  warnings: [
    "Never interrupt a flash in progress - can corrupt ECU",
    "Ensure vehicle battery is well charged before flashing",
    "Do not flash in extreme temperatures",
    "Keep your stock backup on the Accessport for recovery",
    "Only flash tunes provided for your specific vehicle",
  ],
  tips: [
    "Flash in a garage or shaded area with stable temperature",
    "Disable phone Bluetooth during flash (prevents interference)",
    "Take a photo of the tune filename before flashing",
    "After flashing, the AP will show the active tune on its home screen",
  ],
}

export const cobbDataloggingGuide: ToolGuide = {
  tool: "COBB Accessport",
  softwareRequired: ["Accessport Manager", "COBB Protuning Suite (optional for advanced analysis)"],
  hardwareRequired: [
    "COBB Accessport married to vehicle",
    "OBD-II cable",
    "Suction mount for windshield (recommended)",
    "Computer for log transfer",
  ],
  estimatedTime: "Setup: 5 min, Logging: varies",
  difficulty: "Beginner",
  steps: [
    {
      step: 1,
      title: "Access Datalogging Mode",
      description:
        "On the Accessport main menu, select 'Gauges' or 'Monitor'. This enters real-time datalogging mode.",
    },
    {
      step: 2,
      title: "Configure Gauge Display",
      description:
        "Customize which parameters are shown on screen. Essential: Boost, AFR, Knock, Coolant Temp. Long-press to change individual gauges.",
      tip: "The Accessport can display multiple gauges at once - configure before driving.",
    },
    {
      step: 3,
      title: "Start Engine and Warm Up",
      description:
        "Start the vehicle and let it warm up fully (coolant temp 180°F+). Mount the Accessport where you can see it safely.",
    },
    {
      step: 4,
      title: "Begin Recording",
      description:
        "Press the designated button to start recording (usually the center button or shown on screen). 'REC' indicator will appear when recording.",
    },
    {
      step: 5,
      title: "Perform Logging Pulls",
      description:
        "For WOT (full throttle) logs: Start from 2500-3000 RPM in 3rd or 4th gear. Full throttle to redline. Record multiple pulls.",
      warning: "Only perform WOT pulls in safe, legal conditions. Watch the knock gauge - lift throttle if excessive.",
    },
    {
      step: 6,
      title: "Stop Recording",
      description:
        "Press the button again to stop recording. The log is automatically saved to the Accessport internal memory.",
    },
    {
      step: 7,
      title: "Transfer Logs to Computer",
      description:
        "Connect Accessport to computer via USB. Open Accessport Manager. Find the datalogs section and download the log files.",
    },
    {
      step: 8,
      title: "Upload for Analysis",
      description:
        "Upload the log files (.csv) to your RC Performance ticket. Include notes about conditions (temperature, fuel type, mods).",
    },
  ],
  troubleshooting: [
    {
      problem: "Gauges not showing real-time data",
      solution:
        "Ensure engine is running. Check OBD connection. Some parameters only show data under certain conditions.",
    },
    {
      problem: "Recording won't start",
      solution:
        "Check available storage on Accessport. Delete old logs if full. Verify you're in gauge/monitor mode.",
    },
    {
      problem: "Log files not appearing on computer",
      solution:
        "Ensure proper USB connection. Try different USB port. Update Accessport Manager software.",
    },
  ],
  warnings: [
    "Do not stare at the Accessport while driving - glance only",
    "Have a passenger operate the Accessport during logging runs if possible",
    "Lift throttle immediately if knock gauge shows high values",
    "Only perform WOT pulls in safe, legal locations",
  ],
  tips: [
    "Record at least 3 good WOT pulls from ~3000 RPM to redline",
    "Include some normal driving and part-throttle data",
    "Mount the Accessport where you can see boost and knock at a glance",
    "Note ambient temperature and fuel octane when logging",
  ],
}
