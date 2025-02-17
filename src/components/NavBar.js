import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import { useSetCategories } from "../context/CategoryContext";

import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

import useModal from "../hooks/useModal";
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";

// Navbar that shows state of of logged in user
// updates categories in sidebar upon authentication switch
// Authentication forms loaded in modals

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const setCategories = useSetCategories();
  const signInModal = useModal();
  const signUpModal = useModal();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setCategories([]);
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
      />
      <SignUpForm
        show={signUpModal.show}
        handleClose={signUpModal.closeModal}
      />
    </>
  );
};

export default NavBar;
