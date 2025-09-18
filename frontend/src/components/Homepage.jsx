import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.44 21.44 0 0 1 5.19-6.4"></path>
    <path d="M1 1l22 22"></path>
    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24"></path>
  </svg>
);

const Homepage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [signupType, setSignupType] = useState("");
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);

  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const validateSignup = () => {
    let missingFields = [];
    if (!signupFullName.trim()) missingFields.push("Full Name");
    if (!signupEmail.trim()) missingFields.push("Email");
    if (!signupPassword.trim()) missingFields.push("Password");
    if (!signupType) missingFields.push("User Type");
    if (missingFields.length > 0) {
      alert(`Please fill the following field(s): ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    let missingFields = [];
    if (!loginUsername.trim()) missingFields.push("Username");
    if (!loginPassword.trim()) missingFields.push("Password");
    if (!loginType) missingFields.push("Login Type");
    if (missingFields.length > 0) {
      alert(`Please fill the following field(s): ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  // Handle Signup
  const handleSignup = async () => {
    if (!validateSignup()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/${signupType}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: signupFullName,
            email: signupEmail,
            password: signupPassword,
          }),
        }
      );

      const data = await response.text();
      alert(data);

      if (data.includes("successful")) {
        // clear fields after success
        setSignupFullName("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupType("");
      }
    } catch (error) {
      alert("Error during signup: " + error.message);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    if (!validateLogin()) return;

    try {
      const response = await fetch(`http://localhost:5000/${loginType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.text();
      alert(data);

      if (data.includes("success")) {
        if (loginType === "customer") navigate("/customer-dashboard");
        else if (loginType === "artist") navigate("/artist-dashboard");
        else if (loginType === "admin") navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("Error during login: " + error.message);
    }
  };

  return (
    <div className="homepage">
      {/* Top Bar */}
      <header className="top-bar">
        <h2 className="brand">🎨 NovaBrush</h2>
        <button className="main-btn" onClick={() => setShowSignup(true)}>
          Login / Signup
        </button>
      </header>

      {/* Center Title */}
      <div className="center-content">
        <h1 className="title">Welcome to NovaBrush</h1>
        <p className="subtitle">Unleash your creativity with ease ✨</p>
      </div>

      {/* Bottom Bar */}
      <footer className="bottom-bar">
        © {new Date().getFullYear()} NovaBrush. All rights reserved.
      </footer>

      {/* Signup Popup */}
      {showSignup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>Signup</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <div className="password-wrapper">
              <input
                type={signupPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="password-input"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setSignupPasswordVisible((vis) => !vis)}
              >
                {signupPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>

            <select
              value={signupType}
              onChange={(e) => setSignupType(e.target.value)}
            >
              <option value="" disabled>
                User Type
              </option>
              <option value="artist">Artist</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="btn-row">
              <button
                className="login-btn"
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              >
                Login
              </button>
              <button className="login-btn signup-btn" onClick={handleSignup}>
                Signup
              </button>
            </div>
            <button className="close-btn" onClick={() => setShowSignup(false)}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLogin && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Email"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <div className="password-wrapper">
              <input
                type={loginPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="password-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setLoginPasswordVisible((vis) => !vis)}
              >
                {loginPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="" disabled>
                Login Type
              </option>
              <option value="artist">Login as Artist</option>
              <option value="customer">Login as Customer</option>
              <option value="admin">Login as Admin</option>
            </select>
            <div className="btn-row">
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button
                className="login-btn signup-btn"
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Signup
              </button>
            </div>
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
