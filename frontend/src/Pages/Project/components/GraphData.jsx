import {ReactHTMLElement, useState, useEffect} from "react";
import graph from "../../../assets/graph.png";
import { BsDownload } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import scaleIcon from "../../../assets/scale-icon.png";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import Bar from './bar';
import axios from "axios";

function GraphData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ProjectID = searchParams.get("graphId");
  const [content, setContent] = useState({});
  let cycles = 0;

  useEffect(() => {
    setInterval(() =>{
      console.log("request has been sent");
      axios.post("http://localhost:8080/db/get-values", {
          token: localStorage.getItem("token"), 
          projectId: ProjectID,
        }).then((resolve)=>{
          if(cycles == 0){
            console.log(resolve.data.data)
            setContent(resolve.data.data)
          }
      });
  
    }, 5000)
  }, [])

  return (
    <>
      <div className="data-container">
        <div className="graph-content">
          <h2 style={{ marginTop: "2vh" }}>Header</h2>
          <Bar
          PROPS={{
            //lables will be times values
            labels: ["lamb", "thermo"],
            datasets: [
              {
                //this lable will be header name
                label: "first header",
                data: [33, 53],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              {
                //this lable will be header name
                label: "second header",
                data: [93, 25],
                fill: false,
                borderColor: "#742774"
              }
            ]
          }}/>
          <h2>Footer</h2>
        </div>
      </div>

      {/* left tool panel */}

      <div className="tools">
        <div className="tools-grp">
          <Menu placement={window.innerWidth < 700 ? "top" : "right"}>
            <MenuButton as={Button} className="tools-icon">
              <BsDownload />
            </MenuButton>
            <MenuList>
              <MenuItem>PDF</MenuItem>
                <MenuItem>PNG</MenuItem>
                <MenuItem>Print</MenuItem>
            </MenuList>
          </Menu>
          <FiEdit2 />
          <Menu placement="right">
            <MenuButton as={Button} className="tools-icon">
              <IoIosColorPalette />
            </MenuButton>
            <MenuList>
              <MenuItem>Manual</MenuItem>
              <MenuItem>Auto</MenuItem>
            </MenuList>
          </Menu>
          <img src={scaleIcon} alt="..." />
        </div>
      </div>
    </>
  );
}

export default GraphData;
