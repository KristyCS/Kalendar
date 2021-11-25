import "./EventDetailPage.css";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MapContainer from "../Maps";
import { deleteEvent } from "../../store/event";
import { dayjs, dayName, monthName } from "../../utils";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const EventDetailPage = ({
  setShowEventDetailModal,
  setShowEditEventModal,
  event,
}) => {
  const dispatch = useDispatch();
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
  const deleteEventHandler = () => {
    dispatch(deleteEvent(event.id));
    setShowEventDetailModal(false);
  };
  return (
    <div className="event-container">
      <div className="event-info">
        <div className="theme-container">
          <p>Theme: </p>
          <p>
            {event.theme}
            {"   "}
            {event.host.id === user.id && (
              <>
                <GrEdit
                  className="detailIcon"
                  onClick={() => {
                    setShowEditEventModal(true);
                    setShowEventDetailModal(false);
                  }}
                />
                <RiDeleteBin5Line
                  className="detailIcon"
                  onClick={deleteEventHandler}
                />
              </>
            )}
          </p>
        </div>
        <div className="detail-container">
          <p className="detail">On:</p>
          <p className="date-detail">
            {dayName[startTimeUtc.day()] +
              "," +
              monthName[startTimeUtc.month()] +
              " " +
              startTimeUtc.date()}
          </p>
        </div>
        <div className="detail-container">
          <p className="detail">From</p>
          {startHour + ":" + startMin}
          <p className="detail">To</p>
          {endHour + ":" + endMin}
        </div>
        <div className="detail-container">
          <p className="detail">City: </p>
          <p>{event.city}</p>
        </div>
        <div className="detail-container">
          <p className="detail">State: </p>
          <p>{event.state}</p>
        </div>
        <div className="detail-container">
          <p className="detail">Hosted by: </p>
          <p className="">{event.host.username}</p>
        </div>
        {event.rsvps && (
          <div className="detail-container">
            <p className="detail">Participants: </p>
            {event.rsvps.map((rsvp,idx)=><p key={idx}>{rsvp.user.username}</p>)}
          </div>
        )}
        {event.description && (
          <div className="description-container">
            <p className="detail">Description: </p>
            {event.description}
          </div>
        )}
      </div>
      <div className="map">
        <MapContainer event={event} GMapSetting={GMapSetting} />
      </div>
    </div>
  );
};

export default EventDetailPage;
