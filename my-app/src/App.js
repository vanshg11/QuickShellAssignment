import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        ); // Replace with your API endpoint
        const data = await response.json();
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="controls">
        <div className="dropdown">
          {/* <label>Grouping:</label> */}
          {/* <select> */}
          {/* <option>Status</option> */}
          {/* Add other grouping options if needed */}
          {/* </select> */}
        </div>
        <div className="dropdown">
          {/* <label>Ordering:</label> */}
          {/* <select> */}
          {/* <option>Priority</option> */}
          {/* Add other ordering options if needed */}
          {/* </select> */}
        </div>
      </div>
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
}

export default App;
