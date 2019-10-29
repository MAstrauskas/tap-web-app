import React from "react";
import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/styled";

import Theme from "../../shared/Theme/Theme";
import Navigation from "../Navigation/Navigation";

const Content = styled.main`
  display: flex;
  justify-content: center;
  margin: auto 4rem;
`;

const Layout = props => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Navigation />
        <Content>{props.children}</Content>
      </ThemeProvider>
    </>
  );
};

export default Layout;
