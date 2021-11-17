import "./EventDetailPage.css";
import "react-datetime/css/react-datetime.css";
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const EventDetailPage = ({ event }) => {
  return (
    <div className="event-container">
      <p className="theme">{event.theme} </p>
      <p className="start-date">{`${dayjs(dayjs(event.start_at).utc(),"MM/DD/YYYY")}`}</p>
      <p className="start-time"></p>
      <p className="end-date"></p>
      <p className="end-time"></p>
      <p className="city">{event.city}</p>
      <p className="state">{event.state}</p>
      <p className="description">{event.description}</p>
    </div>
  );
};

export default EventDetailPage;
