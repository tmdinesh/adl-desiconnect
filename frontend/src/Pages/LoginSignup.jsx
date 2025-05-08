import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (state === "Sign Up" && !formData.username.trim()) {
      newErrors.username = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    const checkbox = document.getElementById("agree-checkbox");
    if (checkbox && !checkbox.checked) {
      newErrors.agree = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    let dataObj;
    await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
        if (dataObj.success) {
          localStorage.setItem("auth-token", dataObj.token);
          window.location.replace("/");
        } else {
          setErrors({ form: dataObj.errors });
        }
      });
  };

  const signup = async () => {
    let dataObj;
    await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
        if (dataObj.success) {
          localStorage.setItem("auth-token", dataObj.token);
          window.location.replace("/");
        } else {
          setErrors({ form: dataObj.errors });
        }
      });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Your name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </>
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree-checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
          {errors.agree && <p className="error">{errors.agree}</p>}
        </div>

        {errors.form && <p className="error">{errors.form}</p>}

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
            <span onClick={() => { setState("Sign Up"); setErrors({}); }}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => { setState("Login"); setErrors({}); }}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
