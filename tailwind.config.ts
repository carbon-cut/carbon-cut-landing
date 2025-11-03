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
			'linear-1': 'var(--linear-1)',
			'linear-2': 'var(--linear-2-1)',
			'linear-2-2': 'var(--linear-2-2)',
			'linear-transport': 'var(--linear-transport)',
			'linear-food': 'var(--linear-food)',
			'linear-vacation': 'var(--linear-vacation)',
			'linear-energie': 'var(--linear-energie)',
			'linear-waste': 'var(--linear-waste)',
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			liniar: 'var(--liniar)',
			section: {
				transport: 'hsl(var(--section-transport))',
				food: 'hsl(var(--section-food))',
				vacation: 'hsl(var(--section-vacation))',
				energie: 'hsl(var(--section-energie))',
				waste: 'hsl(var(--section-waste))',
			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
				primary: {
					DEFAULT: 'hsl(var(--card-primary))',
					foreground: 'hsl(var(--card-primary-foreground))',
					muted: 'hsl(var(--card-primary-muted))',
				},
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
			'preview-up': {
          from: { height: 'auto' }, // or a specific value
          to: { height: '0', display: 'none' },
        },
		'preview-down': {
			from: { height: '0' },
          to: { height: 'auto' }, // or a specific value
        },
  		},
		transitionBehavior: {
			descrete: 'allow-descrete'
		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'preview-up': 'preview-up 0.2s ease-out forwards',
			'preview-down': 'preview-down 0.2s ease-out forwards',
  		},
		fontFamily: {
			manrope_sans: ['var(--font-manrope_sans)'],
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
