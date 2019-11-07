import React from "react";
import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/styled";

import Theme from "../../shared/Theme/Theme";
import Navigation from "../Navigation/Navigation";
import SideNavigation from "../SideNavigation/SideNavigation";

const Content = styled.main`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Layout = props => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Navigation />
        <Row>
          <SideNavigation />
          <Content>{props.children}</Content>
        </Row>
      </ThemeProvider>
    </>
  );
};

export default Layout;
