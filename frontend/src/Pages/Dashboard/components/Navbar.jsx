import React from "react";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/Logo.svg";
import DrawerMenu from "../../../Drawer";

export default function Navbar(props) {
  return (
    <>
      <div id="navbar">
        <CgProfile onClick={props.onOpen} className="icon-dash" />
        <img className="logo-dash" src={logo} alt="..." />
      </div>
      <DrawerMenu onClose={props.onClose} isOpen={props.isOpen} />
      <div className="nav-back"></div>
    </>
  );
}
