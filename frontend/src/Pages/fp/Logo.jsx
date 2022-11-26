import React from "react";
import dicotLogo from "./logo_2_dicot 1.png";
import "./fp.css";

function Logo() {

  return(
<div className="main-logo">
   <img className="logoImage" src={dicotLogo} alt="" />
   <p className="text" id="headerText">
        Vision Web Password Recovery{" "}
      </p>

  </div>
  )
  


}

export default Logo;