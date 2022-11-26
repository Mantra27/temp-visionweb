import React from "react";
import logo from "../../assets/Logo.svg";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div id="navbar">
        <CgProfile onClick={props.onOpen} className="icon-dash" />
        <img className="logo-dash" src={logo} alt="..." onClick={(e)=>{
          e.preventDefault();
          navigate("/test");
          props.onClose();
        }}/>
      </div>

      <div className="texting">
        <p id="text">Feedback and Support</p>
      </div>
    </div>
  );
}

export default Header;
