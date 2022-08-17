import { useState } from "react";

import { Box, Center, Image, Button, Text } from "@chakra-ui/react";
import { BiUser, BiPlus } from "react-icons/bi";
import logo from "../assets/Logo.svg";

const Projects = ({ showMenu, setShowMenu, projects, setProjects, setProjectClicked}) => {

  return (
    <Box position="absolute" h="100%" w="100%">
      <Box
        position="relative"
        filter={showMenu ? "blur(3px)" : "blur(0)"}
        h="8%"
        w="100%"
        bgColor="#A8DADC"
      >
        <Center
          display="inline-block"
          ml="0.5vw"
          position="relative"
          fontSize="3vh"
          bottom="40%"
          left="0.5%"
          color="#A8DADC"
        >
          <Button
            h="5vh"
            w="5vh"
            size="fit-content"
            color="black"
            fontSize="4vh"
            borderColor="black"
            bgColor="#797CD9"
            borderRadius="100%"
            onClick={() => {
              setShowMenu(true);
            }}
            _hover={{
              background: "white",
              color: "black",
              border: "1px solid #1D3557",
            }}
          >
            <BiUser />
          </Button>
        </Center>
        <Image
          position="relative"
          display="inline-block"
          bottom="8%"
          h="100%"
          ml={["2vw", "2vw", "1vw"]}
          src={logo}
        />
      </Box>
      <Box
        w="100%"
        h="92%"
        filter={showMenu ? "blur(3px)" : "blur(0)"}
        display="flex"
        bgColor="#EFF6EC"
      >
        <Box mt={["10%", "10%", "4%"]} ml="3%" w="94%">
          {projects.map((obj, key) => (
            <Box
              display="inline-block"
              h={["38%", "50%", "40%"]}
              w={["86%", "90%", "28%"]}
              mb={["10%", "10%", "4%"]}
              ml={key % 3 ? ["7%", "5%", "8%"] : ["7%", "5%", "0%"]}
              borderRadius={["3vw", "3vw", "0.8vw"]}
              bgColor="#A8DADC"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            >
              {obj}
              <Button
                position="relative"
                top="80%"
                bgColor="#455874"
                color="white"
                w="100%"
                h="20%"
                borderRadius="0"
                borderBottomRightRadius={["3vw", "3vw", "0.8vw"]}
                borderBottomLeftRadius={["3vw", "3vw", "0.8vw"]}
                onClick={() => setProjectClicked(key)}
                _hover={{
                  bgColor: "black",
                }}
              >
                View
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <Center
        position="fixed"
        bottom="4%"
        right="3%"
        h="7vh"
        w="7vh"
        filter={showMenu ? "blur(3px)" : "blur(0)"}
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
        onClick={() => {setProjects([...projects, ""])}}
      >
        <BiPlus />
      </Center>
    </Box>
  );
};

export default Projects;
