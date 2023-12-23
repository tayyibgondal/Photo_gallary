import { useContext, useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoginStatus, setOnLoginPage } = useContext(LoginContext);
  const navigator = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function redirectToWebsite(e) {
    e.preventDefault();
    // Here you can add logic to validate the username and password
    // For simplicity, let's assume validation is successful for now
    setLoginStatus(true);
    navigator("/gallary");
    // setError("Invalid username or password");
  }

  return (
    <div className="login">
      <h2>Sign up</h2>
      <div>{error}</div>
      <form action="" onSubmit={redirectToWebsite}>
        <div>
          <label htmlFor="username">Enter username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div>

        <div>
          <label htmlFor="password">Enter password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div>
          <button>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
