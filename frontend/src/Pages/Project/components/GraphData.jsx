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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from "@chakra-ui/react";

function GraphData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ProjectID = searchParams.get("graphId");
  const cycles = 0;
  const toast = useToast();
  const [editor, setEditor] = useState(0);
  const [ele, setEle] = useState({header: localStorage.getItem("parchuranheader"), footer:localStorage.getItem("parchuranfooter")})
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
    setInterval(() =>{
      console.log("request has been sent");
      axios.post("http://localhost:8080/db/get-data", {
          token: ProjectID, 
          secret: localStorage.getItem("token"),
        }).then((resolve)=>{

            let HEADERS = [];
            let VALUES = [];
            let LABELS = [];


            //that zeroth indexing can be fixed here
            resolve.data._values[0].Devices.map(async (value, key)=>{
              if(value.val){
                console.log(value.val)
              }
            })
            setContent({labels: HEADERS, datasets:VALUES})
      });
  
    }, 2000)
  }, [])

  return (
    <>
      <div className="data-container">
        <a id='graphdiv'>
        <div className="graph-content">
          <h2 id='headerdiv' style={{ marginTop: "2vh" }}>{ele.header}</h2>
          <Bar
          PROPS={content}/>
          <h2 id='footerdiv'>{ele.footer}</h2>
        </div>
        </a>
      </div>

      {/* left tool panel */}

      <div className="tools">
        <div className="tools-grp">
          <Menu placement={window.innerWidth < 700 ? "top" : "right"}>
            <MenuButton as={Button} className="tools-icon">
              <BsDownload />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => {
                  html2canvas(document.querySelector("#grid")).then(canvas => {
                    document.body.appendChild(canvas);  // if you want see your screenshot in body.
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgProps= pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0,0, pdfWidth, pdfHeight);
                    pdf.save("download.pdf"); 
                    document.querySelectorAll("canvas")[1].remove()
                  });

                  }}>PDF</MenuItem>
                <MenuItem onClick={(el)=>{
                { 
                  const canvas = document.getElementById("grid")
                  const imageURI = canvas.toDataURL("image/jpg")
                  document.getElementById("dbutton").href = imageURI;
                  console.log(imageURI)
                }
              }}><a download="example.jpg" id='dbutton' href="" onclick="downloadCanvas(this);">PNG</a></MenuItem>
                <MenuItem>Print</MenuItem>
            </MenuList>
          </Menu>
          <FiEdit2 onClick={
              ()=>{
                if(!editor){
                  toast({
                    title: "Header & Footer Editing Mode Enabled",
                    description: "You can click and edit Header and footer now",
                    status: "info",
                    position: "top-center",
                    duration: 4000,
                    isClosable: true,
                  });
                  setEditor(1);
                  document.getElementById("headerdiv").contentEditable = true;
                  document.getElementById("footerdiv").contentEditable = true;

                }
                else{
                  toast({
                    title: "Header & Footer Editing Mode Disabled",
                    description: "",
                    status: "info",
                    position: "top-center",
                    duration: 2000,
                    isClosable: true,
                  });
                  setEditor(0)
                  document.getElementById("headerdiv").contentEditable = false;
                  document.getElementById("footerdiv").contentEditable = false;

                  localStorage.setItem("parchuranheader", document.getElementById('headerdiv').innerText)
                  localStorage.setItem("parchuranfooter", document.getElementById('footerdiv').innerText)

                  axios.post("http://localhost:8080/configure-project", {secret: localStorage.getItem("token"), header:document.getElementById('headerdiv').innerText, footer: document.getElementById("footerdiv").innerText, project: ProjectID}).then(async (results)=>{
                    if(results.data.status != 200){
                      toast({
                        title: "something went wrong,",
                        description: "something went wrong while saving header and footer into server",
                        status: "info",
                        position: "top-center",
                        duration: 4000,
                        isClosable: true,
                      });
                    }
                  }).catch((error)=>{
                    console.log(error)
                  })
                }

              }
            }/>
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
