import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

export const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  }
});

const Theme = {
  colors: {
    primary: "#19A2CD",
    secondary: "rgba(25, 162, 205, 0.2)",
    black: "#000000",
    white: "#ffffff",
    error: "red",
    disabled: "#D3D3D3",
    activeLink: "tomato",
    success: "green",
    first: "#c60021",
    second: "#f6f6f8",
    third: "#e3e3e3",
    fourth: "#f2031f",
    fifth: "#eeeeee",
    gray: "#808080",
    low: "#008000",
    medium: "#ffb266",
    high: "#ff0000"
  },
  fontSize: {
    navLogo: "20px",
    navLink: "16px",
    xxlarge: "70px",
    xlarge: "48px",
    large: "30px",
    medium: "24px",
    small: "20px",
    xsmall: "16px",
    xxsmall: "12px"
  }
};

export default Theme;
