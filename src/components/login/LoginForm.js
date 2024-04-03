import React, { useState } from "react";
import "../../css/loginForm.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForms() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        let user = data;
        localStorage.setItem("user", JSON.stringify(data));
        if(location.state){
          navigate(location.state.previousUrl)
        }else{
          navigate("/dashboard")
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <div className="login">
          <h2>Login Form</h2>
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="form-group was-validated mb-2">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className="invalid-feedback">Please Enter you email</div>
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div className="invalid-feedback">
                Please Enter your password
              </div>
            </div>
            <div className="form-group form-check mb-2">
              <input type="checkbox" className="form-check-input"></input>
              <label htmlFor="check" className="form-check-label">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-2">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
