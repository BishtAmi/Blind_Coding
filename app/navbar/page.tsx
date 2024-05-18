"use client"
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavbarContainer = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div>
        <Link href="/">
          <NavLink>Home</NavLink>
        </Link>
      </div>
      <NavList>
        <NavItem>
          <Link href="/code-arena">
            <NavLink>Code Arena</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/leaderboard">
            <NavLink>Leaderboard</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="https://dccnita.in/">
            <NavLink>DCC</NavLink>
          </Link>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
