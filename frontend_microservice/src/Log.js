function Log() {
  // While iterating the logs array of objects in jsx, 
  // we need to have each object to have a unique id.

  // Fetch data for logs
  const logs = [{
    id: 1,
    type: "Image upload",
    time: "January 10, 2023 8:30 pm",
    details:
      "One year after the torrential rains of Hurricane Ida drowned 11 people in their homes in New York City, lawmakers and housing advocates are urging the city to speed efforts to make basement apartments safer from severe flooding.",
  }];

  // Show logs
  return (
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
  );
}

export default Log;
