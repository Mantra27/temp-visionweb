import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Logo from "./Logo.jsx";
import Input from "./Input";
import { useMediaQuery } from "react-responsive";

function App() {
  return (
    <div className="main-div">
      <Logo />
      <Input />
    </div>
  );
}

export default App;
