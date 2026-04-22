import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1A1A2E",
          50: "#F5F5F9",
          100: "#E6E6EE",
          200: "#C7C7D6",
          300: "#9A9AB5",
          400: "#6B6B8A",
          500: "#3F3F5F",
          600: "#2A2A46",
          700: "#1A1A2E",
          800: "#121222",
          900: "#0A0A16",
        },
        gold: {
          DEFAULT: "#D4A843",
          50: "#FBF6E8",
          100: "#F5EAC3",
          200: "#EAD487",
          300: "#E0BE55",
          400: "#D4A843",
          500: "#B28A2E",
          600: "#8A6A22",
          700: "#634B17",
        },
        emerald: {
          DEFAULT: "#10B981",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(212,168,67,0.15), transparent 60%)",
        "hero-glow":
          "radial-gradient(1200px 600px at 50% -10%, rgba(212,168,67,0.25), transparent 70%)",
      },
      boxShadow: {
        glass:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 10px 40px -10px rgba(0,0,0,0.5)",
        gold: "0 10px 40px -10px rgba(212,168,67,0.5)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        tap: "tap 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        tap: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "45%": { transform: "translateY(-14px) scale(1.02)" },
          "55%": { transform: "translateY(-14px) scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
