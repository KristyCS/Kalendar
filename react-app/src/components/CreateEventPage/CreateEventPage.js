import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
// import 'rc-time-picker/assets/index.css';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createEvent } from "../../store/event";
import { useCurrentDateContext } from "../../context/CurrentDate";
const dayjs = require("dayjs");
const CreateEventPage = ({ setShowCreateEventModal }) => {
  const user = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [theme, setTheme] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [description, setDescription] = useState("");
  const { setCurrentDate } = useCurrentDateContext();
  const dispatch = useDispatch();

  const createEventHandler = async (e) => {
    e.preventDefault();
    const newEvent = {
      host_id: user.id,
      theme,
      description,
      posterFile,
      city,
      state,
      start_at: "".concat(
        dayjs(startDate).format("MM/DD/YY"),
        " ",
        startTime,
        ":00"
      ),
      end_at: "".concat(dayjs(endDate).format("MM/DD/YY"), " ", endTime, ":00"),
    };
    const data = await dispatch(createEvent(newEvent));
    if (data) {
      setErrors(data);
    } else {
      // setShowCreateEventModal(false);
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
        <div className="start-date">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setCurrentDate(dayjs(date));
            }}
          />
        </div>
        <div className="start-time">
          <TimePicker
            selected={startTime}
            onChange={(value) => {
              setStartTime(value);
            }}
          />
        </div>
        <div className="end-date">
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
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
        <div className="poster">
          <input
            type="file"
            onChange={(e) => {
              setPosterFile(e.target.files[0]);
            }}
            accept="image/*"
            multiple={true}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
