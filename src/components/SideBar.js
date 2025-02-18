import React, { useState } from "react";
import { Col, Row, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentUser } from "../context/CurrentUserContext";

import { useCategories } from "../context/CategoryContext";
import CategoryList from "./CategoryList";

import styles from "../styles/components/SideBar.module.css";
import iconStyles from "../styles/general/Icons.module.css";

const SideBar = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  //const setCategories = useSetCategories();
  //const categories = useCategories();
  //const currentUser = useCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      // setCategories([]);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const renderTooltip = (text) => (props) =>
    (
      <Tooltip id="button-tooltip" {...props}>
        {text}
      </Tooltip>
    );

  return (
    <>
      <Row className={styles.SideBarRow}>
        {/* Left Section: Navigation List */}
        <Col lg={2} md={3} sm={12} xs={12} className={styles.SideBarNav}>
          {/* Top Section - Main Navigation */}
          <div className={styles.NavTop}>
            <ListGroup>
              <OverlayTrigger placement="right" overlay={renderTooltip("Home")}>
                <ListGroup.Item className={iconStyles.ListGroupItem}>
                  <i className="fa-solid fa-house"></i>
                </ListGroup.Item>
              </OverlayTrigger>

              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("Categories")}
              >
                <ListGroup.Item className={iconStyles.ListGroupItem}>
                  <i className="fa-solid fa-folder"></i>
                </ListGroup.Item>
              </OverlayTrigger>

              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("Tasks")}
              >
                <ListGroup.Item className={iconStyles.ListGroupItem}>
                  <i className="fa-solid fa-list"></i>
                </ListGroup.Item>
              </OverlayTrigger>
            </ListGroup>
          </div>

          {/* Bottom Section - Profile & Sign Out */}
          <div className={styles.NavBottom}>
            <ListGroup>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("Profile")}
              >
                <ListGroup.Item className={iconStyles.ListGroupItem}>
                  <i className="fa-solid fa-user"></i>
                </ListGroup.Item>
              </OverlayTrigger>

              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("Sign Out")}
              >
                <ListGroup.Item
                  className={iconStyles.ListGroupItem}
                  onClick={handleSignOut}
                >
                  <i className="fa-regular fa-circle-left"></i>
                </ListGroup.Item>
              </OverlayTrigger>
            </ListGroup>
          </div>
        </Col>
        {/* Right Section: Placeholder Content */}
        <Col lg={10} md={9} className={styles.SideBarContent}>
          <h2> Home</h2>
        </Col>
      </Row>
    </>
  );
};

export default SideBar;
