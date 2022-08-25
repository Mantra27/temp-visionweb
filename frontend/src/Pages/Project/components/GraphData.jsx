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
  const [content, setContent] = useState({
    //lables will be times values
    labels: ["0.0.0.0", "0.0.0.1"],
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
        label: "second",
        data: [93, 25],
        fill: false,
        borderColor: "#742774"
      }
    ]
  });
  useEffect(() => {
      axios.post("http://localhost:8080/api/get-data", {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbnRyYSIsImVtYWlsIjoiZ29oaWxtYW50cmFAZ21haWwuY29tIiwidGltZSI6MTY2MTMzNzU2OTY5OCwiaWF0IjoxNjYxMzM3NTY5fQ.U4ayvh7LlK2XOmQ5JTLnJjSyzD7uQ8rnbrytcXMjcig' 
        }).then((resolve)=>{
            setContent(resolve.data.data.metadata[0].Misc)
      });
  }, [])
  useEffect(() => {
    setInterval(() =>{
      console.log("request has been sent");
      axios.post("http://localhost:8080/api/get-data", {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbnRyYSIsImVtYWlsIjoiZ29oaWxtYW50cmFAZ21haWwuY29tIiwidGltZSI6MTY2MTMzNzU2OTY5OCwiaWF0IjoxNjYxMzM3NTY5fQ.U4ayvh7LlK2XOmQ5JTLnJjSyzD7uQ8rnbrytcXMjcig' 
        }).then((resolve)=>{
            setContent(resolve.data.data.metadata[0].Misc)
      });
  
    }, 5000)
  }, [])

  return (
    <>
      <div className="data-container">
        <div className="graph-content">
          <h2 style={{ marginTop: "2vh" }}>Header</h2>
          <Bar
          PROPS={content}/>
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
