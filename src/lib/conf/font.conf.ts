import { Inter, Space_Grotesk } from "next/font/google";

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "swap",
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
});
