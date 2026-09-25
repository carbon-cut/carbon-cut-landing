import { Manrope, Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  variable: "--font-work_sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Retained while Work Sans is the application default, so the prior family can be restored.
const manropeSans = Manrope({
  variable: "--font-manrope_sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export { manropeSans, workSans };
