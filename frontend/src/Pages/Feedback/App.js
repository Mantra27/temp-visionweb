import React from "react";
import Header from "./header";
import Input from "./input-field.jsx";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../../Drawer.jsx";

function App(props) {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Feedback";
    if (localStorage.getItem("token") == null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);
  return (
    <div id="feedback">
      <DrawerMenu onClose={props.onClose} isOpen={props.isOpen} />
      <Header onOpen={props.onOpen} />
      <Input />
    </div>
  );
}

export default App;
