import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";

function Navbar() {
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const navigator = useNavigate();

  // Do this on logout
  function handleLogout() {
    // Send request to backend
    const authApiUrl = process.env.REACT_APP_AUTH_SERVICE + "/logout";
    const authToken = localStorage.getItem("authToken");

    fetch(authApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        // Handle errors that occurred during the fetch
        console.error("Error during fetch:", error);
      });

    // Work to be done on frontend
    setLoginStatus(false);
    // Removing a value from Local Storage
    localStorage.clear();
    navigator("/");
  }

  let ulContent;
  if (localStorage.getItem("authToken")) {
    ulContent = (
      <ul className="navbar">
        <Link to="gallery">Gallery</Link>
        <Link to="myPhotos">My Photos</Link>
        <Link to="logs">View Logs</Link>
        <Link to="upload">Upload Image</Link>
        <Link to="" onClick={handleLogout}>
          Log out
        </Link>
      </ul>
    );
  } else {
    ulContent = (
      <ul>
        <Link to="signUp">Sign Up</Link>
        <Link to="/">Login</Link>
      </ul>
    );
  }

  return (
    <div className="navbar">
      <h1 className="name">Project Photon</h1>
      {ulContent}
    </div>
  );
}

export default Navbar;
