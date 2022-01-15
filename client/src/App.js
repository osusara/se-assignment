import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/user";
import setAuthToken from "./util/setAuthToken";

import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Todos from "./components/Todos";
import Header from "./components/Header";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
      <Header />
        <>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute component={Todos} />}
            />
          </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
