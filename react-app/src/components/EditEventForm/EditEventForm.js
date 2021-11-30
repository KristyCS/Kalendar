import React from "react";
import "./EditEventForm.css";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { dayjs, minutesFormat } from "../../utils";
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
  const [label, setLabel] = useState({
    value: event.label,
    label: event.label,
  });
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
    setStartDate(new Date(startDate.getTime() + 5 * 60 * 60000));
    setStartTime(
      new Date(startDate.getTime() + 5 * 60 * 60000).getHours().toString() +
        ":" +
        minutesFormat(
          new Date(startDate.getTime() + 5 * 60 * 60000).getMinutes()
        )
    );
    setEndDate(new Date(endDate.getTime() + 5 * 60 * 60000));
    setEndTime(
      new Date(endDate.getTime() + 5 * 60 * 60000).getHours().toString() +
        ":" +
        minutesFormat(new Date(endDate.getTime() + 5 * 60 * 60000).getMinutes())
    );
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setAllUsers(responseData.users);
    }
    fetchData();
    const newParticipants = [];
    for (const rsvp of event.rsvps) {
      newParticipants.push({ value: rsvp.user.id, label: rsvp.user.username });
    }
    setParticipants(newParticipants);
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
      id: event.id,
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
      end_at: "".concat(dayjs(startDate).format("MM/DD/YY"), " ", endTime, ":00"),
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
        <table>
          <tbody>
            <tr className="create-tr">
              <td className="create-column">Event theme:</td>
              <td>
                <input
                  className="theme"
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                  }}
                  placeholder="Add Theme"
                  required
                ></input>
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">Event label:</td>
              <td>
                <Select
                  onChange={setLabel}
                  value={label}
                  options={labelOptions}
                />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">Date:</td>
              <td>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setCurrentDate(dayjs(date));
                  }}
                />
              </td>
            </tr>
            {/* <tr className="create-tr">
              <td className="create-column">End date:</td>
              <td>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                />
              </td>
            </tr> */}
            <tr className="create-tr">
              <td className="create-column">Start time:</td>
              <td>
                <TimePicker
                  closeClock={false}
                  selected={startTime}
                  value={startTime}
                  onChange={(value) => {
                    setStartTime(value);
                  }}
                />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">End time:</td>
              <td>
                <TimePicker
                  selected={endTime}
                  value={endTime}
                  onChange={(time) => {
                    setEndTime(time);
                  }}
                />
              </td>
            </tr>

            <tr className="create-tr">
              <td className="create-column">Participants:</td>
              <td>
                <Select
                  isMulti
                  onChange={setParticipants}
                  options={options}
                  value={participants}
                />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">City:</td>
              <td>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="city"
                  required
                />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">State:</td>
              <td>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="state"
                  required
                />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">Description:</td>
              <td>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                  row={15}
                  column={20}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
