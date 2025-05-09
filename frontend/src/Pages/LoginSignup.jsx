import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gst: ""
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (state === "Signup") {
      if (!formData.businessName.trim()) errs.businessName = "Business name is required";
      if (!formData.address.trim()) errs.address = "Business address is required";
      if (!formData.phone.trim()) errs.phone = "Phone number is required";
      if (!formData.gst.trim()) errs.gst = "GST number is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/seller/${state.toLowerCase()}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/seller/dashboard");
      } else {
        alert(data.errors || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error during authentication:", err);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h2>{state === "Login" ? "Seller Login" : "Seller Registration"}</h2>

        {state === "Signup" && (
          <>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={changeHandler}
            />
            {errors.businessName && <p className="form-error">{errors.businessName}</p>}

            <input
              type="text"
              name="address"
              placeholder="Business Address"
              value={formData.address}
              onChange={changeHandler}
            />
            {errors.address && <p className="form-error">{errors.address}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={changeHandler}
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}

            <input
              type="text"
              name="gst"
              placeholder="GST Number"
              value={formData.gst}
              onChange={changeHandler}
            />
            {errors.gst && <p className="form-error">{errors.gst}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={changeHandler}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={changeHandler}
        />
        {errors.password && <p className="form-error">{errors.password}</p>}

        <button onClick={handleSubmit}>
          {state === "Login" ? "Login" : "Register Business"}
        </button>

        <p>
          {state === "Login" ? "Don't have a seller account?" : "Already registered?"}{" "}
          <span onClick={() => setState(state === "Login" ? "Signup" : "Login")}>
            {state === "Login" ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
