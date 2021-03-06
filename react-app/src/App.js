import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import MyRsvpsList from "./components/MyRsvpsList/MyRsvpsList";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import HomePage from "./components/HomePage/HomePage";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/myrsvps' exact={true} >
          <MyRsvpsList/>
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>  */}
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
