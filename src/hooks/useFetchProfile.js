import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Custom hook to fetch a user's profile
 */
const useFetchProfile = (profileId) => {
  const [profile, setProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setHasLoaded(false);
      try {
        const { data } = await axiosReq.get(`/profiles/${profileId}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setHasLoaded(true);
      }
    };

    fetchProfile();
  }, [profileId]);

  return { profile, hasLoaded, setProfile };
};

export default useFetchProfile;
