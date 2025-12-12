import { Manrope } from "next/font/google";

const manropeSans = Manrope({
  variable: "--font-manrope_sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export { manropeSans };
