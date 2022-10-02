import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormControlStyles, useToast } from "@chakra-ui/react";
import { AiOutlineSetting } from "react-icons/ai";

function Project(props) {
  const toast = useToast();
  const navigate = useNavigate();
  
  return (
    <div className="project">
      <AiOutlineSetting
      style={{
        marginTop:"10px",
        height:"26px",
        width: "760px",
        clear:"both",
        float:"left",
      }}
      data-uniqueprojectid={props.uniqueProjectId}
              className="settings-icon"
              onClick={(e) => {
                e.preventDefault();
                navigate(`settings?project=${e.target.dataset.uniqueprojectid ?? "nullish"}`);
                props.onClose();
              }}
      />
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
            navigate(`/project?graphId=${e.target.dataset.uniqueprojectid ?? "null"}`);
          //}
        }}
      >
        View
      </button>
    </div>
  );
}

export default Project;
