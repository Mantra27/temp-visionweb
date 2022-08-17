import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import logo from "../../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div id="navbar">
        <FiArrowLeftCircle
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="icon-dash"
        />
        <img className="logo-dash" src={logo} alt="..." />
      </div>
    </>
  );
}
