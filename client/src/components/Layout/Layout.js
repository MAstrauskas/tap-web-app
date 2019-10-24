import React from "react";
import { ThemeProvider } from "emotion-theming";

import Theme from "../shared/Theme/Theme";
import Navigation from "../Navigation/Navigation";

const Layout = props => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Navigation />
        {props.children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
