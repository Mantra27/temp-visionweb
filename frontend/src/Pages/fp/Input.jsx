import React from "react";
import { useNavigate } from "react-router-dom";
import "./fp.css";

function Input() {
  const navigate = useNavigate();
  return (
    <>

      <p className="text" id="headerText">
        Vision Web Password Recovery{" "}
      </p>

      <div className="input" id="input-container">

        <input type="text" className="center" placeholder="Enter Email Id" />{" "}
        <br />
        <button type="button" className="submit_button">
          Send
        </button>
        <p className="text2">
          New to Vision Web?{" "}
          <a className="registerText" href="/auth/register">
            Register
          </a>
        </p>
      </div>
    </>
  );
}

export default Input;
