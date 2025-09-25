/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  safelist: [
    "col-span-1",
    "col-span-2",
    "row-span-1",
    "row-span-2",
    "row-span-4",
    "row-span-6",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      colors: {
        "custom-blue": "#001A41",
        "custom-lightblue": "#0050AE",
        "custom-gray": "#EFF1F4",

        // brand solids
        "solid-red": "#ED0226",
        "solid-blue": "#0050AE",
        "dark-blue": "#001A41",
        "natural-shades": "#CCCFD3",
        "stroke-grey": "#DAE0E9",
        "red-telkomsel": "#FF0025",

        // app palette
        background: "#EFF1F4",
        primary: "#181C21",
        "primary-foreground": "#FCFCFC",
        secondary: "#757F90",
        "secondary-foreground": "#181C21",
        accent: "#757F90",
        "accent-foreground": "#181C21",
        muted: "#9CA9B9",
        "muted-foreground": "#8E9AA8",
        border: "#ECECEC",
        input: "#ECECEC",
        ring: "#B4B4B4",

        // charts
        "chart-1": "#E5723E",
        "chart-2": "#5BA8E6",
        "chart-3": "#5E74C7",
        "chart-4": "#A3E35B",
        "chart-5": "#D7E35B",

        // sidebar
        sidebar: "#FCFCFC",
        "sidebar-foreground": "#252525",
        "sidebar-primary": "#181C21",
        "sidebar-primary-foreground": "#FCFCFC",
        "sidebar-accent": "#757F90",
        "sidebar-accent-foreground": "#181C21",
        "sidebar-border": "#ECECEC",
        "sidebar-ring": "#8E8E8E",
      },
    },
  },
  plugins: [],
};
