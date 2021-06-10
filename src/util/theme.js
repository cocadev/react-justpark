// eslint-disable-next-line import/no-anonymous-default-export
export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#0f7277",
      dark: "#008394",
      contrastText: "#fff",
    },
    type: "light",
    background: {
      default: "#008394",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  shadows: [
    "none",
    `0px 0px 10px 0px rgba(0,0,0,0.075),0px 0px 0px 1px rgba(0,0,0,0.04)`,
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],

  typography: {
    fontFamily: "Nunito, Avenir, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },

  spread: {
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 860,
      lg: 1024,
      xl: 1280,
    },
  },
  layout: {
    header: {
      height: 70,
    },
    sidebar: {
      width: 240,
      mobileWidth: 240,
    },
    listingBar: {
      width: 400,
    },
  },
};
