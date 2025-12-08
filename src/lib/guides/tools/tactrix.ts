import { ToolGuide } from "../types"

export const tactrixReadingGuide: ToolGuide = {
  tool: "Tactrix Openport 2.0",
  softwareRequired: ["EcuFlash", "RomRaider (optional for logging)"],
  softwareDownloadUrls: {
    EcuFlash: "https://www.tactrix.com/index.php?page=shop.product_details&flypage=flypage.tpl&product_id=17&category_id=6",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows 7/10/11",
    "USB port (avoid USB hubs)",
  ],
  estimatedTime: "15-30 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install EcuFlash Software",
      description:
        "Download and install EcuFlash from the Tactrix website. Run the installer and follow the prompts. The software includes the necessary Tactrix drivers.",
      tip: "Run the installer as Administrator for proper driver installation.",
    },
    {
      step: 2,
      title: "Connect the Tactrix Cable",
      description:
        "Plug the Tactrix Openport 2.0 into your laptop's USB port. Wait for Windows to recognize the device. The LED on the cable should illuminate.",
      warning:
        "Do not use a USB hub - connect directly to your laptop for reliable communication.",
    },
    {
      step: 3,
      title: "Prepare Your Vehicle",
      description:
        "Turn the ignition to the ON position (do not start the engine). Make sure all accessories are off. Connect the Tactrix cable to the OBD-II port under the dashboard.",
      tip: "The OBD-II port is typically located under the steering column, to the left of the steering wheel.",
    },
    {
      step: 4,
      title: "Launch EcuFlash",
      description:
        "Open EcuFlash software. Go to Tools > Options and verify the Tactrix cable is detected. Select the correct COM port if prompted.",
    },
    {
      step: 5,
      title: "Read the ECU",
      description:
        "Click 'Read from ECU' or go to ECU > Read. EcuFlash will attempt to identify your ECU. Once identified, the read process will begin. A progress bar will show the status.",
      warning:
        "Do not disconnect the cable or turn off the ignition during the read process. This typically takes 5-15 minutes.",
    },
    {
      step: 6,
      title: "Save the ROM File",
      description:
        "Once the read is complete, save the file immediately. Use a descriptive filename like 'YEAR_MAKE_MODEL_STOCK_DATE.bin'. Save a backup copy to a separate location.",
      tip: "Always keep your original stock ROM file safe - you may need it for recovery.",
    },
    {
      step: 7,
      title: "Verify the Read",
      description:
        "Check the file size matches what's expected for your ECU (typically 512KB, 1MB, or 2MB). Open the file in EcuFlash to verify it loads without errors.",
    },
  ],
  troubleshooting: [
    {
      problem: "EcuFlash doesn't detect the Tactrix cable",
      solution:
        "Try a different USB port. Reinstall the Tactrix drivers. Check Device Manager for any driver issues.",
    },
    {
      problem: "Cannot connect to ECU",
      solution:
        "Verify ignition is ON (not ACC). Check OBD-II port connection. Try cycling the ignition off and on.",
    },
    {
      problem: "Read process fails partway through",
      solution:
        "Check battery voltage (should be above 12V). Avoid using any vehicle accessories during read. Try again with engine running if battery is weak.",
    },
  ],
  warnings: [
    "Never disconnect the cable during a read or write operation",
    "Ensure your laptop is plugged in or has sufficient battery",
    "Keep your original stock ROM file backed up in multiple locations",
    "Do not start the engine during the read process unless specifically required",
  ],
  tips: [
    "A fully charged laptop battery or AC power is recommended",
    "Disable sleep/hibernate on your laptop before starting",
    "Close unnecessary programs to prevent interruptions",
    "Read your ECU twice and compare files to verify data integrity",
  ],
}

