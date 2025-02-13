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
// Import modals
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";
import useModal from "../hooks/useModal";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const signInModal = useModal();
  const signUpModal = useModal();

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
      <Nav.Link className={styles.NavLink} onClick={signInModal.openModal}>
        Sign In
      </Nav.Link>
      <Nav.Link className={styles.NavLink} onClick={signUpModal.openModal}>
        Sign Up
      </Nav.Link>
    </>
  );

  return (
    <>
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

      {/* Sign In & Sign Up Modals */}
      <SignInForm
        show={signInModal.show}
        handleClose={signInModal.closeModal}
      />
      <SignUpForm
        show={signUpModal.show}
        handleClose={signUpModal.closeModal}
      />
    </>
  );
};

export default NavBar;
