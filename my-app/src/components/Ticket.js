import React from "react";
import "./Ticket.css";

const Ticket = ({ ticket, user }) => {
  return (
    <div className="ticket">
      <h3 className="hibuddy">{ticket.id}</h3>
      <h3>{ticket.title}</h3>
      <div className="tags">
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {/* <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      {user && <p>Assigned to: {user.name}</p>} */}
    </div>
  );
};

export default Ticket;
