import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Create context for current user state
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to access the current user and setter function
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  /**
   * Fetch the currently authenticated user on component mount.
   * If the user is logged in, set them in state; otherwise, catch errors.
   */

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log("API ERROR:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Axios Interceptors:
   * - Request Interceptor: Refreshes token before making an API request.
   * - Response Interceptor: Handles 401 errors by attempting token refresh.
   */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      // Before every request, this function runs.
      async (config) => {
        try {
          // Attempt to refresh the authentication token before making the request.
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          // If token refresh fails, log out the user.
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              // Redirect to sign-in page only if a user was logged in.
              history.push("/signin");
            }
            return null; // Clear user state (log out).
          });
          return config; // Continue with the original request, even if refresh failed.
        }
        return config; // Return the modified request configuration
      },
      // If there is an error during the request setup, reject the promise.
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      // Successful response: Just return the response as is.
      (response) => response,

      // Error response: Handle 401 Unauthorized errors.
      async (err) => {
        if (err.response?.status === 401) {
          try {
            // Attempt to refresh the authentication token.
            await axios.post("/dj-rest-auth/token/refresh");
          } catch (err) {
            // If token refresh fails, log the user out.
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                // Redirect to sign-in page only if a user was logged in.
                history.push("/signin");
              }
              return null; // Clear user state (log out).
            });
          }
          // Retry the failed request with the new token
          return axios(err.config);
        }
        // If error is not a 401, reject the promise and handle it elsewhere.
        return Promise.reject(err);
      }
    );
  }, [history]);

  // debugging for login errors
  // useEffect(() => {
  //   console.log("CurrentUserProvider - currentUser updated:", currentUser); // Debug log
  // }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
