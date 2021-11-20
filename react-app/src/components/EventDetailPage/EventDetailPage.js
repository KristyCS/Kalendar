import "./EventDetailPage.css";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import EditEventForm from "../EditEventForm/EditEventForm";
import { dayjs, dayName, monthName } from "../../utils";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const EventDetailPage = ({ setShowEventDetailModal, event }) => {
  const [startTimeUtc, setStartTimeUtc] = useState(dayjs(event.start_at).utc());
  const [endTimeUtc, setEndTimeUtc] = useState(dayjs(event.end_at).utc());
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [startHour, setStartHour] = useState(
    startTimeUtc.hour() >= 10 ? startTimeUtc.hour() : "0" + startTimeUtc.hour()
  );
  const [startMin, setStartMin] = useState(
    startTimeUtc.minute() >= 10
      ? startTimeUtc.minute()
      : "0" + startTimeUtc.minute()
  );
  const [endHour, setEndHour] = useState(
    endTimeUtc.hour() >= 10 ? endTimeUtc.hour() : "0" + endTimeUtc.hour()
  );
  const [endMin, setEndMin] = useState(
    endTimeUtc.minute() >= 10 ? endTimeUtc.minute() : "0" + endTimeUtc.minute()
  );

  return (
    <div className="event-container">
      <p className="theme">
        {event.theme}
        {event.host.id === user.id && (
          <GrEdit
            onClick={() => {
              setShowEditEventModal(true);
              // setShowEventDetailModal(true);
            }}
          />
        )}
        {showEditEventModal && (
          <Modal onClose={()=>setShowEditEventModal(false)}>
            <EditEventForm
              setShowEditEventModal={setShowEditEventModal}
              event={event}
            />
          </Modal>
        )}
      </p>
      <p className="date">
        {dayName[startTimeUtc.day()] +
          "," +
          monthName[startTimeUtc.month()] +
          " " +
          startTimeUtc.date()}
      </p>
      <p className="time">
        {startHour + ":" + startMin + " - " + endHour + ":" + endMin}
      </p>
      <p className="city">{event.city}</p>
      <p className="state">{event.state}</p>
      <p className="host">{event.host.username}</p>
      <p className="description">{event.description}</p>
    </div>
  );
};

export default EventDetailPage;
