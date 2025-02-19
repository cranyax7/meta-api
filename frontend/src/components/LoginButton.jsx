// frontend/src/components/LoginButton.jsx
import { useEffect, useState } from 'react';

const LoginButton = ({ onLogin }) => {
  // The SDK must be fully loaded before you can call FB.login()
  const [isSDKReady, setIsSDKReady] = useState(false);

  useEffect(() => {
    // Check if the SDK is initialized
    const checkSDK = () => {
      if (window.FB) {
        setIsSDKReady(true);
      } else {
        // Continuously checks if the Facebook SDK (window.FB) is loaded and ready.
        setTimeout(checkSDK, 100); // Retry after 100ms
      }
    };

    checkSDK();
  }, []);

  const handleLogin = () => {
    if (isSDKReady) {
      // When clicked, it triggers FB.login() to authenticate the user
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            // Pass the access token to the parent component (App.jsx)
            onLogin(response.authResponse);
          } else {
            console.error('Login failed or user denied permissions.');
          }
        },
        { scope: 'public_profile,email,pages_show_list,pages_read_engagement,read_insights' }
      );
    } else {
      console.error('Facebook SDK not initialized yet.');
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={!isSDKReady}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isSDKReady ? "Login with Facebook" : "Loading..."}
    </button>
  );
};

export default LoginButton;