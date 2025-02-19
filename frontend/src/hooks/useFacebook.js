import { useState, useEffect } from "react";

const useFacebook = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = "http://localhost:5000/api/auth/facebook";
  };

  useEffect(() => {
    // Check for user data in the URL after redirect from backend
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const picture = urlParams.get("picture");

    if (name && picture) {
      setUser({ name, picture });
      // Clear the URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return { user, handleLogin };
};

export default useFacebook;