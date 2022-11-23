import {ReactHTMLElement, useState, useEffect} from "react";
import graph from "../../../assets/graph.png";
import { BsArrowCounterclockwise, BsDownload } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import scaleIcon from "../../../assets/scale-icon.png";
import { Menu, MenuButton, MenuList, MenuItem, Button, cookieStorageManager, color } from "@chakra-ui/react";
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
  const [ele, setEle] = useState({header: localStorage.getItem("parchuranheader"), footer:localStorage.getItem("parchuranfooter")});

  function genColor() {
    return `rgba(${Math.floor(Math.random() * (250 - 1 + 1)) + 1},${Math.floor(Math.random() * (250 - 1 + 1)) + 1},${Math.floor(Math.random() * (250 - 1 + 1)) + 1},${Math.floor(Math.random() * (250 - 1 + 1)) + 1})`
  }
  
  let colors = [];
  for(let i = 0; i<100; i++){
    colors[i] = genColor();
  }

  const dataSet = {
  labels: ['14:31:18', '14:31:43', '14:32:08', '14:31:33', '14:31:58', '14:32:23'],
  datasets: [
    {
      //this lable will be header name
      label: "Controller1_pv",
      data: [32.2, 31.3, 32.1, 31.7, 32, 31.4, 31.8],
      fill: true,
      backgroundColor: "rgba(70,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      //this lable will be header name
      label: "Controller1_sv",
      data: [10, 20, 4, 32, 18, 42],
      fill: false,
      borderColor: "#742774"
    }
  ]}


  const [content, setContent] = useState(dataSet);
  useEffect(()=>{

    const dataSet2 = {
      labels: ['14:31:18', '14:31:43'],
      datasets: [
        {
          //this lable will be header name
          label: "Controller1_pv",
          data: [32.2, 31.8],
          fill: true,
          backgroundColor: "rgba(70,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          //this lable will be header name
          label: "Controller1_sv",
          data: [10, 20],
          fill: false,
          borderColor: "#742774"
        }
      ]}

      let _draft = [{}];

    setInterval(() => {
      axios.post("http://localhost:8080/db/get-data", {secret: localStorage.getItem("token"), token: ProjectID}).then(async (results)=>{
        if(!results?.data?._values) {console.log("something went wrong while fetching data")}
      
        let HEADERS = [];
        let LABELS = [];
        console.log(results.data._values[0].Devices)
        results.data._values[0].Devices.map((_values, _key)=>{
          let internalProjectsValues = [];
          _values.val.map((__val, __key)=>{
            let _date = `${new Date(__val.val.time).getDay()} - ${new Date(__val.val.time).getHours()}: ${new Date(__val.val.time).getMinutes()}: ${new Date(__val.val.time).getSeconds()}`
            LABELS[__key] = _date;
            internalProjectsValues[internalProjectsValues.length] = __val.val.val ?? __val.val;
          });

          HEADERS[_key] = {
            label: _values.Header ,
            data: internalProjectsValues,
            fill: true,
            backgroundColor: "rgba(70,192,192,0.2)",
            borderColor: colors[_key]
          }

        });
        console.log(LABELS)
        _draft = {
          labels: LABELS,
          datasets: HEADERS
        };

        //draft will be the final component to render
        console.log(_draft);

      });

      setContent(_draft);
      console.log('_--------');
    }, 3000);


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
