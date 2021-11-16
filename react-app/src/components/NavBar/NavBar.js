import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginDemouser from "../auth/LoginDemouser";
import { useSelector } from "react-redux";
import "./NavBar.css";
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
      <ul className="nav-container">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="today"> Today</li>
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
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
