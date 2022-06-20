import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Axios from "axios";
import "./App.css";

//My Components

import { ExampleContext } from "./ExampleContext";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import Header from "./components/Header";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import HeaderLogin from "./components/HeaderLogin";
import ShowProfile from "./components/ShowProfile";
import UpdatePw from "./components/Editpassword";
import UpdateEmail from "./components/EditEmail";
import CreateuserGroup from "./components/createusergroup";
import ShowUsergroup from "./components/Listusergroup";
import Application from "./components/Application";
import CreateApplication from "./components/CreateApplication";
import Kaabanboard from "./components/Kaabanboard";
import CreatePlan from "./components/CreatePlan";

Axios.defaults.baseURL = "http://localhost:3001";

function Main() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("username"))
  );
  const [UserLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem("usergroup")
  );
  const [usernamestore, setUsername] = useState(
    localStorage.getItem("username")
  );

  return (
    <ExampleContext.Provider
      value={{
        usernamestore,
        setUsername,
        setLoggedIn,
        UserLoggedIn,
        setUserLoggedIn,
        loggedIn,
      }}
    >
      <BrowserRouter>
        {loggedIn ? <HeaderLogin /> : <Header />}
        <div>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={loggedIn ? <ShowProfile /> : <LogOut />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/UserProfile" element={<UserDashboard />} />
            <Route path="/user/editpw/:username" element={<UpdatePw />} />
            <Route path="/user/editEmail/:username" element={<UpdateEmail />} />
            <Route path="/listusergroup" element={<ShowUsergroup />} />
            <Route path="/createusergroup" element={<CreateuserGroup />} />
            <Route path="/application" element={<Application />} />
            <Route path="/create-application" element={<CreateApplication />} />
            <Route path="/application/:appname" element={<Kaabanboard />} />
            <Route path="/create-plan/:appname" element={<CreatePlan />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
