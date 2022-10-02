import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.svg";
import DrawerMenu from "../../../Drawer";
function Navbar(props) {
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
        <img className="logo-dash" src={logo} alt="..." 
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                props.onClose();
              }}/>
      </div>
      <DrawerMenu onClose={props.onClose} isOpen={props.isOpen} />
      <div className="nav-back"></div>
    </nav>
  );
}

export default Navbar;
