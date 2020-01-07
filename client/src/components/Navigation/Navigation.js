import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "@emotion/styled";
import Theme from "../shared/Theme/Theme";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid ${Theme.colors.primary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 500px) {
    a {
      padding: 0rem;
    }

    div a {
      padding-left: 1rem;
    }
  }
`;

const NavLogo = styled.a`
  padding: 0 2rem 0 3rem;
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize.navLogo};
  font-weight: bold;
`;

const Links = styled.div`
  padding-top: 0.2rem;
`;

const NavLink = styled.button`
  padding: 0 3rem 0 1rem;
  color: ${Theme.colors.primary};
  font-size: ${Theme.fontSize.navLink};
  cursor: pointer;
  border: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${Theme.colors.activeLink};
  }
`;

const Navigation = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Nav data-testid="navigation">
        <NavLogo href="/">TAP</NavLogo>
        <Links data-testid="navigation-links">
        {!isAuthenticated && (
          <NavLink onClick={() => loginWithRedirect({})}>LOGIN / REGISTER</NavLink>
        )}
        </Links>
      </Nav>
    </>
  );
};

export default Navigation;
