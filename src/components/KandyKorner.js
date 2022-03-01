import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./KandyKorner.css";

export const KandyKorner = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("kandy_customer")) {
          return (
            <>
              <NavBar />
              <ApplicationView />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);