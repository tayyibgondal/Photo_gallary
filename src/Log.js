import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Log() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authApiUrl =
          process.env.REACT_APP_AUTH_SERVICE + "/validate_token";
        const authToken = localStorage.getItem("authToken");

        const responseToken = await fetch(authApiUrl, {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        });

        if (!responseToken.ok) {
          throw new Error("Failed to validate token");
        }

        const dataToken = await responseToken.json();

        if (dataToken.userId) {
          setIsLoggedIn(true);

          const logsUrl =
            process.env.REACT_APP_LOG_SERVICE + "/logs/" + dataToken.userId;
          const responseLogs = await fetch(logsUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!responseLogs.ok) {
            throw new Error("Failed to fetch logs");
          }

          const logsData = await responseLogs.json();
          setLogs(logsData);
        } else {
          navigator("/unauthorized");
        }
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    };

    fetchData();
  }, [navigator]);

  return (
    <div>
      {isLoggedIn && logs && (
        <div className="logs">
          <h2>Logs</h2>
          {logs.map((log) => (
            <div key={log._id}>
              <h3 className="type">{log.transactionType}</h3>
              <p>
                Time: <b>{log.createdAt}</b>
              </p>
              <p>
                File size: <b>{log.fileSize / 1000} KB</b>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Log;
