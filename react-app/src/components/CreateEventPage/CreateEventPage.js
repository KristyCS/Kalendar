import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datetime/css/react-datetime.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createEvent } from "../../store/event";
import { useCurrentDateContext } from "../../context/CurrentDate";
const dayjs = require("dayjs");
const CreateEventPage = () => {
  const user = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [theme, setTheme] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const { setCurrentDate } = useCurrentDateContext();
  const dispatch = useDispatch();

  const createEventHandler = async (e) => {
    e.preventDefault();
    const newEvent = {
      host_id: user.id,
      theme,
      description,
      poster,
      city,
      state,
      lat: 100.0,
      lng: 100.0,
      start_at: dayjs().format('MM/DD/YY HH:mm:ss'),
      end_at: dayjs().format('MM/DD/YY HH:mm:ss'),
    };
    // console.log(newEvent,"%%%")
    const data = await dispatch(createEvent(newEvent));
    if (data) {
      setErrors(data);
    }
  };
  return (
    <div className="create-event-container">
      <form onSubmit={createEventHandler}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
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
        <div className="city">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="city"
            required
          />
        </div>
        <div className="state">
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="state"
            required
          />
        </div>
        <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            row={15}
            column={20}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
