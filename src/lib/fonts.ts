import localFont from "next/font/local";

const workSans = localFont({
  src: "./fonts/work-sans-latin-variable.woff2",
  variable: "--font-work_sans",
  weight: "400 500",
});

// Retained while Work Sans is the application default, so the prior family can be restored.
const manropeSans = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope_sans",
  weight: "300 800",
});

export { manropeSans, workSans };
