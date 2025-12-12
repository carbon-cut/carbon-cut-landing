import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "linear-1": "var(--linear-1)",
        "linear-2": "var(--linear-2-1)",
        "linear-2-2": "var(--linear-2-2)",
        "linear-transport": "var(--linear-transport)",
        "linear-food": "var(--linear-food)",
        "linear-vacation": "var(--linear-vacation)",
        "linear-energie": "var(--linear-energie)",
        "linear-waste": "var(--linear-waste)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        liniar: "var(--liniar)",
        section: {
          transport: "hsl(var(--section-transport))",
          food: "hsl(var(--section-food))",
          vacation: "hsl(var(--section-vacation))",
          energie: "hsl(var(--section-energie))",
          waste: "hsl(var(--section-waste))",
          light: {
            transport: "hsl(var(--section-transport-light))",
            food: "hsl(var(--section-food-light))",
            vacation: "hsl(var(--section-vacation-light))",
            energie: "hsl(var(--section-energie-light))",
            waste: "hsl(var(--section-waste-light))",
          },
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          primary: {
            DEFAULT: "hsl(var(--card-primary))",
            foreground: "hsl(var(--card-primary-foreground))",
            muted: "hsl(var(--card-primary-muted))",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "preview-up": {
          from: { height: "auto" }, // or a specific value
          to: { height: "0", display: "none" },
        },
        "preview-down": {
          from: { height: "0" },
          to: { height: "auto" }, // or a specific value
        },
        fit: {
          from: { width: "auto" },
          to: { width: "auto" },
        },
        "translate-down": {
          to: {
            transform: "translateY(-100%)",
          },
        },
        "to-translate-0": {
          to: {
            transform: "translate(0, 0)",
            opacity: "1",
            scale: "1",
          },
        },
        "fade-in-scale": {
          from: {
            opacity: "0",
            transform: "translateY(12px) scale(0.94)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        deblur: {
          from: {
            filter: "blur(12px)",
            opacity: "0.4",
          },
          to: {
            filter: "blur(0px)",
            opacity: "1",
          },
        },
        "fade-out-scale": {
          from: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
          to: {
            opacity: "0.2",
            transform: "translateY(12px) scale(0.92)",
          },
        },
        "tilt-in-left": {
          from: {
            opacity: "0",
            transform: "translateY(16px) translateX(-88px) rotate(2deg) scale(0.98)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) translateX(0) rotate(0deg) scale(1)",
          },
        },
        "tilt-in-right": {
          from: {
            opacity: "0",
            transform: "translateY(16px) translateX(88px) rotate(-2deg) scale(0.98)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) translateX(0) rotate(0deg) scale(1)",
          },
        },
        "blur-in": {
          from: {
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateY(12px)",
          },
          to: {
            opacity: "1",
            filter: "blur(0px)",
            transform: "translateY(0)",
          },
        },
        "rise-in": {
          from: {
            opacity: "0",
            transform: "translateY(24px) scale(0.96)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "parallax-float": {
          from: {
            opacity: "0",
            transform: "translateY(40px) scale(1.04)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
      },
      transitionBehavior: {
        descrete: "allow-descrete",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "preview-up": "preview-up 0.4s ease-out forwards",
        "preview-down": "preview-down 0.4s ease-out forwards",
        "translate-down": "3s cubic-bezier(0.65, 0.05, 0.17, 0.99) forwards",
        fit: "fit 0.5s ease-in-out",
        "to-translate-0": "to-translate-0 5s ease-in-out forwards",
        "fade-in-scale": "fade-in-scale 0.75s ease-out forwards",
        deblur: "deblur 0.9s ease-out forwards",
        "fade-out-scale": "fade-out-scale 0.6s ease-out forwards",
        "tilt-in-left": "tilt-in-left 0.7s ease-out forwards",
        "tilt-in-right": "tilt-in-right 0.7s ease-out forwards",
        "blur-in": "blur-in 0.6s ease-out forwards",
        "rise-in": "rise-in 0.8s ease-out forwards",
        "parallax-float": "parallax-float 1s ease-out forwards",
      },
      fontFamily: {
        manrope_sans: ["var(--font-manrope_sans)"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@adam.plesnik/tailwindcss-scroll-driven-animations"),
  ],
} satisfies Config;
