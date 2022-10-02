import React from "react";
import axios from "axios";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

function Input() {
  // const submit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/api/feedback",
  //       data: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

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

  const [data, setData] = useState(null);
  const toast = useToast();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input]: input.value });
    console.log(input);
  };

  return (
    <>
      <div className="parent-div-feedback">
        <div className="title">Feedback and Support</div>
        <div className="feedback-form">
          <div className="input-field">
            <div className="all-inputs">
              <input
                className="input-unique"
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <input
                className="input-unique"
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="input-unique"
                onChange={handleChange}
                placeholder="Subject"
              />
              <input
                className="input-unique"
                onChange={handleChange}
                placeholder="Contact"
              />
              <input
                className="input-unique"
                onChange={handleChange}
                placeholder="Feedback"
              />
            </div>
          </div>
          <div className="links-for-feedbackform">
            <label for="file-upload" className="custom-upload">
              Custom Upload
            </label>
            <input
              style={{ color: "transparent", display: "none" }}
              name="proof"
              id="file-upload"
              type="file"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Input;
