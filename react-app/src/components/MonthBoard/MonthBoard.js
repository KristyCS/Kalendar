import { buildMonthFrame } from "../../utils";
import "./MonthBoard.css";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { useEffect, useState } from "react";
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const MonthBoard = ({ eventsInThisPeriod }) => {
  const [monthFrame, setMonthFrame] = useState(buildMonthFrame());
  const { currentDate } = useCurrentDateContext();
  useEffect(() => {
    setMonthFrame(buildMonthFrame(currentDate));
  }, [currentDate]);

  return (
    <div>
      <div className="large-board">
        <div className="large-week-head">
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
              <div
                key={`day.day()${idx}`}
                id={day.month() + "-" + day.date()}
                className="large-day-content"
              >
                <p className="large-date">{day.date()}</p>
                {eventsInThisPeriod &&
                  `${day.month()}-${day.date()}` in eventsInThisPeriod && (
                    <div className="event-lists">
                      {eventsInThisPeriod[`${day.month()}-${day.date()}`].map(
                        (event, idk) => (
                          <div key={idk}>{event.theme}</div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthBoard;
