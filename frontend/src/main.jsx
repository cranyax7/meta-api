// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initFacebookSDK } from './utils/facebook';
import './index.css';

// Load the Facebook SDK script dynamically
const loadFacebookSDK = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

// Initialize the SDK and render the app
const initializeApp = async () => {
  await loadFacebookSDK();
  initFacebookSDK();

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initializeApp();