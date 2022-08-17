import React from "react";
import "./fp.css";

function Input() {
  return (
    <div className="input" id="input-container">
      <p className="text" id="headerText">
        Vision Web Password Recovery{" "}
      </p>
      <input type="text" className="center" placeholder="Enter Email Id" />{" "}
      <br />
      <button type="button" className="submit_button">
        Send
      </button>
      <p className="text2">
        New to Vision Web?{" "}
        <a className="registerText" href="">
          Register
        </a>
      </p>
    </div>
  );
}

export default Input;
