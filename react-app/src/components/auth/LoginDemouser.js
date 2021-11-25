import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const LoginDemouser = () => {
  const dispatch = useDispatch();
  const loginDemo1 = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };
  const loginDemo2 = async () => {
    await dispatch(login("zhang@aa.io", "password"));
  };
  return (
    <div className="demo-container">
    <div className="logout" onClick={loginDemo1}>
      Demo User 1
    </div>
    <div className="logout" onClick={loginDemo2}>
    Demo User 2
  </div></div>
  );
};

export default LoginDemouser;
