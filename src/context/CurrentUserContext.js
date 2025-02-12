import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      console.log("API Response - user data:", data);
      setCurrentUser(data);
    } catch (err) {
      console.log("API ERROR:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    console.log("CurrentUserProvider - currentUser updated:", currentUser); // ✅ Debug log
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
