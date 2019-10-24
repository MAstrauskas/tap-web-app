import React from "react";
import styled from "@emotion/styled";
import Theme from "../Theme/Theme";

const Nav = styled.nav`
  display: flex;
  padding: 1rem;
  border-bottom: 2px solid ${Theme.colors.primary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  a {
    text-decoration: none;
  }
`;

const NavLogo = styled.a`
  padding: 0 2rem 0 2rem;
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize.navLink};
  font-weight: bold;
`;

const Links = styled.div``;

const NavLink = styled.a`
  padding: 0 1rem 0 1rem;
  color: ${Theme.colors.primary};
  font-size: ${Theme.fontSize.navLink};
`;

const Navigation = () => {
  return (
    <>
      <Nav>
        <NavLogo href="/">TAP</NavLogo>
        <Links>
          <NavLink href="/">Login</NavLink>
          <NavLink href="/">Register</NavLink>
        </Links>
      </Nav>
    </>
  );
};

export default Navigation;
