import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const appName = "Task Manager";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLetterCapitalized(name: string) {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
}
