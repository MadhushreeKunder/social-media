import React from "react";
import "./App.css";
import { Home } from "./features/Home/home";
import Posts from "./features/posts/Posts";


function App() {
  return (
    <div>
      <Home />
      <Posts/>
    </div>
  );
}

export default App;
