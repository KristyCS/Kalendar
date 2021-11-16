import MonthFrame from "../../utils";
import "./MiniMonthBoard.css"
const MiniMondivBoard = ({current_date}) => {
  const monthFrame = MonthFrame;
  const mark_date = current_date.date()
  return (
    <div>
      <div className = "board">
        <div className = "week-head">
          <div className="head-content">S</div>
          <div className="head-content">M</div>
          <div className="head-content">T</div>
          <div className="head-content">W</div>
          <div className="head-content">T</div>
          <div className="head-content">F</div>
          <div className="head-content">S</div>
        </div>
        
        {monthFrame.map((week, idx) => (
          <div key={`week.mondiv()${idx}`} className="week">
            {week.map((day, idx) => (
              <div key={`day.day()${idx}`} className={mark_date===day.date()? "mark-date":"date"}>{day.date()}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMondivBoard;
