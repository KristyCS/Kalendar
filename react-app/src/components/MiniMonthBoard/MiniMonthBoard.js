import { buildMonthFrame } from "../../utils";
import "./MiniMonthBoard.css";
import { useState, useEffect } from "react";
import { useCurrentDateContext } from "../../context/CurrentDate";
const MiniMondivBoard = () => {
  const [monthFrame, setMonthFrame] = useState(buildMonthFrame());
  const { currentDate, setCurrentDate } = useCurrentDateContext();
  useEffect(() => {
    setMonthFrame(buildMonthFrame(currentDate));
  }, [currentDate]);
  return (
    <div>
      <div className="board">
        <div className="week-head">
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
              <div
                key={`day.day()${idx}`}
                onClick={() => setCurrentDate(day)}
                className={
                  currentDate.date() === day.date() &&
                  currentDate.month() === day.month()
                    ? "mark-date"
                    : "date"
                }
              >
                {day.date()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMondivBoard;
