import useFacebook from "../../hooks/useFacebook";

const FacebookLogin = () => {
  const { user, handleLogin } = useFacebook();

  return (
    <div>
      {user ? (
        <div>
          <img src={user.picture} alt={user.name} width="50" />
          <p>Welcome, {user.name}!</p>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-blue-600 p-3 rounded text-white text-2xl">Login with Facebook</button>
      )}
    </div>
  );
};

export default FacebookLogin;