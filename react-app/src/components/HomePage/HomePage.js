import MiniMonthBoard from "../MiniMonthBoard/MiniMonthBoard";
import MonthBoard from "../MonthBoard/MonthBoard";
import "./HomePage.css";
import { useTodayContext } from "../../context/Today";
const HomePage = () => {
  const { today } = useTodayContext();
  
  return (
    <div className="home-page-container">
      <div className="left-nav-container">
        <MiniMonthBoard current_date={today}/>
      </div>
      <div className="main-container">
        <MonthBoard />
      </div>
    </div>
  );
};

export default HomePage;
