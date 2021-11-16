import MonthFrame from "../../utils";
import "./MonthBoard.css"
const MonthBoard = () => {
  const monthFrame = MonthFrame;

  return (
    <div>
      <div className = "large-board">
        <div className = "large-week-head">
          <div className="large-head-content">Sun</div>
          <div className="large-head-content">Mon</div>
          <div className="large-head-content">Tue</div>
          <div className="large-head-content">Wed</div>
          <div className="large-head-content">Thu</div>
          <div className="large-head-content">Fri</div>
          <div className="large-head-content">Sat</div>
        </div>
        
        {monthFrame.map((week, idx) => (
          <div key={`week.mondiv()${idx}`} className="large-week">
            {week.map((day, idx) => (
              <div key={`day.day()${idx}`} className="large-day-content"><p className="large-date">{day.date()}</p></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthBoard;
