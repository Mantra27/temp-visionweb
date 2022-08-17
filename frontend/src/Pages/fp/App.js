import React from "react";
import ReactDOM from "react-dom";
import "./fp.css";
import Logo from "./Logo.jsx";
import Input from "./Input";
import { useMediaQuery } from "react-responsive";

function App() {
  React.useLayoutEffect(() => {
    document.title = "Fp";
  }, []);
  return (
    <div className="main-div">
      <Logo />
      <Input />
    </div>
  );
}

export default App;
