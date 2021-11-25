import React from "react";
import "./MyRsvpsList.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleRsvp from "../SingleRsvp/SingleRsvp";
export default function MyRsvpsList() {
  const myRsvps = useSelector((state) => state.session.user.rsvps);
  return (
    
      <div className="my-rsvp-list-container">
        <NavLink to="/" className="back">back to My Calendar</NavLink>
        {myRsvps.map((rsvp, idx) => (
          <SingleRsvp key={idx} rsvp={rsvp} />
        ))}
        { !myRsvps.length && (<div>You have no rsvp now.</div>)}
      </div>
    
  );
}
