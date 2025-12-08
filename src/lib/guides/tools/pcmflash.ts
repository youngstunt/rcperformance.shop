import { ToolGuide } from "../types"

export const pcmflashReadingGuide: ToolGuide = {
  tool: "PCMFlash",
  softwareRequired: ["PCMFlash software (licensed module for your ECU)"],
  softwareDownloadUrls: {
    PCMFlash: "https://www.pcmflash.com/downloads/",
  },
  hardwareRequired: [
    "PCMFlash compatible interface (J2534, Scanmatik, etc.)",
    "Laptop with Windows 7/10/11",
    "Vehicle-specific adapter cables (if required)",
    "12V power supply for bench reading (optional)",
  ],
  estimatedTime: "15-45 minutes (varies by ECU)",
  difficulty: "Advanced",
  steps: [
    {
      step: 1,
      title: "Verify License and Module",
      description:
        "Open PCMFlash and verify you have the appropriate module licensed for your vehicle's ECU. Modules are purchased per ECU family.",
      warning: "PCMFlash requires specific modules for each ECU family. Verify compatibility before purchasing.",
    },
    {
      step: 2,
      title: "Select Reading Method",
      description:
        "PCMFlash supports multiple reading methods: OBD (through diagnostic port), Bench (ECU removed), Boot Mode. RC Performance will advise which method to use.",
      tip: "OBD reading is easiest but not available for all ECUs. Some require bench or boot mode.",
    },
    {
      step: 3,
      title: "Connect to Vehicle (OBD Method)",
      description:
        "Connect your J2534 interface to the laptop. Connect to the vehicle OBD-II port. Turn ignition ON. Launch PCMFlash.",
    },
    {
      step: 4,
      title: "Select ECU and Operation",
      description:
        "In PCMFlash, select your ECU from the module list. Choose 'Read' operation. Select what to read (usually Full Flash, or specific areas if advised).",
    },
    {
      step: 5,
      title: "Begin Read Process",
      description:
        "Click Start/Read. PCMFlash will begin reading the ECU. Progress and status messages will be displayed. Time varies from 5 minutes to 30+ minutes.",
      warning: "Do not interrupt the read process. Keep ignition stable. Some ECUs require specific battery voltage.",
    },
    {
      step: 6,
      title: "Save the Read File",
      description:
        "When complete, save the file immediately. PCMFlash will prompt for a filename. Use: YEAR_MAKE_MODEL_ECU_DATE.bin. Create a backup copy.",
    },
    {
      step: 7,
      title: "Verify File Integrity",
      description:
        "PCMFlash shows checksum information. Note this for reference. Verify file size matches expected size for your ECU.",
    },
  ],
  troubleshooting: [
    {
      problem: "Cannot connect to ECU",
      solution:
        "Verify module is licensed for your ECU. Check interface drivers. Some ECUs need engine running. Try boot mode if OBD fails.",
    },
    {
      problem: "Read fails with checksum error",
      solution:
        "This may indicate a previous bad flash. Try reading again. Contact RC Performance - may need special recovery.",
    },
    {
      problem: "Module not available for my ECU",
      solution:
        "Check PCMFlash module list for alternatives. Some ECUs require different tools. Contact RC Performance for guidance.",
    },
  ],
  warnings: [
    "PCMFlash is professional software - incorrect use can damage ECUs",
    "Some operations require bench connection (ECU removal)",
    "Boot mode reads require opening the ECU - warranty implications",
    "Always maintain stable power during read operations",
    "Back up files in multiple locations",
  ],
  tips: [
    "Join PCMFlash forums for ECU-specific guidance",
    "Some ECUs read faster with engine running",
    "Document which modules you have licensed",
    "Bench reading requires 12V bench power supply",
  ],
}

