import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "custom-glow": "rgba(255, 255, 255, 0.5)", // Customize the glow color
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "bar-glow": {
          "0%": { boxShadow: "2px 0 40px 0px rgb(100,200,255)" },
          "25%": { boxShadow: "2px 0 40px 1px rgb(100,200,255)" },
          "50%": { boxShadow: "2px 0 40px 2px rgb(100,200,255)" },
          "75%": { boxShadow: " 2px 0 40px 1px rgb(100,200,255)" },
          "100%": { boxShadow: "2px 0 40px 0px rgb(100,200,255)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        bouncing: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
        "my-glow-combined": {
          "0%": { boxShadow: "0 0 3px 3px #48abe0" },
          "100%": { boxShadow: "0 0 3px 3px #48abe0" },
        },
        "my-glow": {
          "0%": { boxShadow: "0 0 50px 0px #48abe0" },
          "10%": { boxShadow: "0 0 50px 1px #48abe0" },
          "20%": { boxShadow: "0 0 50px 2px #48abe0" },
          "30%": { boxShadow: "0 0 50px 3x #48abe0" },
          "40%": { boxShadow: "0 0 50px 4px #48abe0" },
          "50%": { boxShadow: "0 0 50px 5px #48abe0" },
          "60%": { boxShadow: "0 0 50px 6px #48abe0" },
          "70%": { boxShadow: "0 0 50px 7px #48abe0" },
          "80%": { boxShadow: "0 0 50px 8px #48abe0" },
          "90%": { boxShadow: "0 0 50px 9px #48abe0" },
          "100%": { boxShadow: "box-shadow: 0 0 50px 10px #48abe0" },
          reverse: {
            "0%": "box-shadow: 0 0 50px 0px #48abe0;",
            "10%": "box-shadow: 0 0 50px 1px #48abe0;",
            "20%": "box-shadow: 0 0 50px 2px #48abe0;",
            "30%": "box-shadow: 0 0 50px 3px #48abe0;",
            "40%": "box-shadow: 0 0 50px 4px #48abe0;",
            "50%": "box-shadow: 0 0 50px 5px #48abe0;",
            "60%": "box-shadow: 0 0 50px 6px #48abe0;",
            "70%": "box-shadow: 0 0 50px 7px #48abe0;",
            "80%": "box-shadow: 0 0 50px 8px #48abe0;",
            "90%": "box-shadow: 0 0 50px 9px #48abe0;",
            "100%": "box-shadow: 0 0 50px 10px #48abe0;",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "my-glow": "my-glow 1s ease-in-out infinite",
        "my-glow-reverse": "my-glow-reverse 1s ease-in-out infinite",
        "my-glow-combined": "my-glow-combined 1.2s ease-in-out infinite",
        "bar-glow": "bar-glow 5s ease-in-out infinite",
        bouncing: "bouncing 2.5s ease-in-out infinite",
        blob: "blob 7s infinite",
      },

      boxShadow: {
        boxShadow: "0 0 4px 4px #48abe0",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config

export default config
