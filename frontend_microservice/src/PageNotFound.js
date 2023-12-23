import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found!</h1>
      <Link to="/logs">Go back</Link>
    </div>
  );
}

export default PageNotFound;
