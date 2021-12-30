import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export const Login = (props) => {
  console.log("props", props);
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  
  
  
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", { email, password })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          props.setUserDetail(res.data);
          alert("login success");
          navigate("/list");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  
  
  
  return (
    <div className="container">
      <h3 className="alert alert-dismissible fade show">login user</h3>
      <form onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example3">
            Your Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" for="form3Example4">
            Your Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Enter password"
          />
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-lg pl-2 pr-2">
            Login Your Self
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Don't have an account?{" "}
            <Link className="link-danger" to={"/signin"}>
              Register Your Self
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};
