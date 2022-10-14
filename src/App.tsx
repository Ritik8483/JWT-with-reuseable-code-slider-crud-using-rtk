import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./components/Home";
import { useSelector } from "react-redux";

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
          <Route path="/home" element={<Home />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
