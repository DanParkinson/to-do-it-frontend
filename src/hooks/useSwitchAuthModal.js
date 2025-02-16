// Functionality for closing one modal and opening another. not working

import { useState } from "react";

const useSwitchAuthModal = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const openSignIn = () => {
    setShowSignUp(false); // Close Sign Up first
    setTimeout(() => setShowSignIn(true), 500); // Small delay to avoid race condition
  };

  const openSignUp = () => {
    setShowSignIn(false); // Close Sign In if open
    setShowSignUp(true);
  };

  const closeAll = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return {
    showSignIn,
    showSignUp,
    openSignIn,
    openSignUp,
    closeAll,
  };
};

export default useSwitchAuthModal;
