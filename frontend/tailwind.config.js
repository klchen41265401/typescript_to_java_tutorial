export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0038FF",
          600: "#002CBD",
          700: "#001F8F",
          800: "#001661",
          900: "#000D33",
        },
        accent: {
          cyan: "#00B4D8",
          teal: "#0096C7",
          blue: "#0077B6",
          dark: "#023E8A",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #002CBD 0%, #0038FF 50%, #00B4D8 100%)",
        "gradient-secondary": "linear-gradient(135deg, #001F8F 0%, #002CBD 50%, #0038FF 100%)",
        "gradient-accent": "linear-gradient(90deg, #00B4D8 0%, #0096C7 100%)",
        "gradient-dark": "linear-gradient(180deg, #001661 0%, #002CBD 100%)",
      },
      boxShadow: {
        primary: "0 4px 20px rgba(0, 44, 189, 0.15)",
        "primary-lg": "0 8px 30px rgba(0, 44, 189, 0.25)",
        accent: "0 4px 20px rgba(0, 180, 216, 0.15)",
      },
    },
  },
  plugins: [],
};
