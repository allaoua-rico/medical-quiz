// tailwind.config.js

module.exports = {
  content: [],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C4E8C",
        underline_color: "#053F5C",
        dark_text: "#616161",
      },
    },
  },
  plugins: [],
};
