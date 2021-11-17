import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginDemouser from "../auth/LoginDemouser";
import { useSelector } from "react-redux";
import { useCurrentDateContext } from "../../context/CurrentDate";
import "./NavBar.css";
import { ImCircleLeft, ImCircleRight } from "react-icons/im";
const dayjs = require("dayjs");
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const { currentDate, setCurrentDate } = useCurrentDateContext();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <nav>
      <ul className="nav-container">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {user && (
          <>
            <li className="today" onClick={() => setCurrentDate(dayjs())}>
              {" "}
              Today
            </li>
            <div className="month-container">
              <ImCircleLeft
                onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
              />
              <li >{monthName[currentDate.month()]}</li>
              <ImCircleRight
                onClick={() => setCurrentDate(currentDate.add(1, "month"))}
              />
            </div>
            <div className="year-container">
              <ImCircleLeft
                onClick={() => setCurrentDate(currentDate.subtract(1, "year"))}
              />
              <li >{currentDate.year()}</li>
              <ImCircleRight
                onClick={() => setCurrentDate(currentDate.add(1, "year"))}
              />
            </div>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <LoginDemouser />
            </li>
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </li>{" "}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
