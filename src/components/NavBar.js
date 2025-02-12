import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand href="#" className={styles.NavBarBrand}>
          To-Do-It
        </Navbar.Brand>

        {/* Navigation Links */}
        <Nav className={styles.NavLinks}>
          <Nav.Link href="#">Sign In</Nav.Link>
          <Nav.Link href="#">Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
