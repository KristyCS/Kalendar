import React from "react";
import "./MyRsvpsList.css";
import { useSelector } from "react-redux";
import SingleRsvp from "../SingleRsvp/SingleRsvp";
export default function MyRsvpsList() {
  const myRsvps = useSelector((state) => state.session.user.rsvps);
  return (
    
      <div className="my-rsvp-list-container">
        <div className="back">back to My Calendar</div>
        {myRsvps.map((rsvp, idx) => (
          <SingleRsvp key={idx} rsvp={rsvp} />
        ))}
      </div>
    
  );
}
