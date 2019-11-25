import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
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

  a {
    padding: 1rem 0rem;
    color: ${Theme.colors.primary};
    font-size: ${Theme.fontSize.navLink};
    transition: color 0.3s ease;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: tomato;
    }

    &.active {
      color: ${Theme.colors.activeLink};
    }
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
          <NavLink to="/home" activeClassName="active">
            <Icon>
              <TodayIcon />
            </Icon>
            Today
          </NavLink>
          <NavLink to="/tasks/all" activeClassName="active">
            <Icon>
              <AllTaskIcon />
            </Icon>
            All Tasks
          </NavLink>
          <NavLink to="/tasks/summary" activeClassName="active">
            <Icon>
              <SummaryIcon />
            </Icon>
            Summary
          </NavLink>
          <NavLink to="/tasks/add" activeClassName="active">
            <Icon>
              <AddIcon />
            </Icon>
            Add a Task
          </NavLink>

          <NavLink to="/tasks/moodist" activeClassName="active">
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
