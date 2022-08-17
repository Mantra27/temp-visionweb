import { Box, Button, Center, Image } from "@chakra-ui/react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

import logo from "../assets/Logo.svg";

const Slideshow = ({
  projectClicked,
  setProjectClicked,
  projects,
  setProjects,
}) => {
  return (
    <Box position="absolute" h="100%" w="100%" bgColor="#EFF6EC">
      <Box position="relative" h="8%" w="100%" bgColor="#A8DADC">
        <Button
          position="relative"
          display="inline-block"
          h="4.5vh"
          w="4.5vh"
          ml="0.5%"
          mr="0.5%"
          fontSize="4.5vh"
          size="inherit"
          bottom="44%"
          bgColor="#A8DADC"
          borderRadius="100%"
          onClick={() => {setProjectClicked(-1)}}
        >
          <BsArrowLeftCircle />
        </Button>
        <Image
          position="relative"
          display="inline-block"
          bottom="8%"
          h="100%"
          src={logo}
        />
      </Box>
      <Box
        position="relative"
        top="3.5%"
        left={["10%", "20%"]}
        h={["76%","80%"]}
        w={["80%", "60%"]}
        bgColor="#A8DADC"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="10px"
      >
        {projects[projectClicked]}
      </Box>
      <Center
        position="fixed"
        bottom="4%"
        right="3%"
        h="7vh"
        w="7vh"
        borderRadius="50%"
        fontSize="5vh"
        color="white"
        bgColor="#C2202C"
        _hover={{
          background: "white",
          bgColor: "black",
          border: "1px solid #1D3557",
          cursor: "pointer",
        }}
        onClick={() => {
          setProjects([...projects, ""]);
        }}
      >
        <BiPlus />
      </Center>
      {projectClicked > 0 && (
        <Button
          position="absolute"
          left={["2%", "8%"]}
          top={["46%", "43%"]}
          borderRadius="100%"
          size={["5vh", "10vh"]}
          fontSize={["5vh", "10vh"]}
          bgColor="#EFF6EC"
          onClick={() => {
            setProjectClicked(projectClicked - 1);
          }}
        >
          <VscChevronLeft />
        </Button>
      )}
      {projectClicked < projects.length - 1 && (
        <Button
          position="absolute"
          right={["2%", "8%"]}
          top={["46%", "43%"]}
          borderRadius="100%"
          size={["5vh", "10vh"]}
          fontSize={["5vh", "10vh"]}
          bgColor="#EFF6EC"
          onClick={() => {
            setProjectClicked(projectClicked + 1);
          }}
        >
          <VscChevronRight />
        </Button>
      )}
    </Box>
  );
};

export default Slideshow;
