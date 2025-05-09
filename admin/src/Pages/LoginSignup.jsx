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
          <input type="text" name="username" placeholder="Your Name" value={formData.username} onChange={changeHandler} />
          {errors.username && <p className="error">{errors.username}</p>}

          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={changeHandler} />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={changeHandler} />
          {errors.password && <p className="error">{errors.password}</p>}

          {state === "Sign Up" && (
            <>
              <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={changeHandler} />
              {errors.businessName && <p className="error">{errors.businessName}</p>}

              <input type="text" name="warehouseAddress" placeholder="Warehouse Address" value={formData.warehouseAddress} onChange={changeHandler} />
              {errors.warehouseAddress && <p className="error">{errors.warehouseAddress}</p>}

              <input type="text" name="businessAddress" placeholder="Business Address" value={formData.businessAddress} onChange={changeHandler} />
              {errors.businessAddress && <p className="error">{errors.businessAddress}</p>}

              <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={changeHandler} />
              {errors.zipCode && <p className="error">{errors.zipCode}</p>}

              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={changeHandler} />
              {errors.phone && <p className="error">{errors.phone}</p>}

              <input type="text" name="gst" placeholder="GST Number" value={formData.gst} onChange={changeHandler} />
              {errors.gst && <p className="error">{errors.gst}</p>}
            </>
          )}
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree-checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
          {errors.agree && <p className="error">{errors.agree}</p>}
        </div>

        {errors.form && <p className="error">{errors.form}</p>}

        <button onClick={() => {
          if (validateForm()) {
            state === "Login" ? login() : signup();
          }
        }}>
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Don’t have an account? <span onClick={() => { setState("Sign Up"); setErrors({}); }}>Sign up</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already registered? <span onClick={() => { setState("Login"); setErrors({}); }}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
