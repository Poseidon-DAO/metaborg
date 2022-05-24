module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./@metaborg/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      red: "var(--red)",
      black: "var(--black)",
      white: "var(--white)",
      gray: "var(--gray)",
      graySecondary: "var(--gray-secondary)",
      grayText: "var(--gray-text)",
      transparent: "var(--transparent)",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
