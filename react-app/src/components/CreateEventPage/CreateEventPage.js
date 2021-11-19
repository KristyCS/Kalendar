import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createEvent } from "../../store/event";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { dayjs } from "../../utils";
const CreateEventPage = ({ setShowCreateEventModal }) => {
  const user = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState("8:00");
  const [endTime, setEndTime] = useState("8:30");
  const [theme, setTheme] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [label, setLabel] = useState("family");
  const [posterFile, setPosterFile] = useState(null);
  const [description, setDescription] = useState("");
  const { setCurrentDate } = useCurrentDateContext();
  const labelOptions = [
    { value: "family", label: "family" },
    { value: "work", label: "work" },
    { value: "other", label: "other" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
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
      label:label["value"],
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
      setShowCreateEventModal(false);
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
        <Select
          styles={customStyles}
          onChange={setLabel}
          options={labelOptions}
        />
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
            value={startTime}
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
            value={endTime}
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
