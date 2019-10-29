import React from "react";
import styled from "@emotion/styled";
import { MdAddCircle as AddIcon } from "react-icons/md";
import Theme from "../../shared/Theme/Theme";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
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

const LogoContainer = styled.div`
  padding: 1rem;
`;

const NavLogo = styled.a`
  padding: 0 2rem 0 3rem;
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize.navLogo};
  font-weight: bold;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.2rem;
`;

const NavLink = styled.a`
  padding-top: 1rem;
  padding-left: 1rem;
  color: ${Theme.colors.primary};
  font-size: ${Theme.fontSize.navLink};
  transition: color 0.3s ease;

  &:hover {
    color: tomato;
  }
`;

const Icon = styled.i`
  svg {
    margin-top: -6px;
    width: 35px;
    height: 33px;
  }
`;

const MenuToggle = styled.div`
  display: block;
  position: relative;
  top: 15px;
  right: 45px;
  z-index: 1;
  user-select: none;
  -webkit-user-select: none;

  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    right: -5px;
    opacity: 0;
    z-index: 2;
    -webkit-touch-callout: none;

    &:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: ${Theme.colors.black};
    }

    &:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    &:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(0, -1px);
    }

    &:not(:checked) ~ ul {
      visibility: hidden;
    }

    &:checked ~ ul {
      transform: none;
      visibility: visible;
    }
  }
`;

const MenuLine = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: ${Theme.colors.primary};
  border-radius: 3px;
  z-index: 1;
  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

  &:first-child {
    transform-origin: 0% 0%;
  }

  &:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
`;

const Menu = styled.ul`
  position: absolute;
  width: 300px;
  margin: 11px 0 0 -322px;
  padding: 50px;
  padding-top: 125px;

  background: ${Theme.colors.black};
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  li {
    padding: 10px 0;
    font-size: 22px;
    color: ${Theme.colors.white};
  }
`;

const MenuLink = styled.a`
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
`;

const lastLink = {
  paddingRight: "3.5rem"
};

const activeLink = {
  color: `${Theme.colors.black}`
};

const Navigation = () => {
  return (
    <>
      <Nav data-testid="navigation">
        <LogoContainer>
          <NavLogo href="/">TAP</NavLogo>
        </LogoContainer>

        <Links data-testid="navigation-links">
          <NavLink href="/">
            <Icon>
              <AddIcon />
            </Icon>
          </NavLink>
          <NavLink href="/home" style={activeLink}>
            HOME
          </NavLink>
          <NavLink href="/home" style={lastLink}>
            MY TASKS
          </NavLink>

          <MenuToggle>
            <input type="checkbox" />

            <MenuLine></MenuLine>
            <MenuLine></MenuLine>
            <MenuLine></MenuLine>

            <Menu>
              <MenuLink>
                <li>SETTINGS</li>
              </MenuLink>
              <MenuLink>
                <li>MOODIST</li>
              </MenuLink>
              <MenuLink>
                <li>LOGOUT</li>
              </MenuLink>
            </Menu>
          </MenuToggle>
        </Links>
      </Nav>
    </>
  );
};

export default Navigation;
