/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shimmer-blue": "#fbfdff",
        "shimmer-yellow": "#ffd130",
        "shimmer-dark-blue": "#eaf2f7",
      },
      borderColor: {
        "shimmer-divider-blue": "#c3ced5",
      },
    },
  },
  plugins: [],
};
