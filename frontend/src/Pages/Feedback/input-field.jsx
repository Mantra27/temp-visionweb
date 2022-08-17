import React from "react";
import axios from "axios";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {useState} from 'react'

function Input() {

  
  const submit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/feedback",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  
  // const [name, email, subject, contact, feedback] = [document.getElementById("ipt1").value, document.getElementById("ipt2").value, document.getElementById("ipt3").value, document.getElementById("ipt4").value, document.getElementById("ipt5").value];
  // axios.post("http://localhost:8080/api/feedback", {name:name, email:email, subject:subject, contact:contact, feedback}).then((results)=>{

  //  if(results.data.status == 404){
  //   toast({
  //     title: "Something went wrong!",
  //     description: "something is missing from input fields",
  //     status: "error",
  //     position: "top-right",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //  } 
   
  // if(results.data.status == 200){
  //   toast({
  //     title: "Feedback submitted!",
  //     description: "we've notified our team, we'll shortly evaluate your feedback/support",
  //     status: "success",
  //     position: "top-right",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  // }
  // })  

const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <>
      <div className="main-back-div" id="back-div"></div>
      <div className="third-back-div"></div>
      <div className="secondary-back-div">
        <input type="text" id="ipt1" className="input1" placeholder="Enter your Name" />
        <input type="email" id="ipt2" className="input2" placeholder="Email" />
        <input type="text" id="ipt3" className="input3" placeholder="Subject" />
        <input type="contact" id="ipt4" className="input4" placeholder="Contact" />
        <input type="text" id="ipt5" className="input5" placeholder="Feedback" />
        <div>
          <label for="file-upload" className="submit_button2">
            Custom Upload
        </label>
        <input style={{color: "transparent", display: "none"}} name="proof" id="file-upload" type="file" onChange={handleFileSelect}/>
          <button type="submit" className="submit_button1" onClick={submit}>
            Submit  
          </button>
        </div>
      </div>
    </>
  );
}

export default Input;
