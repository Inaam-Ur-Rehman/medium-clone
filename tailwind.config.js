/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-yellow": "#FFC017",
        "theme-green": "#1A8917",
      },
      // custom font
      fontFamily: {
        baloo: "var(--baloo)",
        actor: "var(--actor)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
