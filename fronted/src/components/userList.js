import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserList(props) {
  let navigate = useNavigate();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    if (!props.userDetail) {
      navigate("/");
    }
    axios
      .get("/getUsers")
      .then((Response) => {
        setList(Response.data);
        setSearch(Response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const update = (e) => {
    let searchValue = e.target.value;
    const searchString = searchValue.trim().toLowerCase();
    if (searchString.length > 0) {
      setList(
        search.filter((a) => a.firstname.toLowerCase().match(searchString))
      );
    } else {
      setList(search);
    }
  };
  const deleteUser = (id) => {
    axios
      .delete("/delete/" + id)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          props.setUserDetail("");
          alert("deleete success");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className="container">
      <h1>User List</h1>
      <input
        className="form-control mb-2"
        placeholder="Search users..."
        onChange={(e) => update(e)}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0
            ? list.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    {user._id === props?.userDetail?._id && (
                      <>
                        <Link
                          className="btn btn-primary"
                          to={"/edit/" + user._id}
                        >
                          Edit
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <button
                          type="submit"
                          className="btn btn-danger"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
