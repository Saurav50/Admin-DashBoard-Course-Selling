import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userState";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignUp = async () => {
    console.log("Signing up...", { email, password, agreeTerms });

    try {
      const response = await fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          agreeTerms: agreeTerms,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign-up successful:", data);
        localStorage.setItem("token", data.token);
        // window.location = "/";
        setUser({
          userEmail: email,
          isLoading: false,
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Sign-up failed:", errorData);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="card-container">
      <h2>Sign Up</h2>
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <br />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
          className="checkbox"
        />
        Agree to Terms
      </label>
      <br />
      <button
        disabled={!agreeTerms}
        onClick={handleSignUp}
        className="submit-btn"
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          navigate("/signin");
        }}
        className="toggle-btn"
      >
        Already have an account? Sign In
      </button>
    </div>
  );
};

export default SignUp;
