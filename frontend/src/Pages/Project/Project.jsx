import React, {useEffect} from "react";
import "./project.css";
import { FiArrowLeftCircle } from "react-icons/fi";
import logo from "../../assets/Logo.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import GraphData from "./components/GraphData";
import TableData from "./components/TableData";
import axios from "axios";

function Project() {
  console.log("hi")
  // const [searchParams, setSearchParams] = useSearchParams();
  // const ProjectID = searchParams.get("graphId");

  // const cycles = 0;

  // useEffect(() => {
  //   setInterval(() =>{
  //     console.log("request has been sent");
  //     axios.post("http://localhost:8080/db/get-values", {
  //         token: localStorage.getItem("token"), 
  //         projectId: ProjectID,
  //       }).then((resolve)=>{

  //           console.log(resolve.data.data)

  //     });
  
  //   }, 5000)
  // }, [])

  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Project";
    if (localStorage.getItem("token") == null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);

  return (
    <>
      <Tabs isFitted variant="unstyled">
        <div id="navbar">
          <FiArrowLeftCircle
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="icon-dash"
          />
          <img className="logo-dash" src={logo} alt="..." />
          <div className="data-select">
            <TabList>
              <Tab>Graph</Tab>
              <Tab>Table</Tab>
            </TabList>
          </div>
        </div>
        <div className="data-content">
          <TabPanels>
            <TabPanel>
              <GraphData />
            </TabPanel>
            <TabPanel>
              <TableData />
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs>
    </>
  );
}

export default Project;
