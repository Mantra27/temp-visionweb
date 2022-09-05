import React from "react";
import { useNavigate } from "react-router-dom";

import Bg from "./components/Bg";
import "./components/dash.css";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

function App(props) {
  const navigate = useNavigate();

//   const googlesignincheck = async (e) => {

//     const url = "http://localhost:8080/wh/setToken";
//     const Data = await
//     axios.post(url, {request:"from dashboard"});
//     console.log(Data.data)
//     if(Data.data.statusCode == 'ok'){navigate("/");}
// };

// googlesignincheck();

  React.useLayoutEffect(() => {
    document.title = "Dashboard";
    if (localStorage.getItem("token") == null) {
      setTimeout(() => {
      console.log("dashie dashie null")
      //condition if not logged in
      navigate("/auth/login");
      }, 50);
    } // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar
        onOpen={props.onOpen}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <Projects />
      <Bg />
    </>
  );
}

export default App;
