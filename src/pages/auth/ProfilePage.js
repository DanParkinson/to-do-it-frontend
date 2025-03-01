import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import useFetchProfile from "../../hooks/useFetchProfile";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useRedirect } from "../../hooks/useRedirect";

import styles from "../../styles/pages/ProfilePage.module.css";
import btnStyles from "../../styles/general/Button.module.css";

const ProfilePage = () => {
  useRedirect("loggedOut");
  const { id } = useParams();
  const history = useHistory();
  const { profile, hasLoaded } = useFetchProfile(id);

  if (!hasLoaded)
    return <LoadingIndicator spinner message="Loading profile..." />;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <Container fluid className={styles.ProfileContainer}>
      <Row className={styles.ProfileHeader}>
        <Col xs={12} className={styles.InfoCol}>
          <h1 className={styles.Username}>{profile.owner || "Unnamed User"}</h1>
          <p className={styles.Joined}>
            Joined: {new Date(profile.created_at).toLocaleDateString()}
          </p>
          <Button
            className={btnStyles.PrimaryButton}
            onClick={() => history.push("/change-password")}
          >
            Change Password
          </Button>
          <Button
            className={btnStyles.DeleteAccountButton}
            onClick={() => history.push("/delete-account")}
          >
            Delete Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
