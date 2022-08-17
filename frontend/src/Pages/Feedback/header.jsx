import React from "react";
import logo from "../../assets/Logo.svg";
import { CgProfile } from "react-icons/cg";

function Header(props) {
  return (
    <div>
      <div id="navbar">
        <CgProfile onClick={props.onOpen} className="icon-dash" />
        <img className="logo-dash" src={logo} alt="..." />
      </div>

      <div className="texting">
        <p id="text">Feedback and Support</p>
      </div>
    </div>
  );
}

export default Header;
