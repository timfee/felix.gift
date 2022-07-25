const plugin = require("tailwindcss/plugin")
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wobble: "wobble 4s ease-in-out 1s 5 alternate",
      },
      keyframes: {
        wobble: {
          "0%, 100%": {
            transform: " translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": {
            transform: " translateX(-30px) rotate(6deg)",
          },
          "30%": {
            transform: " translateX(15px) rotate(-6deg)",
          },
          "45%": {
            transform: " translateX(-15px) rotate(3.6deg)",
          },
          "60%": {
            transform: " translateX(9px) rotate(-2.4deg)",
          },
          "75%": {
            transform: " translateX(-6px) rotate(1.2deg)",
          },
        },
      },
      fontFamily: {
        sans: "Spline Sans",
        mono: "Spline Sans Mono",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          tear: value => ({
            background: `
                              linear-gradient(135deg, transparent 5.68px, ${value} 5.69px) top left,
                              linear-gradient(45deg, ${value} 2.8px, transparent 2.81px) top left, 
                              linear-gradient(135deg, ${value} 2.8px, transparent 2.81px) bottom left, 
                              linear-gradient(45deg, transparent 5.68px, ${value} 5.69px) bottom left`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "8px 4px",
            padding: "4px 0",
          }),
        },
        { values: flattenColorPalette(theme("colors")), type: "color" }
      )
    }),
  ],
}
