import React, { useState } from "react";
import axios from "axios";
import GetUsers from "../hooks/GetUsers";


export default function SignUp() {
  const [userInfos, setUserInfos] = useState({
    fullname: "",
    password: "",
    email: "",
  });
  const [strength, setStrength] = useState(0);
  const [condition, setCondition] = useState("");
  const [error, setError] = useState("");

  const AllUsers = GetUsers();

  function handlePassword(pass) {
    let newStrength = 0;

    if (pass.length > 0) {
      if (pass.match(/[a-zA-Z]{0,5}/)) {
        setCondition("Week : Password should contain 5 characters minimum");
        newStrength = 1;
      }
      if (pass.match(/[a-zA-Z0-9]{5,}/)) {
        setCondition("Moderate : Password should contain digits and special characters");
        newStrength = 2;
      }
      if (pass.match(/[a-zA-Z0-9]{5,}[?!@-_$.]+/)) {
        newStrength = 3;
        setCondition("Strong");
      }
    }

    setStrength(newStrength);
  }

  const indicatorClass = () => {
    if (strength === 1) return "bg-danger";
    if (strength === 2) return "bg-warning";
    if (strength === 3) return "bg-success";
  };

  function getUserInfos(e) {
    setUserInfos({ ...userInfos, [e.target.name]: e.target.value });
    handlePassword(userInfos.password);
  }

  function storeNewUser(e) {
    e.preventDefault();

    let existingUser = AllUsers.filter(
      (user) => user.email === userInfos.email
    );

    if (strength <= 2) {
      setError("The password should be strong");
    } else if (existingUser.length !== 0) {
      setError("This Email belongs to another user");
    } else {
      setError("");
      axios.post("http://localhost:8000/api/users", { ...userInfos });
    }
  }

  return (
    <div className="container h-100 ">
      <div className="row h-100 justify-content-center d-flex align-items-center">
        <div className="col-md-6">
          {error && <p className="alert alert-danger text-danger">{error}</p>}
          <form onSubmit={storeNewUser}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Full name:
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                value={userInfos.fullname}
                onChange={getUserInfos}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userInfos.password}
                onChange={getUserInfos}
                required
              />
            </div>
            <div className="mb-3">
              <div className="password-strength-indicator">
                <div
                  className={`${indicatorClass()}`}
                  style={{ width: `${strength * 33}%` }}
                ></div>
              </div>
              <small className="text-muted">
                <strong>{condition}</strong>
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userInfos.email}
                onChange={getUserInfos}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
