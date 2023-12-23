import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      <h1>You are not authorized to do this!</h1>
      <Link to="/" style={{display:'block'}}>Login</Link>
      <Link to="/signUp">Sign up</Link>
    </div>
  );
}

export default Unauthorized;
