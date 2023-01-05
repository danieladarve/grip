const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px, base = 16) => `${round(px / base)}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-grip-midnight",
    "bg-grip-azure",
    "bg-grip-coral",
    "bg-grip-green",
    "bg-grip-yellow",
    "bg-grip-red",
    "bg-grip-power-grey",
    "bg-grip-power-blue",
    "bg-grip-black-haze",
    "md:w-1/2",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            p: {
              lineHeight: theme("lineHeight.6"),
              color: theme("colors.grip.midnight"),
            },
            h2: {
              color: theme("colors.grip.midnight"),
              fontWeight: theme("fontWeight.normal"),
              marginBottom: "0.2rem",
              marginTop: "0.7rem",
            },
            h3: {
              color: theme("colors.grip.midnight"),
              fontWeight: theme("fontWeight.normal"),
              marginBottom: "0.2rem",
              marginTop: "0.7rem",
            },
            h4: {
              color: theme("colors.grip.midnight"),
              fontWeight: theme("fontWeight.normal"),
              marginBottom: "0.2rem",
              marginTop: "0.7rem",
            },
            h5: {
              color: theme("colors.grip.midnight"),
              fontWeight: theme("fontWeight.normal"),
              marginBottom: "0.2rem",
              marginTop: "0.7rem",
            },
          },
        },
      }),
      fontSize: {
        xs: rem(12, 16),
        sm: rem(14, 16),
        base: rem(16, 16),
        lg: rem(18, 16),
        xl: rem(22, 16),
        "2xl": rem(24, 16),
        "3xl": rem(28, 16),
        "4xl": rem(38, 16),
      },
      fontFamily: {
        inherit: "inherit",
        "dm-sans": ["DM Sans", "sans-serif"],
        "domaine-text": ["Domaine Text Test", "sans-serif"],
        "domaine-display": ["Domaine Display Test", "sans-serif"],
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
        7: "7px",
        8: "8px",
        9: "9px",
        10: "10px",
        11: "11px",
        12: "12px",
      },
      colors: {
        grip: {
          midnight: "#0B1E49",
          azure: "#5A8DFF",
          coral: "#FCC7A2",
          green: "#29CC97",
          yellow: "#FCE896",
          red: "#F47A3C",
          "power-grey": "#F47A3C",
          "power-blue": "#DBE8F4",
          "black-haze": "#F4F5F5",
          iron: "#E0E1E1",
          "disabled-bg": "#E0E1E1",
          "disabled-border": "#B1C9FC",
          "disabled-secondary-text": "#83AAFF",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
  ],
};
