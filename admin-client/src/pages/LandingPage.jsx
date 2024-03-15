// LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import adminImage from "../assets/admin.png";
import arrowRightImage from "../assets/arrow-right.png";
import "./LandingPage.css"; // Import a CSS file for styling if needed
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmailState";

const LandingPage = () => {
  const userEmail = useRecoilValue(userEmailState);
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h1>Welcome to Our Admin Portal</h1>
        <p>Explore and manage your courses with ease.</p>
        {/* You can add more text or components as needed */}
        {!userEmail && (
          <Link to="/signin" className="login-link">
            <div className="Login">
              Login to access more..
              <img src={arrowRightImage} alt="arrow-right" />
            </div>
          </Link>
        )}
      </div>
      <img src={adminImage} alt="Admin" className="landing-page-image" />
    </div>
  );
};

export default LandingPage;
