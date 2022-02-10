import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { NavLink } from "react-router-dom";
import { Home } from "./features/Home/home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
