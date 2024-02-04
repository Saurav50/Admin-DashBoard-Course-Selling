import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp"; // Import the common CSS file for styling
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userState";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignIn = async () => {
    console.log("Signing in...", { email, password });
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          username: email,
          password: password,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        // window.location = "/";
        setUser({
          userEmail: email,
          isLoading: false,
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="card-container">
      <h2>Sign In</h2>
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
      <button onClick={handleSignIn} className="submit-btn">
        Sign In
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className="toggle-btn"
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

export default SignIn;
