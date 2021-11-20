import React from "react";
import "./EditEventForm.css";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { dayjs } from "../../utils";
import { useCurrentDateContext } from "../../context/CurrentDate";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { editEvent } from "../../store/event";

export default function EditEventForm({ setShowEditEventModal, event }) {
  const user = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState(new Date(event.start_at));
  const [endDate, setEndDate] = useState(new Date(event.end_at));
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState(new Date(event.start_at));
  const [endTime, setEndTime] = useState(new Date(event.end_at));
  const [theme, setTheme] = useState(event.theme);
  const [city, setCity] = useState(event.city);
  const [state, setState] = useState(event.state);
  const [label, setLabel] = useState({ value: event.label, label: event.label });
  const [posterFile, setPosterFile] = useState(null);
  const [description, setDescription] = useState(event.description);
  const [allUsers, setAllUsers] = useState([]);
  const { setCurrentDate } = useCurrentDateContext();
  const [participants, setParticipants] = useState([]);
  const labelOptions = [
    { value: "family", label: "family" },
    { value: "work", label: "work" },
    { value: "other", label: "other" },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setAllUsers(responseData.users);
    }
    fetchData();
    const newParticipants=[]
    for(const rsvp of (event.rsvps)){
        newParticipants.push({ value: rsvp.user.id, label: rsvp.user.username })
    }
    setParticipants(newParticipants)
  }, []);
  const options = [];
  for (const u of allUsers) {
    if (u.id !== user.id) {
      options.push({ value: u.id, label: u.username });
    }
  }
  const editEventHandler = async (e) => {
    e.preventDefault();
    const participantArray = [];
    for (const participant of participants) {
      participantArray.push(participant["value"]);
    }
    const newEvent = {
      host_id: user.id,
      theme,
      description,
      posterFile,
      participants: participantArray,
      city,
      state,
      label: label["value"],
      start_at: "".concat(
        dayjs(startDate).format("MM/DD/YY"),
        " ",
        startTime,
        ":00"
      ),
      end_at: "".concat(dayjs(endDate).format("MM/DD/YY"), " ", endTime, ":00"),
    };
    const data = await dispatch(editEvent(newEvent));
    if (data) {
      setErrors(data);
    } else {
      setShowEditEventModal(false);
    }
  };

  return (
    <div className="edit-event-container">
      <form className="edit-event-form" onSubmit={editEventHandler}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="theme-container">
          <input
            className="theme"
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
            placeholder="Add Theme"
            required
          ></input>
        </div>
        <div className="select-label">
          <Select
            onChange={setLabel}
            value={label}
            options={labelOptions}
          />
        </div>
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
            closeClock={false}
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
            value={endDate}
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
        <div className="participants">
          <Select isMulti value={participants} onChange={setParticipants} options={options} />
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
}
