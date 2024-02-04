import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appbar.css";
import { isUserLoading } from "../store/selectors/isUserLoadingState";
import { userEmailState } from "../store/selectors/userEmailState";
import { userState } from "../store/atoms/userState";
import { useSetRecoilState, useRecoilValue } from "recoil";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div className="appbar-container">
        <div className="appbar-left">
          <span
            className="appbar-title"
            onClick={() => {
              navigate("/");
            }}
          >
            Coursera.
          </span>
        </div>

        <div className="appbar-right">
          <div className="appbar-button" onClick={() => navigate("/addcourse")}>
            Add course
          </div>
          <div className="appbar-button" onClick={() => navigate("/courses")}>
            Courses
          </div>
          <div
            className="appbar-button"
            onClick={() => {
              localStorage.setItem("token", null);
              // window.location = "/";
              navigate("/");
              setUser({
                isLoading: false,
                userEmail: null,
              });
            }}
          >
            Logout
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="appbar-container">
        <div className="appbar-left">
          <span
            className="appbar-title"
            onClick={() => {
              navigate("/");
            }}
          >
            Coursera.
          </span>
        </div>

        <div className="appbar-right">
          <div className="appbar-button" onClick={() => navigate("/signup")}>
            Signup
          </div>
          <div className="appbar-button" onClick={() => navigate("/signin")}>
            Signin
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
