import { buildMonthFrame } from "../../utils";
import "./MonthBoard.css";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { useEventLabelContext } from "../../context/EventLabel";
import EventDetailPage from "../EventDetailPage/EventDetailPage";
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const MonthBoard = ({ eventsInThisPeriod }) => {
  const [monthFrame, setMonthFrame] = useState(buildMonthFrame());
  const [event, setEvent] = useState();
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const { currentDate } = useCurrentDateContext();
  const [labelSet, setLabelSet] = useState({});
  const {
    checkFamily,
    setCheckFamily,
    checkWork,
    setCheckWork,
    checkOther,
    setCheckOther,
  } = useEventLabelContext();
  useEffect(() => {
    setMonthFrame(buildMonthFrame(currentDate));
  }, [currentDate]);
  useEffect(() => {
    const newLabelSet = new Set();
    checkFamily && newLabelSet.add("family") ;
    checkWork && newLabelSet.add("work");
    checkOther && newLabelSet.add("other") ;
    setLabelSet(newLabelSet);
  }, [checkFamily, checkWork, checkOther]);
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
                key={`day.month()day.day()${idx}`}
                id={day.month() + "-" + day.date()}
                className="large-day-content"
              >
                <p className="large-date">{day.date()}</p>
                {eventsInThisPeriod && 
                  `${day.month()}-${day.date()}` in eventsInThisPeriod && (
                    <div className="event-lists">
                      {eventsInThisPeriod[`${day.month()}-${day.date()}`].map(
                        (event, idk) => (<>
                          {labelSet.has(event.label) && <div
                            key={event.description+idk}
                            className={"event-" + event.label}
                            onClick={() => {
                              setEvent(event);
                              setShowEventDetailModal(true);
                            }}
                          >
                            {event.theme}
                          </div>}</>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
        {showEventDetailModal && (
          <Modal onClose={() => setShowEventDetailModal(false)}>
            <EventDetailPage event={event} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MonthBoard;
