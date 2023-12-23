import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";

function Navbar() {
  const {loginStatus, setLoginStatus} = useContext(LoginContext);
  const navigator = useNavigate();

  // Do this on logout
  function handleLogout() {
    setLoginStatus(false);
    navigator('/');
  }

  let ulContent;
  if (loginStatus) {
    ulContent = (
      <ul className="navbar">
        <Link to="gallary">Gallary</Link>
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
      <h1 className="name">Photo Gallary Application</h1>
      {ulContent}
    </div>
  );
}

export default Navbar;
