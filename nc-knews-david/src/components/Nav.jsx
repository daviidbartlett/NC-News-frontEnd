import React from "react";
import { Menu, MenuList, MenuButton, MenuLink } from "@reach/menu-button";
import { Link } from "@reach/router";
import "@reach/menu-button/styles.css";
import Login from "./Login";

const Nav = ({ topics }) => {
  return (
    <>
      <Link to="/">Home</Link>
      <Menu>
        <MenuButton>
          Topics <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList>
          {topics.map((topic) => (
            <MenuLink to={topic.slug} key={topic.slug}>
              {topic.slug}
            </MenuLink>
          ))}
        </MenuList>
      </Menu>
      <Login />
    </>
  );
};

export default Nav;
