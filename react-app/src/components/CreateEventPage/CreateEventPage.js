import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { useCurrentDateContext } from "../../context/CurrentDate";
const dayjs = require("dayjs");
const CreateEventPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [theme, setTheme] = useState("");
  const { setCurrentDate } = useCurrentDateContext();
  return (
    <div className="create-event-container">
      <form>
        <input
          className="theme"
          onChange={(e) => {
            setTheme(e.target.value);
          }}
          placeholder="Add Theme"
          required
        ></input>
        <div className="start-end-date">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setEndDate(date);
              setCurrentDate(dayjs(date));
            }}
          />
        </div>
        <div className="start-time">
          <TimePicker
            selected={startTime}
            onChange={(time) => {
              setStartTime(time);
            }}
          />
        </div>
        <div className="end-time">
          <TimePicker
            selected={endTime}
            onChange={(time) => {
              setEndTime(time);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
