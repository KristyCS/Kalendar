import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import homePage from "../../images/homePage.png";
import mrRsvps from "../../images/myRsvps.png";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="landing-container">
      <div className="first-container">
        <div className="brief-intro">
          <h2 className="title-answ">
            It's an all-in-one place to organize your entire events and manage
            personal schedules.
          </h2>
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type="submit">Login</button>
          <p>Doesn't has an account?<NavLink to="/sign-up">Sign Up</NavLink></p> 
          
          </form>
        </div>
      </div>
      <div className="following-container">
        <div className="img-div">
          <img src={homePage} alt="homePage"></img>
        </div>
        <div className="info-div">
          <p className="b1">Feature spotlight</p>
          <p className="h1">
            See your week at a glance and make everything visual with Kalendar
            platform.{" "}
          </p>
          <p>
            Colors, labels, time-tracking, and more! Customers love the ability
            to visualize all of your calendar board's information with 3 label
            views in order to view and manage on your event data.
          </p>
        </div>
      </div>
      <div className="following-container">
        <div className="info-div">
          <p className="b1">Feature spotlight</p>
          <p className="h1">Create your schedule and invite friends. </p>
          <p>
            Plan out everything you need to get done. Invite friends and reply
            invitations just in one second.
          </p>
        </div>
        <div className="img-div">
          <img src={mrRsvps} alt="myRsvps"></img>
        </div>
      </div>
      <div className="about-me">
        <h3 className="created-by"> Created By: Kristy Zhang</h3>
        <img
          className="linkedin"
          onClick={() =>
            (window.location =
              "https://www.linkedin.com/feed/?trk=homepage-basic_google-one-tap-submit")
          }
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="profile-img"
        />
        <img
          className="linkedin"
          onClick={() => (window.location = "https://github.com/KristyCS")}
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="profile-img"
        />
      </div>
    </div>
  );
};

export default LoginForm;
