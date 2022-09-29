import {React, useState, useEffect} from "react";
import Project from "./Project";
import AddProject from "./AddProject";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function Projects() {
  const toast = useToast();
  //initial sets

    useEffect(() =>{
      axios.post("http://localhost:8080/api/getprojects", {token: localStorage.getItem("token")}).then(async (results)=>{
      const draft = [];
      
      await results.data.message.metadata.map(async (value, key)=>{
        draft[key] = {
            projectName: value.Project,
            uniqueProjectId: value.Project_id,
            location: value.Location,
            desc: value.Description,
            projectOnlineStatus: value.IsVerified
        }
      });
      console.log(draft)
        setProjectList(draft);
    });
    }, [])


  const [projectList, setProjectList] = useState([]);

  const passdata = async (passedData) => {
    
    //update database first
    return axios.post("http://localhost:8080/api/addproject", {token: localStorage.getItem("token"), projects: [{

      projectName: passedData.ptitle,
      projectOnlineStatus: false,
      location:passedData.plocation,
      desc: passedData.pdescription

    }]}).then(async (results)=>{
      if(results.data.status == 200){

        toast({
          title: "New project added successfully",
          description: "Yey, You successfully created a new project",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });

        await setProjectList([...projectList, {
          
          projectName: passedData.ptitle,
          projectOnlineStatus: false,
          location:passedData.plocation,
          desc: passedData.pdescription,
          uniqueProjectId: results.data.uuid,
          
        }]);

        return {flag: true, message: 'new data added successfully!'};
      }

      else{
        toast({
          title: "can't add a new project!",
          description: `something bad happened while creating a new project`,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        return {flag: false, message: `${results.data.message}`};
      }
    });

  };
  
  return (
    <div id="projects">
      {projectList.map((project, key) => (
        <Project
          uniqueProjectId={project.uniqueProjectId}
          key={key}
          projectName={project.projectName}
          onlineStatus={project.projectOnlineStatus}
          desc={project.desc}
          location={project.location}
        />
      ))}
      <AddProject passdata = {passdata}/>
    </div>
  );
}

export default Projects;