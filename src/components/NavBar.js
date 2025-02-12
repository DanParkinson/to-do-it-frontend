import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container>
        {/* Brand */}
        <NavLink to="/">
          <Navbar.Brand className={styles.NavBarBrand}>To-Do-It</Navbar.Brand>
        </NavLink>

        {/* Navigation Links */}
        <Nav className={styles.NavLinks}>
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
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
