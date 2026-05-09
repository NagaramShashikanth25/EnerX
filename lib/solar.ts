// India CEA Grid Emission Factor 2023
export const GRID_EMISSION_FACTOR = 0.82 // kg CO2 per kWh

// EnerX Credit Rate
export const KWH_TO_CREDITS = 10 // 10 EXC per kWh

// Carbon Credit Rate (Government CCTS 2023)
export const KG_CO2_PER_CARBON_CREDIT = 1000 // 1 tonne = 1 credit
export const CARBON_CREDIT_PRICE_INR = 900 // ₹830-1000, avg ₹900

export function kwhToCarbon(kwh: number): number {
  return parseFloat((kwh * GRID_EMISSION_FACTOR).toFixed(2))
}

export function kwhToCredits(kwh: number): number {
  return Math.floor(kwh * KWH_TO_CREDITS)
}

export function kwhToCarbonCredits(kwh: number): number {
  const kgCO2 = kwhToCarbon(kwh)
  return parseFloat((kgCO2 / KG_CO2_PER_CARBON_CREDIT).toFixed(4))
}

export function kwhToMoneyINR(kwh: number): number {
  const carbonCredits = kwhToCarbonCredits(kwh)
  return parseFloat((carbonCredits * CARBON_CREDIT_PRICE_INR).toFixed(2))
}

export function kwhToTrees(kwh: number): number {
  // 1 tree absorbs ~21 kg CO2/year
  return Math.floor(kwhToCarbon(kwh) / 21)
}

// Solar generation curve (realistic India curve)
export function solarCurve(hour: number, minute: number = 0): number {
  const h = hour + minute / 60
  if (h < 6 || h >= 19) return 0
  const peak = 12.5
  const width = 3.5
  const x = (h - peak) / width
  return Math.max(0, Math.exp(-x * x))
}

// Simulate hourly generation for a given capacity
export function simulateGeneration(capacityKw: number, hour: number): number {
  const curve = solarCurve(hour)
  const noise = 1 + (Math.random() - 0.5) * 0.08
  return parseFloat((capacityKw * curve * noise).toFixed(3))
}
