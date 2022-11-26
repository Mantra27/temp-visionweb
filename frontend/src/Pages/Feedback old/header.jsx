import React from "react";
import logo from "../../assets/Logo.svg";
import { CgProfile } from "react-icons/cg";
import Navbar from "../Dashboard/components/Navbar"
import { useNavigate } from "react-router-dom";

function Header(props) {
const navigate = useNavigate();

  return (
    <>
      <div id="navbar" className="bg-white">
        <CgProfile onClick={props.onOpen} className="icon-dash" />
        <img className="logo-dash"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              props.onClose();
            }} src={logo} alt="..." />
      </div>
    </>
  );
}

export default Header;
