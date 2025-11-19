import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Core Work Zone OS palette
        wz_black: "#0A0A0A",
        wz_card: "rgba(15,15,15,0.6)",
        wz_glass: "rgba(25,25,25,0.45)",
        wz_border: "rgba(255,255,255,0.1)",

        // Accents
        wz_yellow: "#F5C542",
        wz_yellow_glow: "#FFDA6E",
        wz_orange: "#FF8C42",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        glow: "0 0 15px rgba(255, 204, 0, 0.25)",
        inset_glow: "inset 0 0 20px rgba(255, 204, 0, 0.12)",
      },

      borderRadius: {
        xl: "1rem",
      },

      backgroundImage: {
        "wz-gradient":
          "radial-gradient(circle at top left, #111 0%, #000 60%)",
      },
    },
  },
  plugins: [],
}

export default config
