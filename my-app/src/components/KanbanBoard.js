import React, { useState } from "react";
import Ticket from "./Ticket";
import "./KanbanBoard.css";

const KanbanBoard = ({ tickets, users }) => {
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("group");
  const [priorityOrderVisible, setPriorityOrderVisible] = useState(false);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    if (e.target.value === "priority") {
      setPriorityOrderVisible(true);
    } else {
      setPriorityOrderVisible(false);
    }
  };

  const groupedTickets = () => {
    if (grouping === "status") {
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    } else if (grouping === "user") {
      return tickets.reduce((acc, ticket) => {
        const user =
          users.find((u) => u.id === ticket.userId)?.name || "Unassigned";
        (acc[user] = acc[user] || []).push(ticket);
        return acc;
      }, {});
    }
    return {};
  };

  const ticketsGrouped = groupedTickets();

  const priorityOrder = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const sortTicketsByPriority = () => {
    return tickets.reduce((acc, ticket) => {
      const priorityKey = priorityOrder[ticket.priority];
      (acc[priorityKey] = acc[priorityKey] || []).push(ticket);
      return acc;
    }, {});
  };

  return (
    <div className="kanban-board">
      <div className="controls">
        <div className="display-label">
          <label>Display:</label>
          <div className="dropdown-group">
            <label>Ordering by Priority:</label>
            <select value={ordering} onChange={handleOrderingChange}>
              <option value="group">Group</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-group">
            <label>Grouping:</label>
            <select value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>
      <div className="columns">
        {priorityOrderVisible
          ? Object.keys(priorityOrder).map((key) => (
              <div key={priorityOrder[key]} className="column">
                <h2>{priorityOrder[key]}</h2>
                {sortTicketsByPriority()[priorityOrder[key]]?.map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    user={users.find((u) => u.id === ticket.userId)}
                  />
                ))}
              </div>
            ))
          : Object.keys(ticketsGrouped).map((group) => (
              <div key={group} className="column">
                <h2>{group}</h2>
                {ticketsGrouped[group].map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    user={users.find((u) => u.id === ticket.userId)}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
