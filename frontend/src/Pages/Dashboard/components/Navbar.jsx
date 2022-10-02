import React from "react";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/Logo.svg";
import DrawerMenu from "../../../Drawer";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    <>
      <div id="navbar">
        <CgProfile onClick={props.onOpen} className="icon-dash" />
        <img className="logo-dash" src={logo} alt="..." 
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                props.onClose();
              }}/>
      </div>
      <DrawerMenu onClose={props.onClose} isOpen={props.isOpen} />
      <div className="nav-back"></div>
    </>
  );
}
