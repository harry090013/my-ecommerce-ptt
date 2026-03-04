import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Hàm này giúp gộp các class Tailwind lại với nhau mà không bị xung đột
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}