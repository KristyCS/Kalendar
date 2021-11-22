import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const LoginDemouser = () => {
  const dispatch = useDispatch();
  const loginDemo = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };
  return (
    <div className="logout" onClick={loginDemo}>
      Demo User
    </div>
  );
};

export default LoginDemouser;
