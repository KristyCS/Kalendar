import React from "react";
import "./EditRsvpForm.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editRsvp } from "../../store/session";
export default function EditRsvpForm({ rsvp, setShowEditRsvpForm }) {
  const [status, setStatus] = useState(rsvp.status);
  const [comment, setComment] = useState(rsvp.comment);
  const dispatch = useDispatch();
  const editRsvpHandler = async (e) => {
    e.preventDefault();
    rsvp.status = status;
    await dispatch(editRsvp({
        id:rsvp.id,
        user_id:rsvp.user.id,
        event_id:rsvp.event.id,
        status:rsvp.status
    }));
    setShowEditRsvpForm(false);
  };

  return (
    <form className="table-edit-rsvp-cell" onSubmit={editRsvpHandler}>
      <div>
        <label>
          <input
            type="radio"
            onChange={() => setStatus("yes")}
            value="yes"
            checked={"yes" === status}
          />
          yes
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="no"
            onChange={() => setStatus("no")}
            checked={"no" === status}
          />
          no
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="maybe"
            onChange={() => setStatus("maybe")}
            checked={"maybe" === status}
          />
          maybe
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
