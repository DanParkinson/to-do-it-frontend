// React Imports
import React from "react";
// Bootstrap
import { Navbar, Nav, Container } from "react-bootstrap";
// Styles
import styles from "../styles/NavBar.module.css";
// Rouuting
import { NavLink } from "react-router-dom";
// Hooks
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("NavBar - Current User:", currentUser); //debugging
  const LoggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks/create"
      >
        Add post
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        {currentUser?.username}
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        Sign Out
      </NavLink>
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
      <Container fluid>
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
