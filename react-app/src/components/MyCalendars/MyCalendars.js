import React from "react";
import "./MyCalendars.css";
import { useState } from "react";
import { useEventLabelContext } from "../../context/EventLabel";
import { useLeftNavigationBarContext } from "../../context/LeftNavigationBar";
import { IoChevronUp } from "react-icons/io5";
export default function MyCalendars() {
  const {
    checkFamily,
    setCheckFamily,
    checkWork,
    setCheckWork,
    checkOther,
    setCheckOther,
  } = useEventLabelContext();
  const [showCheckList, setShowCheckList] = useState(true);
  return (
    <div className="my-calendars-container">
      <div
        className="my-calendars-head"
        onClick={() => setShowCheckList(!showCheckList)}
      >
        <p>My Calendars</p>
        <IoChevronUp />
      </div>
      {showCheckList && (
        <div className="my-calendar-list">
          <div className="check-con">
            <input
              type="checkbox"
              className="label-check-box family"
              checked={checkFamily}
              id="family"
              onChange={() => setCheckFamily(!checkFamily)}
            />
            <label htmlFor="family"> family</label>
          </div>
          <div className="check-con">
            <input
              type="checkbox"
              id="work"
              className="label-check-box work"
              checked={checkWork}
              onChange={() => setCheckWork(!checkWork)}
            />
            <label htmlFor="work"> work</label>
          </div>
          <div className="check-con">
            <input
              type="checkbox"
              id="other"
              className="label-check-box other"
              checked={checkOther}
              onChange={() => setCheckOther(!checkOther)}
            />
            <label htmlFor="other"> other</label>
          </div>
        </div>
      )}
    </div>
  );
}
