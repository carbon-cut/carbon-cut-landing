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
        "linear-primary-diagonal": "var(--linear-primary-diagonal)",
        "linear-accent-horizontal": "var(--linear-accent-horizontal)",
        "linear-accent-diagonal": "var(--linear-accent-diagonal)",
        "linear-section-transport": "var(--linear-section-transport)",
        "linear-section-transport-hover": "var(--linear-section-transport-hover)",
        "linear-section-food": "var(--linear-section-food)",
        "linear-section-vacation": "var(--linear-section-vacation)",
        "linear-section-energy": "var(--linear-section-energy)",
        "linear-section-waste": "var(--linear-section-waste)",
      },
      colors: {
        "default-font": "rgb(24 24 27)",
        "subtext-color": "rgb(113 113 122)",
        "default-background": "rgb(255 255 255)",
        "brand-50": "rgb(236 253 245)",
        "brand-100": "rgb(209 250 229)",
        "brand-300": "rgb(110 231 183)",
        "brand-500": "rgb(16 185 129)",
        "brand-600": "rgb(5 150 105)",
        "brand-700": "rgb(4 120 87)",
        "brand-800": "rgb(6 95 70)",
        "success-600": "rgb(5 150 105)",
        "success-100": "rgb(209 250 229)",
        "success-800": "rgb(6 95 70)",
        "neutral-50": "rgb(250 250 250)",
        "neutral-100": "rgb(244 244 245)",
        "neutral-200": "rgb(228 228 231)",
        "neutral-300": "rgb(212 212 216)",
        "neutral-400": "rgb(161 161 170)",
        "neutral-700": "rgb(63 63 70)",
        "neutral-border": "rgb(228 228 231)",
        "error-100": "rgb(254 226 226)",
        "error-50": "rgb(254 242 242)",
        "error-500": "rgb(239 68 68)",
        "error-600": "rgb(220 38 38)",
        "error-800": "rgb(153 27 27)",
        "warning-100": "rgb(237 233 254)",
        "warning-800": "rgb(91 33 182)",
        background: "hsl(var(--background))",
        workspace: "hsl(var(--workspace-background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          warm: "hsl(var(--surface-warm))",
        },
        section: {
          transport: "hsl(var(--section-transport))",
          food: "hsl(var(--section-food))",
          vacation: "hsl(var(--section-vacation))",
          energy: "hsl(var(--section-energy))",
          waste: "hsl(var(--section-waste))",
          light: {
            transport: "hsl(var(--section-transport-light))",
            food: "hsl(var(--section-food-light))",
            vacation: "hsl(var(--section-vacation-light))",
            energy: "hsl(var(--section-energy-light))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
          subtle: "hsl(var(--primary-subtle))",
          "subtle-hover": "hsl(var(--primary-subtle-hover))",
          border: "hsl(var(--primary-border))",
        },
        focus: {
          DEFAULT: "hsl(var(--focus))",
          foreground: "hsl(var(--focus-foreground))",
        },
        interactive: {
          hover: "hsl(var(--interactive-hover))",
          subtle: "hsl(var(--interactive-subtle))",
          border: "hsl(var(--interactive-border))",
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
        border: {
          DEFAULT: "hsl(var(--border))",
          light: "hsl(var(--border-light))",
        },
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
      fontSize: {
        caption: ["12px", { lineHeight: "16px", fontWeight: "400", letterSpacing: "0em" }],
        "caption-bold": ["12px", { lineHeight: "16px", fontWeight: "500", letterSpacing: "0em" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400", letterSpacing: "0em" }],
        "body-bold": ["14px", { lineHeight: "20px", fontWeight: "500", letterSpacing: "0em" }],
        "heading-3": ["16px", { lineHeight: "20px", fontWeight: "500", letterSpacing: "0em" }],
        "heading-2": ["20px", { lineHeight: "24px", fontWeight: "500", letterSpacing: "0em" }],
        "heading-1": ["30px", { lineHeight: "36px", fontWeight: "500", letterSpacing: "0em" }],
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
        discrete: "allow-discrete",
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
        sans: ["var(--font-work_sans)"],
        caption: ["var(--font-work_sans)"],
        "caption-bold": ["var(--font-work_sans)"],
        body: ["var(--font-work_sans)"],
        "body-bold": ["var(--font-work_sans)"],
        "heading-1": ["var(--font-work_sans)"],
        "heading-2": ["var(--font-work_sans)"],
        "heading-3": ["var(--font-work_sans)"],
        manrope_sans: ["var(--font-manrope_sans)"],
      },
      screens: {
        mobile: { max: "767px" },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@adam.plesnik/tailwindcss-scroll-driven-animations"),
  ],
} satisfies Config;
