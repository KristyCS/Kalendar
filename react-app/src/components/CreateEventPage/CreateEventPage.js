import "./CreateEventPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
  const [users, setUsers] = useState([]);
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
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  const options = [];
  for (const u of users) {
    if (u.id !== user.id) {
      options.push({ value: u.id, label: u.username });
    }
  }
  const createEventHandler = async (e) => {
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
    const data = await dispatch(createEvent(newEvent));
    if (data) {
      setErrors(data);
    } else {
      setShowCreateEventModal(false);
    }
  };
  return (
    <div className="create-event-container">
      <form className="create-event-form" onSubmit={createEventHandler}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <table >
          <tbody >
            <tr className="create-tr">
              <td className="create-column">Event theme:</td>
              <td>
                <input
                  className="theme"
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
                <Select onChange={setLabel} options={labelOptions} />
              </td>
            </tr>
            <tr className="create-tr">
              <td className="create-column">Start date:</td>
              <td>
                <DatePicker
                  dateFormat="MM/dd/yy"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setCurrentDate(dayjs(date));
                  }}
                />
              </td>
            </tr>
            <tr className="create-tr"> 
              <td className="create-column">End date:</td>
              <td>
                <DatePicker
                  dateFormat="MM/dd/yy"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                />
              </td>
            </tr>
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
                <Select isMulti onChange={setParticipants} options={options} />
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
