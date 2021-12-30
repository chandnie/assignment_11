import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUser(props) {
  //   console.log(props.match.params.id);
  console.log("userDetail", props.userDetail);
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState();

  useEffect(() => {
    if (!props.userDetail) {
      navigate("/");
    } else {
      setFirstname(props.userDetail.firstname);
      setLastname(props.userDetail.lastname);
      setEmail(props.userDetail.email);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/update/" + props.userDetail._id, { firstname, lastname, email })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          props.setUserDetail(res.data);
          alert("edit success");
          navigate("/list");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className="container" style={{ marginTop: 10 }}>
      <h3 className="alert alert-dismissible fade show">edit user</h3>
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
        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-lg pl-2 pr-2">
            Edit User
          </button>
        </div>
      </form>
    </div>
  );
}
