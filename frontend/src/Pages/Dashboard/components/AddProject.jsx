import React from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
  
function AddProject(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  
  const [data, setData] = useState({
    ptitle:"",
    pdescription:"",
    plocation:""
  });

  const handleChange = async ({ currentTarget: input }) => {
    await setData({...data, [input.name]: input.value});
    console.log('set data called')
  };

  const onAdd = (add) =>{
    const connectionTimeout = setTimeout(() =>{
      toast({
        title: "Oops, Connection timed out!",
        description: "we're having trouble connecting to the server, make sure you an active and stable internet connection",
        status: "error",
        position: "top-right",
        duration: 7000,
        isClosable: true,
      });
    }, 4000);

    toast({
      title: "Trying to add new project",
      description: "request has been sent to the server, waiting for the response. This may take some time, please be patient.",
      status: "info",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });

    let flag = props.passdata(data);
    flag.then((data) => {
      console.log('flag:', data)
      if(data.flag){
        clearTimeout(connectionTimeout);
        onClose(); //closes the current popup
      }
    })
    
  }

  return (
    <>
      <div className="add-project" onClick={onOpen}>
        <AiOutlinePlus />
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add Project
            </AlertDialogHeader>

            <AlertDialogBody>
              <label htmlFor="project-title">
                Title:
                <input
                  type="text"
                  id="project-title"
                  placeholder="Project Title"
                  name="ptitle"
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="project-desc">
                Description:
                <input
                  type="text"
                  id="project-desc"
                  placeholder="Project Description"
                  onChange={handleChange}
                  name="pdescription"
                />
              </label>
              <label htmlFor="project-location">
                Location:
                <input
                  type="text"
                  id="project-location"
                  placeholder="Project Location"
                  onChange={handleChange}
                  name="plocation"
                />
              </label>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                className="cancel-button"
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button className="confirm-button" onClick={onAdd} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AddProject;