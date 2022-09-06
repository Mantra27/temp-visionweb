import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormControlStyles, useToast } from "@chakra-ui/react";


function Project(props) {
  const toast = useToast();
  const navigate = useNavigate();
  
  return (
    <div className="project">
      <div className="project-details">
        <p>
          <strong>Project Name:</strong> {props.projectName}
        </p>
        <p>
          <p>
          <strong>Location:</strong> {props.location}
        </p>
          <strong>Status:</strong>{" "}
          {props.onlineStatus ? (
            <span style={{ color: "green", fontWeight: "600" }}>Connected</span>
          ) : (
            <span style={{ color: "red", fontWeight: "600" }}>No Connection</span>
          )}
        </p>
        
        <p>
          <strong>Description:</strong> {props.desc}
        </p>
      </div>
      <button 
      data-uniqueprojectid={props.uniqueProjectId}
        onClick={(e) => {

          // if(e.target.dataset.uniqueprojectid){
          //   e.preventDefault()
          //   navigate("/project")
          //   setTimeout(() => {
          //     navigate(`/`);
          //   }, 1000);

          //   toast({
          //     title: "Something Went wrong,",
          //     description: "tried to access non existing(server) project component", 
          //     status: "error",
          //     position: "top-right",
          //     duration: 7000,
          //     isClosable: true,
          //   });

          // }
          //else{
            e.preventDefault();
            navigate(`/project?graphId=${e.target.dataset.uniqueprojectid ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbnRyYSIsImVtYWlsIjoiZ29oaWxtYW50cmFAZ21haWwuY29tIiwidGltZSI6MTY2MTMzNzU2OTY5OCwiaWF0IjoxNjYxMzM3NTY5fQ.U4ayvh7LlK2XOmQ5JTLnJjSyzD7uQ8rnbrytcXMjcig"}`);
          //}
        }}
      >
        View
      </button>
    </div>
  );
}

export default Project;