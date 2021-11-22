import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
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
  const {showLeftNavigationBar, setShowLeftNavigationBar} =useLeftNavigationBarContext()
  const [myEvents, setMyEvents] = useState([]);
  const [eventsInThisPeriod, setEventInThisPeriod] = useState([]);
  const dispatch = useDispatch();
  const { rsvpChange, setRsvpChange } = useRsvpChangeContext();
  const { currentDate, setCurrentDate } = useCurrentDateContext();
  const [showMyRsvps, setShowMyRsvps] = useState(false);
  const [hideSideBar,setHideSideBar] = useState(showLeftNavigationBar);
  useEffect(async () => {
    await dispatch(getEventsByUserId(user.id));
    await dispatch(getAllEvents());
  }, [dispatch]);

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
    <div className="home-page-container">
      {!hideSideBar && (
        <div className="left-nav-container">
          <CreateEventButton />
          <div className="switch-month">
            <div className="mini-board-month">
              {monthName[currentDate.month()]}
              {currentDate.year()}
            </div>
            <div className="mini-board-arrow">
              <MdArrowBackIos
                onClick={() =>
                  setCurrentDate(dayjs(currentDate).subtract(1, "month"))
                }
              />
              <MdArrowForwardIos
                onClick={() =>
                  setCurrentDate(dayjs(currentDate).add(1, "month"))
                }
              />
            </div>
          </div>
          <MiniMonthBoard />
          <MyCalendars />
          <div
            className="my-rsvps-button"
            onClick={() => setShowMyRsvps(!showMyRsvps)}
          >
            My rsvps
          </div>
        </div>
      )}
      <div className="main-container">
        {!showMyRsvps && <MonthBoard eventsInThisPeriod={eventsInThisPeriod} />}
        {showMyRsvps && <MyRsvpsList />}
      </div>
    </div>
  );
};

export default HomePage;
