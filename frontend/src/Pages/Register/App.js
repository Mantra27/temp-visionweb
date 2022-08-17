import { Box, Center, Image } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {axios} from "axios";
import InputForm from './components/InputForm';
import dicot_img from '../../assets/Logo.svg'

const App = () => {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Register";
    if (localStorage.getItem("token") !== null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);
  return (
    <Box
      h="99vh"
      w="100vw"
      bgColor="#f1faee"
      m="auto"
      overflow="hidden"
      position="relative"
    >
      <Box h="100vh" w="100vw">
        <Box
          bgColor="#a8dadc"
          position="absolute"
          bottom={["9%", "9%", "13%"]}
          left={["5%", "5%", "7%"]}
          h={["85%", "85%", "79%"]}
          w={["90%", "90%", "85%"]}
          borderRadius="6vh"
        >
          <Box
            position="absolute"
            w={["90%", "60%", "50%"]}
            h={["20%", "20%", "30%"]}
            left={["20%", "30%", "10%"]}
            top={["0%", "0%", "12%"]}
            fontSize={["5.2vw", "4.5vw", "2.5vw"]}
            fontFamily="Roboto"
            fontWeight="500"
          >
            <Center mr={["20%"]} w={["70%"]}>
              <Image w={["100%"]} src={dicot_img} />
            </Center>
            <Center
              position="absolute"
              right={["1%", "10%", "2%"]}
              w={["100%", "100%", "96%"]}
            >
              <Box w={["100%"]}>Clean. Simple. Powerful.</Box>
            </Center>
          </Box>
        </Box>
        <Box
          position="absolute"
          h={["90%", "90%", "85%"]}
          bottom={["5%", "5%", "8%"]}
          left={["2%", "2%", "5%"]}
          w={["93%", "93%", "90%"]}
        >
          <FlexRow />
          <InputForm />
        </Box>
      </Box>
    </Box>
  );
};

const FlexRow = styled.div`
  background-color: #1d3557;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
`;

export default App;
