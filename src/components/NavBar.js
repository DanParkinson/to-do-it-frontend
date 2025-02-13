// React Imports
import React from "react";
// Bootstrap
import { Navbar, Nav, Container } from "react-bootstrap";
// Styles
import styles from "../styles/NavBar.module.css";
// Rouuting
import { NavLink } from "react-router-dom";
// Hooks
import { useCurrentUser } from "../context/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  // console.log("NavBar - Current User:", currentUser); //debugging

  const LoggedInIcons = (
    <>
      <span className={styles.NavLink}>{currentUser?.username}</span>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container>
        {/* Brand */}
        <NavLink to="/">
          <Navbar.Brand className={styles.NavBarBrand}>To-Do-It</Navbar.Brand>
        </NavLink>

        {/* Navigation Links */}
        <Nav className={styles.NavLinks}>
          {currentUser ? LoggedInIcons : loggedOutIcons}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
