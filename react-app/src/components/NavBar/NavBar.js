import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginDemouser from "../auth/LoginDemouser";
import { useSelector } from "react-redux";
import { useCurrentDateContext } from "../../context/CurrentDate";
import "./NavBar.css";
import { monthName } from "../../utils";
import { RiCalendarCheckFill } from "react-icons/ri";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
const dayjs = require("dayjs");
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const { currentDate, setCurrentDate } = useCurrentDateContext();

  return (
    <nav>
      <div className="nav-container">
        <div className="h-container">
          <GiHamburgerMenu className ="hamber-icon" size={25}/>
        </div>
        <div>
          <RiCalendarCheckFill size={30}/>
          <NavLink to="/" exact={true} className="Kalendar">
            Kalendar
          </NavLink>
        </div>
        {user && (
          <div className = "date-nav-container">
            <div className="today" onClick={() => setCurrentDate(dayjs())}>
              {" "}
              Today
            </div>
            <div className="month-year-container">
              <MdArrowBackIos
                className="arrow"
                onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
              />
              <MdArrowForwardIos
                className="arrow"
                onClick={() => setCurrentDate(currentDate.add(1, "month"))}
              />
              <div>
                {monthName[currentDate.month()]} {currentDate.year()}
              </div>
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        )}
        {!user && (
          <>
            <div>
              <LoginDemouser />
            </div>
            <div>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
