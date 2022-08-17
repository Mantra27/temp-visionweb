import React from "react";
import { useNavigate } from "react-router-dom";

function Project(props) {
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
            <span style={{ color: "green", fontWeight: "600" }}>Online</span>
          ) : (
            <span style={{ color: "red", fontWeight: "600" }}>Offline</span>
          )}
        </p>
        
        <p>
          <strong>Description:</strong> {props.desc}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/project");
        }}
      >
        View
      </button>
    </div>
  );
}

export default Project;
