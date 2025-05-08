import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!formData.password.trim()) {
      alert("Password is required.");
      return false;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    const checkbox = document.getElementById("agree-checkbox");
    if (checkbox && !checkbox.checked) {
      alert("You must agree to the terms and privacy policy.");
      return false;
    }

    return true;
  };

  const login = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const dataObj = await response.json();
      if (dataObj.success) {
        localStorage.setItem("auth-token", dataObj.token);
        window.location.replace("/");
      } else {
        alert(dataObj.errors);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const dataObj = await response.json();
      if (dataObj.success) {
        localStorage.setItem("auth-token", dataObj.token);
        window.location.replace("/");
      } else {
        alert(dataObj.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree-checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <button
          onClick={() => {
            if (validateForm()) {
              state === "Login" ? login() : signup();
            }
          }}
        >
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
