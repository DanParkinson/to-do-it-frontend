import React from "react";
import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentUser } from "../context/CurrentUserContext";

import styles from "../styles/components/SideBar.module.css";
import iconStyles from "../styles/general/Icons.module.css";

const SidebarNav = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
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
      {/* Top Section - Main Navigation */}
      <div className={styles.SideBarTop}>
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

          <OverlayTrigger placement="right" overlay={renderTooltip("Tasks")}>
            <ListGroup.Item className={iconStyles.ListGroupItem}>
              <i className="fa-solid fa-list"></i>
            </ListGroup.Item>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={renderTooltip("New Task")}>
            <ListGroup.Item className={iconStyles.ListGroupItem}>
              <i class="fa-solid fa-square-plus"></i>
            </ListGroup.Item>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            overlay={renderTooltip("New Category")}
          >
            <ListGroup.Item className={iconStyles.ListGroupItem}>
              <i class="fa-regular fa-square-plus"></i>
            </ListGroup.Item>
          </OverlayTrigger>
        </ListGroup>
      </div>

      {/* Bottom Section - Profile & Sign Out */}
      <div className={styles.NavBottom}>
        <ListGroup>
          <OverlayTrigger
            placement="right"
            overlay={renderTooltip(`${currentUser?.username}'s Profile`)}
          >
            <ListGroup.Item className={iconStyles.ListGroupItem}>
              <i className="fa-solid fa-user"></i>
            </ListGroup.Item>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={renderTooltip("Sign Out")}>
            <ListGroup.Item
              className={iconStyles.ListGroupItem}
              onClick={handleSignOut}
            >
              <i className="fa-regular fa-circle-left"></i>
            </ListGroup.Item>
          </OverlayTrigger>
        </ListGroup>
      </div>
    </>
  );
};

export default SidebarNav;
