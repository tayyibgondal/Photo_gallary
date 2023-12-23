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

  // Assuming your API endpoint is at http://localhost:5000/login
  const apiUrl = "http://localhost:5000/login";

  // Assuming you are sending data in JSON format
  const requestData = {
    username: username,
    password: password,
  };

  fetch(apiUrl, {
    method: "POST", // You might want to use 'GET' or 'POST' based on your server implementation
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
        setLoginStatus(true);
        navigator("/gallery");
      } else {
        setError("Invalid username or password");
      }
    })
    .catch((error) => {
      // Handle errors that occurred during the fetch
      console.error("Error during fetch:", error);
      setError("An error occurred. Please try again later.");
    });
}


  return (
    <div className="login">
      <h2>Login</h2>
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
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
