import React from "react";
import styled from "@emotion/styled";
import {
  FaCalendarDay as TodayIcon,
  FaTasks as AllTaskIcon,
  FaRegSmile as MoodistIcon
} from "react-icons/fa";
import {
  MdPieChart as SummaryIcon,
  MdAddCircle as AddIcon
} from "react-icons/md";
import Theme from "../../shared/Theme/Theme";

const Navigation = styled.div`
  border-right: 1px solid ${Theme.colors.primary};
  width: 15%;
  max-width: 15%;
  height: calc(100vh - 56px);
  max-height: calc(100vh - 56px);

  @media screen and (max-width: 1050px) {
    visibility: hidden;
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10rem 1rem 10rem 3rem;
`;

const NavLink = styled.a`
  padding: 1rem 1rem;
  color: ${Theme.colors.primary};
  font-size: ${Theme.fontSize.navLink};
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
`;

const Icon = styled.i`
  padding-right: 0.2rem;
`;

const SideNavigation = () => {
  return (
    <>
      <Navigation data-testid="side-navigation">
        <Nav>
          <NavLink>
            <Icon>
              <TodayIcon />
            </Icon>
            Today
          </NavLink>
          <NavLink>
            <Icon>
              <AllTaskIcon />
            </Icon>
            All Tasks
          </NavLink>
          <NavLink>
            <Icon>
              <SummaryIcon />
            </Icon>
            Summary
          </NavLink>
          <NavLink>
            <Icon>
              <AddIcon />
            </Icon>
            Add a Task
          </NavLink>
          <NavLink>
            <Icon>
              <MoodistIcon />
            </Icon>
            Moodist
          </NavLink>
        </Nav>
      </Navigation>
    </>
  );
};

export default SideNavigation;
