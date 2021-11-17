import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useCurrentDateContext } from "../../context/CurrentDate";
const dayjs = require("dayjs");
const CreateEventPage = () => {
  const [startDate, setStartDate] = useState(new Date());
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
        <div className="date-time">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setCurrentDate(dayjs(date));
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
