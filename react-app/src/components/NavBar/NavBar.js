import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginDemouser from "../auth/LoginDemouser";
import { useSelector } from "react-redux";
import { useCurrentDateContext } from "../../context/CurrentDate";
import "./NavBar.css";
import { monthName } from "../../utils";
import { RiCalendarCheckFill } from "react-icons/ri";
import { useLeftNavigationBarContext } from "../../context/LeftNavigationBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
const dayjs = require("dayjs");
const NavBar = () => {
  const { showLeftNavigationBar, setShowLeftNavigationBar } =
    useLeftNavigationBarContext();
  const user = useSelector((state) => state.session.user);
  const { currentDate, setCurrentDate, setMiniBoardMarker } =
    useCurrentDateContext();
  const hideSideBarHandler = () => {
    setShowLeftNavigationBar(!showLeftNavigationBar);
    localStorage.setItem("hideNav", !showLeftNavigationBar);
  };
  return (
    <nav>
      <div className="nav-container">
        <div className="h-container">
          <GiHamburgerMenu
            onClick={hideSideBarHandler}
            className="hamber-icon"
            size={25}
          />
          <RiCalendarCheckFill size={30} />
          <NavLink to="/" exact={true} className="Kalendar">
            Kalendar
          </NavLink>
        </div>
        {user && (
          <>
            <div
              className="today"
              onClick={() => {
                setMiniBoardMarker(dayjs());
                setCurrentDate(dayjs());
              }}
            >
              {" "}
              Today
            </div>
            <div className="date-nav-container">
              <MdArrowBackIos
                className="arrow"
                onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
              />
              <MdArrowForwardIos
                className="arrow"
                onClick={() => setCurrentDate(currentDate.add(1, "month"))}
              />
              <div>
                {monthName[currentDate.month()]} {"  "}
                {currentDate.year()}
              </div>
            </div>
            <LogoutButton />
          </>
        )}
        {!user && (
          <div className="auth">
            <div>
              <LoginDemouser />
            </div>
            <div>
              <NavLink
                to="/login"
                className="logout"
                exact={true}
                activeClassName="active"
              >
                Login
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/sign-up"
                className="logout"
                exact={true}
                activeClassName="active"
              >
                Sign Up
              </NavLink>
            </div>{" "}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
