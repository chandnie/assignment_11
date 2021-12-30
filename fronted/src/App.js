import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./components/login";
import { useState } from "react";
import UserList from "./components/userList";
import Register from "./components/register";
import EditUser from "./components/editUser";
function App() {
  const [userDetail, setUserDetail] = useState();
  console.log("userDetail", userDetail);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/list"
          element={
            <UserList userDetail={userDetail} setUserDetail={setUserDetail} />
          }
        />
        <Route path="/" element={<Login setUserDetail={setUserDetail} />} />
        <Route path="/signin" element={<Register />} />
        <Route
          path="/edit/:id"
          element={
            <EditUser userDetail={userDetail} setUserDetail={setUserDetail} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