export const pcmflashWritingGuide: ToolGuide = {
  tool: "PCMFlash",
  softwareRequired: ["PCMFlash software (licensed module)"],
  hardwareRequired: [
    "PCMFlash compatible interface",
    "Laptop with Windows",
    "Battery maintainer (OBD method)",
    "12V bench supply (bench method)",
  ],
  estimatedTime: "15-60 minutes (varies by ECU and method)",
  difficulty: "Advanced",
  steps: [
    {
      step: 1,
      title: "Verify Tune File",
      description:
        "Download the tune file from your RC Performance ticket. Verify it matches your ECU type and original read file format.",
      warning: "Only flash files specifically created for your ECU. Wrong files can permanently damage the ECU.",
    },
    {
      step: 2,
      title: "Ensure Stable Power",
      description:
        "For OBD: Connect battery maintainer, ensure 13V+ during write. For Bench: Use stable 12V bench supply rated for at least 5A.",
      warning: "Power interruption during write = bricked ECU. This is critical.",
    },
    {
      step: 3,
      title: "Open Tune File in PCMFlash",
      description:
        "Launch PCMFlash. Select your ECU module. Load the tune file. Verify the file loads without errors.",
    },
    {
      step: 4,
      title: "Connect to ECU",
      description:
        "Connect interface to laptop. Connect to vehicle OBD-II port or bench setup. Verify communication is established.",
    },
    {
      step: 5,
      title: "Select Write Operation",
      description:
        "Choose Write/Flash operation. Select full flash or partial (as advised by RC Performance). Review any warnings.",
    },
    {
      step: 6,
      title: "Execute Flash",
      description:
        "Click Start/Write. The flash process begins. DO NOT TOUCH ANYTHING. Progress will be shown.",
      warning:
        "ABSOLUTELY DO NOT interrupt the flash. No disconnecting, no ignition cycling, no power interruption. Wait for complete confirmation.",
    },
    {
      step: 7,
      title: "Wait for Completion",
      description:
        "Flash time varies greatly by ECU (5-45 minutes). Some ECUs reset during flash - this is normal. Wait for 'Success' or 'Complete' message.",
    },
    {
      step: 8,
      title: "Post-Flash Verification",
      description:
        "Once complete, turn ignition off. Wait 60 seconds. Start vehicle. Check for normal operation. Some ECUs need relearn procedures.",
    },
  ],
  troubleshooting: [
    {
      problem: "Flash fails partway through",
      solution:
        "DO NOT PANIC. Note the error message. Try recovery flash if available. Contact RC Performance immediately. May need boot mode recovery.",
    },
    {
      problem: "ECU doesn't respond after flash",
      solution:
        "Wait 2 minutes. Try power cycle. May need boot mode recovery. Contact RC Performance - do not attempt random fixes.",
    },
    {
      problem: "Vehicle starts but runs poorly",
      solution:
        "ECU may need adaptation time. Check for codes. Verify correct tune was flashed. Contact RC Performance with datalog.",
    },
  ],
  warnings: [
    "PCMFlash flashing is PERMANENT until reflashed - verify file before flashing",
    "Some ECUs cannot be recovered via OBD if corrupted - require bench/boot",
    "Power stability is the #1 cause of failed flashes",
    "Do not attempt to flash unfamiliar ECUs without guidance",
    "Some ECUs have limited write cycles - don't flash unnecessarily",
  ],
  tips: [
    "Do a 'verify' read after flashing to confirm successful write",
    "Keep your original read file forever",
    "Flash in controlled environment (garage) when possible",
    "Have RC Performance contact ready during your first flash",
  ],
}

export const pcmflashDataloggingGuide: ToolGuide = {
  tool: "PCMFlash",
  softwareRequired: ["PCMFlash with diagnostic functions", "Or separate logging software"],
  hardwareRequired: [
    "PCMFlash compatible interface",
    "Laptop",
  ],
  estimatedTime: "Varies",
  difficulty: "Advanced",
  steps: [
    {
      step: 1,
      title: "Check Logging Support",
      description:
        "PCMFlash is primarily a flash tool. Logging capabilities vary by ECU module. Check if your module supports live data.",
    },
    {
      step: 2,
      title: "Alternative Logging Setup",
      description:
        "For most vehicles, RC Performance recommends using dedicated logging software: HP Tuners VCM Scanner for GM, RomRaider for Subaru, etc.",
      tip: "PCMFlash excels at reading/writing. Dedicated logging tools typically provide better logging experience.",
    },
    {
      step: 3,
      title: "If PCMFlash Logging Available",
      description:
        "Select Diagnostics or Live Data in PCMFlash. Choose parameters. Start engine. Begin logging.",
    },
    {
      step: 4,
      title: "Record Logging Session",
      description:
        "If recording is supported, save logs to file. Perform requested driving scenarios (WOT pulls, cruise, etc.).",
    },
    {
      step: 5,
      title: "Export and Upload",
      description:
        "Save log files. Upload to your RC Performance ticket along with notes about conditions.",
    },
  ],
  troubleshooting: [
    {
      problem: "No logging option available",
      solution:
        "PCMFlash module may not support logging for your ECU. Use alternative logging tool.",
    },
    {
      problem: "Limited parameters available",
      solution:
        "PCMFlash logging is basic on most modules. Use dedicated logging software for comprehensive data.",
    },
  ],
  warnings: [
    "PCMFlash logging is secondary to its flash functionality",
    "Not all PCMFlash modules support logging",
    "For detailed tune analysis, dedicated logging tools are preferred",
  ],
  tips: [
    "Ask RC Performance which logging tool they prefer for your vehicle",
    "Keep PCMFlash for read/write, use appropriate logger for data",
    "Some vehicles work well with generic OBD-II loggers",
  ],
}
