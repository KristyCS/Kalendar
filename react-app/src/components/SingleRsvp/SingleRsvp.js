import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventDetailPage from "../EventDetailPage/EventDetailPage";
import { useSelector } from "react-redux";
import "./SingleRsvp.css";
import { dayjs } from "../../utils";
import EditRsvpForm from "../EditRsvpForm/EditRsvpForm";
import { GrEdit } from "react-icons/gr";
export default function SingleRsvp({ rsvp }) {
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const event =  JSON.parse(localStorage.getItem("allEvents"))[rsvp.event.id];
  const [showEditRsvpForm, setShowEditRsvpForm] = useState(false);
  return (
    <div className="single-rsvp-container">
      <div className="single-rsvp-info">
        <table>
          <tbody>
            <tr>
              <td className="col-name">Event Theme:</td>
              <td
                className="column-pointer"
                onClick={() => setShowEventDetailModal(true)}
              >
                {event.theme}
              </td>
            </tr>
            {rsvp.status === "no rsp" && (
              <tr onClick={() => setShowEditRsvpForm(true)}>
                {!showEditRsvpForm && <td>Waiting for your reply...</td>}
                {showEditRsvpForm && (
                  <>
                    <td className="col-name short-column">Replied: </td>
                    <td>
                      <EditRsvpForm
                        setShowEditRsvpForm={setShowEditRsvpForm}
                        rsvp={rsvp}
                      />
                    </td>
                  </>
                )}
              </tr>
            )}
            {rsvp.status !== "no rsp" && (
              <>
                <tr>
                  <td className="col-name short-column">Replied: </td>
                  {!showEditRsvpForm && (
                    <td>
                      {rsvp.status}{" "}
                      <GrEdit
                        onClick={() => setShowEditRsvpForm(true)}
                        className="rsvp-icon"
                      />
                    </td>
                  )}
                  {showEditRsvpForm && (
                    <td>
                      <EditRsvpForm
                        setShowEditRsvpForm={setShowEditRsvpForm}
                        rsvp={rsvp}
                      />
                    </td>
                  )}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {showEventDetailModal && (
        <Modal onClose={() => setShowEventDetailModal(false)}>
          <EventDetailPage event={event} />
        </Modal>
      )}
    </div>
  );
}
