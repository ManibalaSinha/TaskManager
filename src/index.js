import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppointmentTracker from "./AppointmentTracker";
//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppointmentTracker />);
