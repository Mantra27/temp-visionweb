import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav id="navbar">
      <div className="container">
        <BsArrowLeftCircle
          className="back"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        />
        <img className="logo-settings" src={logo} alt="..." />
      </div>
    </nav>
  );
}

export default Navbar;
