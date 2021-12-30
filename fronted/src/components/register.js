import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/register", { firstname, lastname, email, password })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          alert("register success");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="container" style={{ marginTop: 10 }}>
      <h3 className="alert alert-dismissible fade show">Create account</h3>
      <form onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example3">
            Your First Name
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Enter first name"
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example3">
            Your Last Name
          </label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Enter last name"
          />
        </div>
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
            Register Your Self
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Don't have an account?{" "}
            <Link className="link-danger" to={"/"}>
              login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
