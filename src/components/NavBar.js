// React Imports
import React from "react";

// Bootstrap
import { Navbar, Nav, Container } from "react-bootstrap";

// Styles
import styles from "../styles/NavBar.module.css";

// Rouuting
import { NavLink } from "react-router-dom";

// Hooks for authentication and modal handling
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import useModal from "../hooks/useModal";
import useSwitchAuthModal from "../hooks/useSwitchAuthModal";

// API
import axios from "axios";

// Import authentication modals
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";

const NavBar = () => {
  // Get current user and setter function from context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Modal hooks for authentication popups
  const signInModal = useModal();
  const signUpModal = useModal();
  const authModal = useSwitchAuthModal();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Navigation links for logged-in users.
  const LoggedInIcons = (
    <>
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

  // Navigation links for logged-out users.
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
        openSignUp={authModal.openSignUp}
      />
      <SignUpForm
        show={signUpModal.show}
        handleClose={signUpModal.closeModal}
        openSignIn={authModal.openSignIn}
      />
    </>
  );
};

export default NavBar;
