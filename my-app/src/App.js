import React from "react";
import "./App.css";
import { Route, withRouter, Redirect } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" exact />;
        }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return <Home />;
        }}
      />
    </div>
  );
}
export default withRouter(App);
