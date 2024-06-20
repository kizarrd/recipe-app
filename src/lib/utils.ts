import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { truncateFromThirdDecimals } from "./formatters"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const computeAmountForServings = (
  defaultAmount: number,
  currentServings: number,
  defaultServings: number,
  truncate=true
) => {
  const computed = defaultAmount * (currentServings / defaultServings)
  return truncate ? truncateFromThirdDecimals(computed) : computed; 
}