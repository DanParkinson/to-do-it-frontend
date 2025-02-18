import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import { useSetCategories } from "../context/CategoryContext";

import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

// Navbar that shows state of of logged in user
// updates categories in sidebar upon authentication switch

const NavBar = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const setCategories = useSetCategories();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setCategories([]);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar className={styles.background}>
        <Container>
          {/* Brand */}
          <NavLink to="/">
            <Navbar.Brand>To-Do-It</Navbar.Brand>
          </NavLink>
          <Nav>
            <NavLink to={`/profiles/${currentUser?.profile_id}`}>
              {currentUser?.username}
            </NavLink>
            <NavLink to="/" onClick={handleSignOut}>
              Sign Out
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
