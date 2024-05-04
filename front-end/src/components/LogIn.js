import React, { useState } from 'react'
import GetUsers from '../hooks/GetUsers';
import { useNavigate } from 'react-router-dom';


export default function LogIn() {

    const [userInfos, setUserInfos] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const AllUsers = GetUsers()

    const navigate = useNavigate()

    function getUserInfos(e) {
        setUserInfos({ ...userInfos, [e.target.name]: e.target.value });
    }

    

    function Login(e){
        e.preventDefault();

        let existingUser = AllUsers.filter(
            (user) => user.email === userInfos.email && user.password === userInfos.password
        );

        if(existingUser.length !== 0){
            navigate(`/home/${existingUser[0]._id}`)
        }
        else{
            setError("The Email or the password is incorrect, try again");
        }

    }

  return (
    <div className="container h-100 ">
      <div className="row h-100 justify-content-center d-flex align-items-center">
        <div className="col-md-6">
          {error && <p className="alert alert-danger text-danger">{error}</p>}
          <form onSubmit={Login}>
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
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
          <a href='/sign-up'>Create a new account</a>
        </div>
      </div>
    </div>
  )
}