export const tactrixWritingGuide: ToolGuide = {
  tool: "Tactrix Openport 2.0",
  softwareRequired: ["EcuFlash"],
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows 7/10/11",
    "USB port (avoid USB hubs)",
    "Battery charger recommended",
  ],
  estimatedTime: "15-45 minutes",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Verify Your Tune File",
      description:
        "Ensure you have received the tuned ROM file from RC Performance. Verify the file size matches your original read. Do not modify the file name or contents.",
      warning: "Only flash files provided by RC Performance. Never flash files from unknown sources.",
    },
    {
      step: 2,
      title: "Prepare Your Vehicle",
      description:
        "Park in a well-ventilated area. Ensure battery voltage is above 12.5V. A battery charger/maintainer is strongly recommended during the flash process.",
      warning:
        "Low battery voltage during flashing can cause ECU corruption requiring dealer recovery.",
    },
    {
      step: 3,
      title: "Connect Everything",
      description:
        "Connect the battery charger if using one. Plug the Tactrix cable into your laptop. Turn ignition to ON (do not start engine). Connect the Tactrix to the OBD-II port.",
    },
    {
      step: 4,
      title: "Open the Tune File",
      description:
        "Launch EcuFlash. Open the tuned ROM file (File > Open). Verify the ECU definition matches your vehicle. Review any notes provided with the tune.",
    },
    {
      step: 5,
      title: "Begin the Flash",
      description:
        "Click 'Write to ECU' or go to ECU > Write. Confirm when prompted. The flash process will begin with a progress indicator.",
      warning:
        "DO NOT touch anything during the flash. Do not disconnect cables, turn off ignition, or interact with the vehicle until complete.",
    },
    {
      step: 6,
      title: "Wait for Completion",
      description:
        "The flash typically takes 10-30 minutes depending on ECU type. The progress bar will show status. EcuFlash will confirm when complete.",
      tip: "Some ECUs require multiple passes. Let the software complete all steps automatically.",
    },
    {
      step: 7,
      title: "Post-Flash Procedure",
      description:
        "Once complete, turn ignition OFF. Wait 30 seconds. Disconnect the Tactrix cable. Start the vehicle and let it idle for 2-3 minutes.",
    },
    {
      step: 8,
      title: "ECU Reset/Relearn",
      description:
        "The ECU will need to relearn idle and fuel trims. Drive normally for 20-50 miles before any performance driving. Some vehicles may idle rough initially - this is normal.",
      tip: "Avoid wide-open throttle for the first 50 miles while the ECU adapts to the new tune.",
    },
  ],
  troubleshooting: [
    {
      problem: "Flash fails or freezes",
      solution:
        "Do not panic. Wait 5 minutes. If no progress, turn ignition off, wait 60 seconds, turn back on and retry. If persistent, contact RC Performance.",
    },
    {
      problem: "Vehicle won't start after flash",
      solution:
        "Wait 60 seconds with ignition off. Try starting again. If no luck, reflash the stock ROM or contact RC Performance immediately.",
    },
    {
      problem: "Check engine light after flash",
      solution:
        "Some codes may appear initially and clear themselves. If persistent after 50 miles, datalog and contact RC Performance.",
    },
  ],
  warnings: [
    "NEVER interrupt a flash in progress - this can brick your ECU",
    "Use a battery maintainer to ensure stable voltage",
    "Do not flash during extreme hot or cold temperatures",
    "Keep your stock ROM file in case you need to revert",
    "Do not flash in a garage with the door closed (carbon monoxide risk if engine runs)",
  ],
  tips: [
    "Flash during mild weather when possible",
    "Have a backup laptop battery or power source",
    "Disconnect any aftermarket accessories that may cause electrical interference",
    "Take a photo of your current tune file name for reference",
  ],
}

export const tactrixDataloggingGuide: ToolGuide = {
  tool: "Tactrix Openport 2.0",
  softwareRequired: ["RomRaider Logger", "EcuFlash (for logger definition files)"],
  softwareDownloadUrls: {
    RomRaider: "https://www.romraider.com/downloads.html",
  },
  hardwareRequired: [
    "Tactrix Openport 2.0 cable",
    "Laptop with Windows 7/10/11",
    "Laptop mount recommended for in-car logging",
  ],
  estimatedTime: "Setup: 15 min, Logging: varies",
  difficulty: "Intermediate",
  steps: [
    {
      step: 1,
      title: "Install RomRaider",
      description:
        "Download and install RomRaider from romraider.com. During installation, select the logger component. Java Runtime may be required.",
    },
    {
      step: 2,
      title: "Configure Logger Definitions",
      description:
        "Download the appropriate logger definition XML file for your ECU from the RomRaider forums or RC Performance. Place it in the RomRaider logger definitions folder.",
      tip: "The definition file must match your ECU type for parameters to display correctly.",
    },
    {
      step: 3,
      title: "Connect to Vehicle",
      description:
        "Connect Tactrix to laptop and OBD-II port. Start the vehicle. Launch RomRaider Logger. It should auto-detect the Tactrix cable.",
    },
    {
      step: 4,
      title: "Select Parameters to Log",
      description:
        "Choose the parameters to monitor. Essential parameters include: RPM, AFR/Lambda, Boost, Knock Correction, Feedback Knock, Intake Temp, Coolant Temp, Ignition Timing.",
      tip: "Start with 10-15 parameters. Too many can slow the logging rate.",
    },
    {
      step: 5,
      title: "Set Up Logging",
      description:
        "Click 'Start Logging' to begin real-time display. To record data, click the record button before your pull. Give each log a descriptive name.",
    },
    {
      step: 6,
      title: "Perform a Datalog Pull",
      description:
        "For WOT (wide open throttle) logs: Start from a roll in 3rd or 4th gear at 2500-3000 RPM. Floor the throttle and hold until redline or desired RPM. Release throttle and stop recording.",
      warning: "Only perform WOT pulls in safe, legal conditions. Track or private property recommended.",
    },
    {
      step: 7,
      title: "Save and Export",
      description:
        "Stop the recording. Save the log file. Export as CSV if needed. Upload the log file to your ticket on RC Performance for analysis.",
    },
  ],
  troubleshooting: [
    {
      problem: "Parameters showing N/A or no data",
      solution:
        "Verify the correct logger definition file for your ECU. Check that the vehicle is running. Try reconnecting the Tactrix cable.",
    },
    {
      problem: "Slow logging rate",
      solution:
        "Reduce the number of parameters being logged. Close other programs. Use a direct USB connection.",
    },
    {
      problem: "Logger disconnects during pull",
      solution:
        "Secure the Tactrix cable connection. Use a USB extension to reduce strain. Check for loose OBD-II connection.",
    },
  ],
  warnings: [
    "Never datalog while distracted - have a passenger operate the laptop",
    "Do not perform WOT pulls on public roads",
    "Monitor knock levels - excessive knock requires immediate throttle lift",
    "Ensure laptop is securely mounted in the vehicle",
  ],
  tips: [
    "Log at least 3 good WOT pulls for tune analysis",
    "Include some part-throttle cruising data as well",
    "Note the ambient temperature and fuel used in your log notes",
    "Warm up the vehicle fully before logging (coolant temp 180°F+)",
  ],
}
