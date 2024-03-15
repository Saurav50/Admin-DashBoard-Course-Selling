import { useState, useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Appbar from "./components/Appbar";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { userState } from "./store/atoms/userState";

import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <InitUser />
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="course/:courseId" element={<CourseDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get("http//localhost:3000/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
