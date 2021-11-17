import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { getEventsByUserId } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getEventsInThisPeriod,dayjs } from "../../utils";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {monthName} from "../../utils";
const HomePage = () => {
  const user = useSelector((state) => state.session.user);
  const myEvents = useSelector((state) => state.event.myEvents);
  const [eventsInThisPeriod, setEventInThisPeriod] = useState([]);
  const dispatch = useDispatch();
  const { currentDate, setCurrentDate } = useCurrentDateContext();

  useEffect(async () => {
    await dispatch(getEventsByUserId(user.id));
  }, [dispatch]);

  useEffect(() => {
    setEventInThisPeriod(getEventsInThisPeriod(myEvents, currentDate.utc()));
  }, [myEvents, currentDate]);

  return (
    <div className="home-page-container">
      <div className="left-nav-container">
        <CreateEventButton />
        <div className="switch-month">
          <div className="mini-board-month">
            {monthName[currentDate.month()]}
            {currentDate.year()}
          </div>
          <div className="mini-board-arrow">
          <FaLongArrowAltLeft onClick={()=>setCurrentDate(dayjs(currentDate).subtract(1,"month"))}/>
          <FaLongArrowAltRight onClick={()=>setCurrentDate(dayjs(currentDate).add(1,"month"))}/></div>
        </div>
        <MiniMonthBoard />
      </div>
      <div className="main-container">
        <MonthBoard eventsInThisPeriod={eventsInThisPeriod} />
      </div>
    </div>
  );
};

export default HomePage;
