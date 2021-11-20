import { buildMonthFrame } from "../../utils";
import "./MonthBoard.css";
import { useCurrentDateContext } from "../../context/CurrentDate";
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import EditEventForm from "../EditEventForm/EditEventForm";
import { useEventLabelContext } from "../../context/EventLabel";
import EventDetailPage from "../EventDetailPage/EventDetailPage";
import { v4 as uuidv4 } from "uuid";
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
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [labelSet, setLabelSet] = useState(new Set());
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
    checkFamily && newLabelSet.add("family");
    checkWork && newLabelSet.add("work");
    checkOther && newLabelSet.add("other");
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
          <div key={uuidv4()} className="large-week">
            {week.map((day, idx) => (
              <div
                key={uuidv4()}
                id={day.month() + "-" + day.date()}
                className="large-day-content"
              >
                <p className="large-date">{day.date()}</p>
                {eventsInThisPeriod &&
                  `${day.month()}-${day.date()}` in eventsInThisPeriod && (
                    <div className="event-lists">
                      {eventsInThisPeriod[`${day.month()}-${day.date()}`].map(
                        (event, idk) => (
                          <div key={uuidv4()}>
                            {labelSet.has(event.label) && (
                              <div
                                key={uuidv4()}
                                className={"event-" + event.label}
                                onClick={() => {
                                  setEvent(event);
                                  setShowEventDetailModal(true);
                                }}
                              >
                                {event.theme}
                              </div>
                            )}
                          </div>
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
            <EventDetailPage
              setShowEventDetailModal={setShowEventDetailModal}
              setShowEditEventModal={setShowEditEventModal}
              event={event}
            />
          </Modal>
        )}
        {showEditEventModal && (
          <Modal onClose={() => setShowEditEventModal(false)}>
            <EditEventForm
              setShowEditEventModal={setShowEditEventModal}
              event={event}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MonthBoard;
