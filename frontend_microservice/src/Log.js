import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Log() {
  // While iterating the logs array of objects in jsx, 
  // we need to have each object to have a unique id.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();

  // Fetch data for logs
  const logs = [{
    id: 1,
    type: "Image upload",
    time: "January 10, 2023 8:30 pm",
    details:
      "One year after the torrential rains of Hurricane Ida drowned 11 people in their homes in New York City, lawmakers and housing advocates are urging the city to speed efforts to make basement apartments safer from severe flooding.",
  }];

  useEffect(() => {
    const apiUrl = "http://localhost:4000/validate_token";
    const authToken = localStorage.getItem("authToken");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        return response.json(); // Assuming the server returns JSON
      })
      .then((data) => {
        if (data.userId) {
          setIsLoggedIn(true);
        } else {
          navigator("/unauthorized");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }, []);

  // Show logs
  return (
    <div>
      {isLoggedIn && (
        <div className="logs">
          <h2>Logs</h2>
          {logs.map((log) => (
            <div key={log.id}>
              <h3 className="type">{log.type}</h3>
              <p>
                Time: <b>{log.time}</b>
              </p>
              <h4>Details</h4>
              <p>{log.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Log;
