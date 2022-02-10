import React from "react";
import "./App.css";
import { Header } from "./features/Header/header";
import Posts from "./features/posts/Posts";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/posts" element={<Posts />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
