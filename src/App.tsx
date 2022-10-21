import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import Details from "./components/Details";
import ReactDnd from "./ReactDND/ReactDnd";

function App() {
  const stateToken = useSelector((state: any) => state?.authReducer?.userToken);
  const localStorageToken = JSON.parse(localStorage.getItem("token") || "{}");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="home" element={<Home />} />
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/react-dnd" element={<ReactDnd />} />
          {/* <Route path="/home/dashboard/details/:id" element={<Details />} /> */}
          <Route path="/home/dashboard/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
