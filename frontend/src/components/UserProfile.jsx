// frontend/src/components/UserProfile.jsx
import { useEffect, useState } from 'react';

const UserProfile = ({ accessToken }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (accessToken) {
      window.FB.api(
        '/me',
        { fields: 'name,email,picture' },
        (response) => {
          setUser(response);
        }
      );
    }
  }, [accessToken]);

  if (!user) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
      <img src={user.picture.data.url} alt="Profile" className="w-20 h-20 rounded-full mt-2" />
    </div>
  );
};

export default UserProfile;