import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import { useCurrentDayContext } from "../../context/CurrentDay";
const HomePage = () => {
  const { currentDay } = useCurrentDayContext();

  return (
    <div className="home-page-container">
      <div className="left-nav-container">
        <CreateEventButton />
        <MiniMonthBoard current_date={currentDay} />
      </div>
      <div className="main-container">
        <MonthBoard />
      </div>
    </div>
  );
};

export default HomePage;
