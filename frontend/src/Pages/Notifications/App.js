import { Box, Text, Button, Image, Center } from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "../../assets/Logo.svg";

function App() {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Notifications";
    if (localStorage.getItem("token") == null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);

  return (
    <Box w="99.9vw" h="99.9vh" bgColor="#f1faee">
      <Box w="100%" h="8%">
        <Image
          position="relative"
          display="inline-block"
          bottom="10%"
          w={["25%","15%"]}
          src={logo}
        />
        <Text
          position="absolute"
          top="-1%"
          display="inline-block"
          left={["29%","36%"]}
          fontSize={["8vw", "5vw", "4vw"]}
          fontWeight="700"
        >
          Notifications
        </Text>
        <Button
          
          position="absolute"
          bgColor="#f1faee"
          left={["85%","91%","94%"]}
          h={["3%","5%","6%"]}
          mt="1%"
          display="inline-block"
          fontSize={["7vw", "4vw", "3vw"]}
          fontWeight="700"
          onClick={(e) => {
            e.preventDefault();
            navigate("/settings");
          }}
        >
          <AiFillSetting />
        </Button>
        <Box h="1.5px" w="100%" fontWeight="700" bgColor="black" />
      </Box>
      <Box id="appbox" w={["93.5%","92.5%","95%"]} mt={["1%","3.5%"]} h={["88vh","84vh","80vh"]}>
        <Box position="absolute" top="8%" left="4%">
          <Box
            className="notification"
            mb={["4%","2%"]}
            display="flex"
            alignItems="center"
          >
            <Text className="nottext" fontSize={["5vw", "4vw", "2vw"]} w="70%">
              Boiler Reacher Max Temp
            </Text>

            <Box w="100%" display="flex" justifyContent="flex-end">
              <Text fontSize={["5vw", "4vw", "2vw"]}>4h</Text>
              <Button
                borderRadius="35px"
                height="100%"
                bgColor="#A8DADC"
                fontSize={["8vw", "6vw", "3vw"]}
              >
                <BiDotsVerticalRounded />
              </Button>
            </Box>
          </Box>
          <Box
            className="notification"
            mb={["4%","2%"]}
            display="flex"
            alignItems="center"
          >
            <Text className="nottext" fontSize={["5vw", "4vw", "2vw"]} w="70%">
              Boiler settings were changed by Admin
            </Text>
            <Box w="100%" display="flex" justifyContent="flex-end">
              <Text fontSize={["5vw", "4vw", "2vw"]}>4h</Text>
              <Button
                borderRadius="35px"
                height="100%"
                bgColor="#A8DADC"
                fontSize={["8vw", "6vw", "3vw"]}
              >
                <BiDotsVerticalRounded />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
