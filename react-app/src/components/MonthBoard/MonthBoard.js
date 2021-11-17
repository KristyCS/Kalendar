import { buildMonthFrame } from "../../utils";
import "./MonthBoard.css";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { useEffect, useState } from "react";
const dayjs = require("dayjs");
const MonthBoard = ({ eventsInThisMonth }) => {
  const [monthFrame, setMonthFrame] = useState(buildMonthFrame());
  const [eventsObj, setEventsObj] = useState();
  const { currentDate } = useCurrentDateContext();
  useEffect(()=>{
    setMonthFrame(buildMonthFrame(currentDate))
  },[currentDate])
  useEffect(() => {
    if (eventsInThisMonth) {
      const newEventsObj = {};
      for (const event of eventsInThisMonth) {
        if (!newEventsObj[`${dayjs(event.start_at).date()}`]) {
          newEventsObj[`${dayjs(event.start_at).date()}`] = [event];
        } else {
          newEventsObj[`${dayjs(event.start_at).date()}`].push(event);
        }
      }
      setEventsObj(newEventsObj);
    }
  }, [eventsInThisMonth]);

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
                id={day.date()}
                className="large-day-content"
              >
                <p className="large-date">{day.date()}</p>
                {eventsObj && day.date() in eventsObj && (
                  <div className="event-lists">
                    {eventsObj[day.date()].map((event) => (
                      <div key={event.id}>{event.theme}</div>
                    ))}
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
