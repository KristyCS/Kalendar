import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
import { IoChevronForward } from "react-icons/io5";
import MyCalendars from "../MyCalendars/MyCalendars";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import { useLeftNavigationBarContext } from "../../context/LeftNavigationBar";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { getEventsByUserId, getAllEvents } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getEventsInThisPeriod, dayjs } from "../../utils";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { monthName } from "../../utils";
import { useRsvpChangeContext } from "../../context/rsvpUpdate";
import MyRsvpsList from "../MyRsvpsList/MyRsvpsList";
const HomePage = () => {
  const user = useSelector((state) => state.session.user);
  const eventsHostedByMe = useSelector((state) => state.event.eventsHostedByMe);
  const allEvents = useSelector((state) => state.event.allEvents);
  const [leftStyle, setLeftStyle] = useState("left-nav-container");
  const [homeStyle, setHomeStyle] = useState("home-page-container");
  const { showLeftNavigationBar, setShowLeftNavigationBar } =
    useLeftNavigationBarContext();
  const [hideSide, setHideSide] = useState(localStorage.getItem("hideNav"));
  const [myEvents, setMyEvents] = useState([]);
  const [eventsInThisPeriod, setEventInThisPeriod] = useState([]);
  const dispatch = useDispatch();
  const { rsvpChange, setRsvpChange } = useRsvpChangeContext();
  const { currentDate, setCurrentDate } = useCurrentDateContext();
  const [showMyRsvps, setShowMyRsvps] = useState(false);
  useEffect(async () => {
    await dispatch(getEventsByUserId(user.id));
    await dispatch(getAllEvents());
    const a = localStorage.getItem("hideNav")
    console.log(a)
    setHideSide(a);
    if(a==="true"){
      setHomeStyle("home-page-container-no-show")
      setLeftStyle("left-nav-container-no-show")
      console.log("noshow")
    }
    else{
      setHomeStyle("home-page-container")
      setLeftStyle("left-nav-container")
      console.log("show")
    }
  }, [dispatch, showLeftNavigationBar]);

  useEffect(() => {
    setEventInThisPeriod(getEventsInThisPeriod(myEvents, currentDate.utc()));
  }, [myEvents, currentDate]);
  useEffect(() => {
    let newMyEvents = [];
    if (eventsHostedByMe) {
      newMyEvents = Object.values(eventsHostedByMe);
    }
    if (user.rsvps) {
      for (const [key, rsvp] of Object.entries(user.rsvps)) {
        if (rsvp.status === "yes") {
          if (allEvents) {
            newMyEvents.push(allEvents[parseInt(rsvp.event.id)]);
          }
        }
      }
    }
    setMyEvents(newMyEvents);
  }, [allEvents, rsvpChange, eventsHostedByMe]);
  return (
    <div className={homeStyle}>
      <div className={leftStyle}>
        <CreateEventButton />
        <div className="">
          <div className="switch-month">
            <div className="mini-board-month">
              {monthName[currentDate.month()]}
              {currentDate.year()}
            </div>
            <div className="mini-board-arrow">
              <MdArrowBackIos
                className="arrow"
                onClick={() =>
                  setCurrentDate(dayjs(currentDate).subtract(1, "month"))
                }
              />
              <MdArrowForwardIos
                className="arrow"
                onClick={() =>
                  setCurrentDate(dayjs(currentDate).add(1, "month"))
                }
              />
            </div>
          </div>
          <MiniMonthBoard />
        </div>
        <MyCalendars />
        <div
          className="my-rsvps-button"
          onClick={() => setShowMyRsvps(!showMyRsvps)}
        >
          My RSVPs
          <IoChevronForward />
        </div>
      </div>

      <div className="main-container">
        {!showMyRsvps && <MonthBoard eventsInThisPeriod={eventsInThisPeriod} />}
        {showMyRsvps && <MyRsvpsList />}
      </div>
    </div>
  );
};

export default HomePage;
