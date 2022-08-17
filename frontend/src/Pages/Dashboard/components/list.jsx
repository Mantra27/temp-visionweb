import {React, useState} from "react";
import Project from "./Project";

function list(props) {
console.log(props);
  return (
    <div id="projects">
      {props.map((project, key) => (
        <Project
          key={key}
          projectName={project.projectName}
          onlineStatus={project.projectOnlineStatus}
          desc={project.desc}
        />
      ))}
    </div>
  );
}

export default list;