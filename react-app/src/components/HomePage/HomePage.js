import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { getEventsByUserId } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getEventsInThisMonth } from "../../utils";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);
  const myEvents = useSelector((state) => state.event.myEvents);
  const [eventsInThisMonth, setEventInThisMonth] = useState([]);
  const dispatch = useDispatch();
  const { currentDate } = useCurrentDateContext();

  useEffect(async () => {
    await dispatch(getEventsByUserId(user.id));
  }, [dispatch]);

  useEffect(() => {
    setEventInThisMonth(getEventsInThisMonth(myEvents, currentDate.month()));
  }, [myEvents]);

  return (
    <div className="home-page-container">
      <div className="left-nav-container">
        <CreateEventButton />
        <MiniMonthBoard current_date={currentDate} />
      </div>
      <div className="main-container">
        <MonthBoard eventsInThisMonth={eventsInThisMonth}/>
      </div>
    </div>
  );
};

export default HomePage;
