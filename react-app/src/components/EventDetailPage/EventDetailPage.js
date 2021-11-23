import "./EventDetailPage.css";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import MapContainer from "../Maps";
import EditEventForm from "../EditEventForm/EditEventForm";
import { dayjs, dayName, monthName } from "../../utils";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const EventDetailPage = ({
  setShowEventDetailModal,
  setShowEditEventModal,
  event,
}) => {
  const [startTimeUtc, setStartTimeUtc] = useState(dayjs(event.start_at).utc());
  const [endTimeUtc, setEndTimeUtc] = useState(dayjs(event.end_at).utc());

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
  const GMapSetting = {
		width: "400px",
		height: "400px",
		lat: 37.0902,
		lng: -95.7129,
		zoom: 10,
	};
  return (
    <div className="event-container">
      <div className="event-info">
        <p className="theme">
          {event.theme}
          {event.host.id === user.id && (
            <GrEdit
              onClick={() => {
                setShowEditEventModal(true);
                setShowEventDetailModal(false);
              }}
            />
          )}
        </p>
        <p className="date-detail">
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
      <div className="map"><MapContainer event={event} GMapSetting={GMapSetting}/></div>
    </div>
  );
};

export default EventDetailPage;
