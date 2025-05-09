import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    businessName: "",
    warehouseAddress: "",
    businessAddress: "",
    zipCode: "",
    phone: "",
    gst: ""
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) newErrors.username = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    if (state === "Sign Up") {
      if (!formData.businessName) newErrors.businessName = "Business Name is required.";
      if (!formData.warehouseAddress) newErrors.warehouseAddress = "Warehouse Address is required.";
      if (!formData.businessAddress) newErrors.businessAddress = "Business Address is required.";
      if (!formData.zipCode) newErrors.zipCode = "Zip Code is required.";
      if (!formData.phone) newErrors.phone = "Phone is required.";
      if (!formData.gst) newErrors.gst = "GST is required.";
    }

    const checkbox = document.getElementById("agree-checkbox");
    if (checkbox && !checkbox.checked) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      setErrors({ form: data.errors });
    }
  };

  const signup = async () => {
    const sellerData = { ...formData, role: "seller" };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerData),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      setErrors({ form: data.errors });
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state} (Seller)</h1>
        <div className="loginsignup-fields">
          <input name="username" placeholder="Your Name" value={formData.username} onChange={changeHandler} />
          <input name="email" placeholder="Email Address" value={formData.email} onChange={changeHandler} />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={changeHandler} />

          {state === "Sign Up" && (
            <>
              <div className="section-label">Business Details</div>
              <input name="businessName" placeholder="Business Name (as in GST)" value={formData.businessName} onChange={changeHandler} />
              <input name="warehouseAddress" placeholder="Warehouse Address" value={formData.warehouseAddress} onChange={changeHandler} />
              <input name="businessAddress" placeholder="Business Address" value={formData.businessAddress} onChange={changeHandler} />
              <input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={changeHandler} />
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={changeHandler} />
              <input name="gst" placeholder="GST Number" value={formData.gst} onChange={changeHandler} />
            </>
          )}
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree-checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {Object.values(errors).map((err, i) => (
          <p className="error" key={i}>{err}</p>
        ))}

        <button onClick={() => validateForm() && (state === "Login" ? login() : signup())}>
          Continue
        </button>

        <p className="loginsignup-login">
          {state === "Login" ? (
            <>Create an account? <span onClick={() => { setState("Sign Up"); setErrors({}); }}>Sign Up</span></>
          ) : (
            <>Already have an account? <span onClick={() => { setState("Login"); setErrors({}); }}>Login</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
