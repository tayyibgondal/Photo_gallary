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

    const authApiUrl = process.env.REACT_APP_AUTH_SERVICE + "/signup";
    console.log(authApiUrl);

    // Assuming you are sending data in JSON format
    const requestData = {
      username: username,
      password: password,
    };

    fetch(authApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Handle the response here
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the server returns JSON
      })
      .then((data) => {
        // Handle the data received from the server
        // For example, you might check if the login was successful
        if (data.token) {
          // Save the token to localStorage
          localStorage.setItem("authToken", data.token);

          setLoginStatus(true);
          navigator("/gallery");
        }
      })
      .catch((error) => {
        // Handle errors that occurred during the fetch
        setError("An error occurred. Please enter both email and password.");
      });
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
