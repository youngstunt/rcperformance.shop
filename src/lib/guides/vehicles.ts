import { VehicleEcuInfo, EcuTool } from "./types"

// Vehicle-specific ECU information and tool recommendations
export const vehicleDatabase: VehicleEcuInfo[] = [
  // ============ SUBARU ============
  {
    make: "Subaru",
    models: ["WRX", "WRX STI", "Forester XT", "Legacy GT", "Outback XT"],
    years: { start: 2002, end: 2014 },
    ecuTypes: ["Denso"],
    supportedTools: ["Tactrix Openport 2.0", "EcuFlash", "RomRaider", "COBB Accessport"],
    obdLocation: "Under the dashboard, left of steering column, above the dead pedal",
    specificNotes: "These years use the Denso ECU which is well supported by open-source tools.",
    commonIssues: ["Ringland failure on EJ engines", "Oil consumption on FA20"],
  },
  {
    make: "Subaru",
    models: ["WRX", "WRX STI"],
    years: { start: 2015, end: 2021 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport", "Tactrix Openport 2.0", "EcuFlash"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA20DIT (WRX) and EJ257 (STI). COBB is most common, Tactrix works with proper definitions.",
  },
  {
    make: "Subaru",
    models: ["WRX"],
    years: { start: 2022, end: 2025 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport", "EcuFlash"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA24DIT engine. Newer ECU requires updated tools and definitions.",
  },
  {
    make: "Subaru",
    models: ["BRZ"],
    years: { start: 2013, end: 2020 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport", "EcuFlash", "Tactrix Openport 2.0"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA20 naturally aspirated. Shared platform with Toyota 86/Scion FR-S.",
  },
  {
    make: "Subaru",
    models: ["BRZ"],
    years: { start: 2022, end: 2025 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA24 naturally aspirated. Second generation platform.",
  },

  // ============ BMW ============
  {
    make: "BMW",
    models: ["335i", "135i", "535i", "Z4 35i"],
    years: { start: 2007, end: 2013 },
    ecuTypes: ["Bosch MSD80", "Bosch MSD81"],
    supportedTools: ["K-TAG", "PCMFlash", "Other"],
    obdLocation: "In the dashboard, left side near the hood release",
    specificNotes: "N54/N55 engines. MHD or bootmod3 (phone apps) are popular options for these vehicles.",
  },
  {
    make: "BMW",
    models: ["M3", "M4"],
    years: { start: 2015, end: 2020 },
    ecuTypes: ["Bosch MEVD17.2"],
    supportedTools: ["K-TAG", "PCMFlash", "Other"],
    obdLocation: "In the dashboard, left side near hood release",
    specificNotes: "S55 engine. MHD and bootmod3 support these vehicles via OBD.",
  },
  {
    make: "BMW",
    models: ["340i", "440i", "540i", "M240i", "X3 M40i", "X4 M40i"],
    years: { start: 2016, end: 2025 },
    ecuTypes: ["Bosch DME"],
    supportedTools: ["K-TAG", "PCMFlash", "Other"],
    obdLocation: "In the dashboard, left side",
    specificNotes: "B58 engine. MHD and bootmod3 are most common tuning platforms.",
  },

  // ============ AUDI/VOLKSWAGEN ============
  {
    make: "Audi",
    models: ["A3", "A4", "A5", "A6", "Q5", "TT"],
    years: { start: 2009, end: 2025 },
    ecuTypes: ["Bosch MED17", "Siemens Simos"],
    supportedTools: ["PCMFlash", "K-TAG"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "EA888 engines. Various ECU types depending on year and spec.",
  },
  {
    make: "Audi",
    models: ["S3", "S4", "S5", "RS3", "RS4", "RS5", "TTRS"],
    years: { start: 2010, end: 2025 },
    ecuTypes: ["Bosch MED17", "Siemens Simos"],
    supportedTools: ["PCMFlash", "K-TAG"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "Performance variants with higher output EA888 or 5-cylinder engines.",
  },
  {
    make: "Volkswagen",
    models: ["Golf GTI", "Golf R", "Jetta GLI", "Passat"],
    years: { start: 2009, end: 2025 },
    ecuTypes: ["Bosch MED17", "Siemens Simos"],
    supportedTools: ["PCMFlash", "K-TAG"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "EA888 platform. Same ECU families as Audi.",
  },

  // ============ FORD ============
  {
    make: "Ford",
    models: ["Mustang GT"],
    years: { start: 2011, end: 2017 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["HP Tuners", "MPVI2", "PCMFlash"],
    obdLocation: "Under dashboard, left of steering column, near emergency brake",
    specificNotes: "Coyote 5.0L V8. Well supported by HP Tuners and SCT.",
  },
  {
    make: "Ford",
    models: ["Mustang GT"],
    years: { start: 2018, end: 2025 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "Gen 3 Coyote. HP Tuners is primary platform.",
  },
  {
    make: "Ford",
    models: ["Mustang EcoBoost"],
    years: { start: 2015, end: 2025 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["HP Tuners", "MPVI2", "COBB Accessport"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "2.3L EcoBoost. COBB and HP Tuners both support this platform.",
  },
  {
    make: "Ford",
    models: ["F-150", "F-150 EcoBoost"],
    years: { start: 2011, end: 2025 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "3.5L and 2.7L EcoBoost, plus 5.0L V8. HP Tuners is standard.",
  },
  {
    make: "Ford",
    models: ["Focus ST"],
    years: { start: 2013, end: 2018 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["COBB Accessport", "HP Tuners"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "2.0L EcoBoost. COBB Accessport is most common.",
  },
  {
    make: "Ford",
    models: ["Focus RS"],
    years: { start: 2016, end: 2018 },
    ecuTypes: ["Ford PCM"],
    supportedTools: ["COBB Accessport", "HP Tuners"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "2.3L EcoBoost with AWD. COBB or HP Tuners.",
  },

  // ============ CHEVROLET ============
  {
    make: "Chevrolet",
    models: ["Camaro SS", "Camaro ZL1"],
    years: { start: 2010, end: 2015 },
    ecuTypes: ["GM E38", "GM E67"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "LS3/LSA engines. HP Tuners is the industry standard for GM.",
  },
  {
    make: "Chevrolet",
    models: ["Camaro SS", "Camaro ZL1", "Camaro 1LE"],
    years: { start: 2016, end: 2025 },
    ecuTypes: ["GM E92"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "LT1/LT4 engines. HP Tuners with latest VCM Suite.",
  },
  {
    make: "Chevrolet",
    models: ["Corvette C6"],
    years: { start: 2005, end: 2013 },
    ecuTypes: ["GM E38"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, driver side",
    specificNotes: "LS2/LS3/LS7/LS9 engines. HP Tuners standard.",
  },
  {
    make: "Chevrolet",
    models: ["Corvette C7"],
    years: { start: 2014, end: 2019 },
    ecuTypes: ["GM E92"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, driver side",
    specificNotes: "LT1/LT4 engines. HP Tuners is standard.",
  },
  {
    make: "Chevrolet",
    models: ["Corvette C8"],
    years: { start: 2020, end: 2025 },
    ecuTypes: ["GM E92"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, driver side",
    specificNotes: "LT2 engine. Mid-engine platform. HP Tuners developing support.",
  },
  {
    make: "Chevrolet",
    models: ["Silverado", "Sierra"],
    years: { start: 2007, end: 2025 },
    ecuTypes: ["GM E38", "GM E92"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "Various V8 engines. HP Tuners standard for all GM trucks.",
  },

  // ============ DODGE ============
  {
    make: "Dodge",
    models: ["Challenger", "Charger"],
    years: { start: 2008, end: 2014 },
    ecuTypes: ["Chrysler NGC"],
    supportedTools: ["HP Tuners", "MPVI2", "PCMFlash"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "5.7L and 6.4L HEMI. HP Tuners or DiabloSport.",
  },
  {
    make: "Dodge",
    models: ["Challenger", "Charger", "Challenger Hellcat", "Charger Hellcat"],
    years: { start: 2015, end: 2025 },
    ecuTypes: ["Chrysler NGC"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "5.7L, 6.4L, and 6.2L Supercharged HEMI. HP Tuners is primary platform.",
  },
  {
    make: "Dodge",
    models: ["RAM 1500", "RAM 2500", "RAM 3500"],
    years: { start: 2009, end: 2025 },
    ecuTypes: ["Chrysler NGC"],
    supportedTools: ["HP Tuners", "MPVI2"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "HEMI and Cummins diesel options. HP Tuners for gas, varies for diesel.",
  },

  // ============ NISSAN ============
  {
    make: "Nissan",
    models: ["370Z"],
    years: { start: 2009, end: 2020 },
    ecuTypes: ["Hitachi"],
    supportedTools: ["PCMFlash", "K-TAG", "Other"],
    obdLocation: "Under dashboard, left of steering column near hood release",
    specificNotes: "VQ37VHR engine. UpRev is a popular tuning solution.",
  },
  {
    make: "Nissan",
    models: ["GT-R"],
    years: { start: 2009, end: 2025 },
    ecuTypes: ["Hitachi"],
    supportedTools: ["PCMFlash", "K-TAG", "Other"],
    obdLocation: "Under dashboard, driver side",
    specificNotes: "VR38DETT. Specialized tools like EcuTek or COBB for these vehicles.",
  },
  {
    make: "Nissan",
    models: ["400Z"],
    years: { start: 2023, end: 2025 },
    ecuTypes: ["Hitachi"],
    supportedTools: ["PCMFlash", "Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "VR30DDTT engine. Tuning support developing for this platform.",
  },

  // ============ TOYOTA ============
  {
    make: "Toyota",
    models: ["86", "GR86"],
    years: { start: 2017, end: 2020 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport", "EcuFlash", "Tactrix Openport 2.0"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA20 engine. Same as Subaru BRZ. COBB or EcuFlash/Tactrix.",
  },
  {
    make: "Toyota",
    models: ["GR86"],
    years: { start: 2022, end: 2025 },
    ecuTypes: ["Denso"],
    supportedTools: ["COBB Accessport"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "FA24 engine. Second generation. COBB support available.",
  },
  {
    make: "Toyota",
    models: ["Supra"],
    years: { start: 2020, end: 2025 },
    ecuTypes: ["Bosch DME"],
    supportedTools: ["PCMFlash", "K-TAG", "Other"],
    obdLocation: "Under dashboard, left side",
    specificNotes: "B58 engine (BMW). MHD and bootmod3 support this vehicle.",
  },

  // ============ HONDA ============
  {
    make: "Honda",
    models: ["Civic Si"],
    years: { start: 2006, end: 2015 },
    ecuTypes: ["Honda ECU"],
    supportedTools: ["Other"],
    obdLocation: "Under dashboard, above the pedals on left side",
    specificNotes: "K-series engines. Hondata or KTuner are the go-to solutions.",
  },
  {
    make: "Honda",
    models: ["Civic Si", "Civic Sport"],
    years: { start: 2016, end: 2025 },
    ecuTypes: ["Honda ECU"],
    supportedTools: ["Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "1.5T and 2.0T engines. Hondata or KTuner recommended.",
  },
  {
    make: "Honda",
    models: ["Civic Type R"],
    years: { start: 2017, end: 2025 },
    ecuTypes: ["Honda ECU"],
    supportedTools: ["Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "K20C1 turbo. Hondata FlashPro is the standard solution.",
  },

  // ============ MITSUBISHI ============
  {
    make: "Mitsubishi",
    models: ["Lancer Evolution", "Evo X"],
    years: { start: 2008, end: 2015 },
    ecuTypes: ["Mitsubishi ECU"],
    supportedTools: ["Tactrix Openport 2.0", "EcuFlash", "RomRaider", "COBB Accessport"],
    obdLocation: "Under dashboard, left of steering column, near hood release",
    specificNotes: "4B11T engine. EvoScan for logging. Tactrix/EcuFlash or COBB for tuning.",
  },

  // ============ MAZDA ============
  {
    make: "Mazda",
    models: ["MX-5 Miata", "Miata"],
    years: { start: 2006, end: 2015 },
    ecuTypes: ["Mazda ECU"],
    supportedTools: ["Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "NC generation. Limited tuning options. VersaTuner is one solution.",
  },
  {
    make: "Mazda",
    models: ["MX-5 Miata", "Miata"],
    years: { start: 2016, end: 2025 },
    ecuTypes: ["Mazda ECU"],
    supportedTools: ["Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "ND generation. OFT (Open Flash Tablet) or VersaTuner.",
  },
  {
    make: "Mazda",
    models: ["Mazdaspeed3", "Mazdaspeed6"],
    years: { start: 2006, end: 2013 },
    ecuTypes: ["Mazda ECU"],
    supportedTools: ["COBB Accessport", "Other"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "2.3L MZR DISI turbo. COBB Accessport is the standard platform.",
  },

  // ============ MERCEDES-BENZ ============
  {
    make: "Mercedes-Benz",
    models: ["C63 AMG", "E63 AMG", "CLS63 AMG"],
    years: { start: 2008, end: 2025 },
    ecuTypes: ["Bosch ME9", "Bosch MED17"],
    supportedTools: ["K-TAG", "PCMFlash"],
    obdLocation: "In the lower dashboard, left of steering column",
    specificNotes: "M156, M157, M177/M178 engines. Professional tuning tools required.",
  },
  {
    make: "Mercedes-Benz",
    models: ["A45 AMG", "CLA45 AMG", "GLA45 AMG"],
    years: { start: 2014, end: 2025 },
    ecuTypes: ["Bosch MED17"],
    supportedTools: ["K-TAG", "PCMFlash"],
    obdLocation: "Under dashboard, left of steering column",
    specificNotes: "M133/M139 turbo 4-cylinder. Bench flash often required.",
  },

  // ============ PORSCHE ============
  {
    make: "Porsche",
    models: ["911 Turbo", "911 GT3"],
    years: { start: 2005, end: 2025 },
    ecuTypes: ["Bosch ME7", "Bosch MED17"],
    supportedTools: ["K-TAG", "PCMFlash"],
    obdLocation: "In the driver footwell area",
    specificNotes: "Various turbo and NA engines. Professional tools required.",
  },
  {
    make: "Porsche",
    models: ["Cayman", "Boxster", "718"],
    years: { start: 2006, end: 2025 },
    ecuTypes: ["Bosch ME7", "Bosch MED17"],
    supportedTools: ["K-TAG", "PCMFlash"],
    obdLocation: "In the driver footwell area",
    specificNotes: "Flat-6 and turbo-4 engines. Professional tools typically needed.",
  },
]

/**
 * Find vehicle info by make, model, and year
 */
export function findVehicleInfo(
  make: string,
  model: string,
  year: number
): VehicleEcuInfo | undefined {
  return vehicleDatabase.find((v) => {
    const makeMatch = v.make.toLowerCase() === make.toLowerCase()
    const modelMatch = v.models.some(
      (m) => m.toLowerCase() === model.toLowerCase() ||
             model.toLowerCase().includes(m.toLowerCase()) ||
             m.toLowerCase().includes(model.toLowerCase())
    )
    const yearMatch = year >= v.years.start && year <= v.years.end
    return makeMatch && modelMatch && yearMatch
  })
}

/**
 * Get recommended tools for a vehicle
 */
export function getRecommendedTools(
  make: string,
  model: string,
  year: number
): EcuTool[] {
  const vehicle = findVehicleInfo(make, model, year)
  if (vehicle) {
    return vehicle.supportedTools
  }
  // Return common tools as fallback
  return ["HP Tuners", "Tactrix Openport 2.0", "Other"]
}

/**
 * Get OBD-II port location for a vehicle
 */
export function getObdLocation(
  make: string,
  model: string,
  year: number
): string {
  const vehicle = findVehicleInfo(make, model, year)
  return vehicle?.obdLocation || "Typically located under the dashboard, to the left of the steering column"
}

/**
 * Get all vehicles for a specific make
 */
export function getVehiclesByMake(make: string): VehicleEcuInfo[] {
  return vehicleDatabase.filter(
    (v) => v.make.toLowerCase() === make.toLowerCase()
  )
}

/**
 * Get all unique makes in the database
 */
export function getAllMakes(): string[] {
  return [...new Set(vehicleDatabase.map((v) => v.make))]
}
