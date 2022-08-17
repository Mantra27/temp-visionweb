import { Box, Image, Button, Center, Text, Input } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import logo from "../assets/Logo.svg";

const PasswordInput = ({ field }) => {
  return (
    <Box>
      <Box
        position="relative"
        display={["block", "block", "inline-block"]}
        ml="2.5vw"
        mt={["2vh", "2vh", "5vh"]}
        w={["45%", "30%"]}
      >
        <Text fontSize={["5vw", "3.4vw", "1.5vw"]} fontWeight="400">
          {field}
        </Text>
      </Box>
      <Box
        display={["block", "block", "inline-block"]}
        position="relative"
        ml={["2.5vw", "2.5vw", "5vw"]}
        mt={["2%", "2%", "auto"]}
        w={["60%", "50%"]}
      >
        <Input
          borderRadius="0"
          ml={["0", "0", "5%"]}
          h="6.3vh"
          bgColor="white"
        />
      </Box>
    </Box>
  );
};

const ChangePassword = ({ setChangePassword }) => {
  return (
    <Box h="100%" w="100%">
      <Box w="100%" h={["8%", "8%", "10%"]} bgColor="#A8DADC">
        <Center
          position="relative"
          display="inline-block"
          bottom="45%"
          left="0.5%"
        >
          <Button
            h="4.2vh"
            w="4.2vh"
            borderRadius="50%"
            border="1.8px solid black"
            size="sm"
            bgColor="#A8DADC"
            onClick={() => {
              setChangePassword(false);
            }}
            _hover={{
              background: "white",
              color: "black",
              border: "1px solid #1D3557",
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Center>
        <Image
          ml="1.5vh"
          position="relative"
          display="inline-block"
          bottom="8%"
          h="100%"
          src={logo}
        />
      </Box>
      <Center h="90%" w="100%">
        <Box
          h={["90%", "90%", "85%"]}
          boxShadow="2px 2px 2px #A8A8A8"
          w={["95%", "95%", "60%"]}
          bgColor="#F1FAEE"
        >
          <Text
            ml="2vw"
            mt="2vh"
            fontSize={["7vw", "4vh", "2.4vw"]}
            fontWeight="600"
          >
            Change Password
          </Text>
          <Box mt="1%" ml="3%" w="94%" h="1px" bg="black" />
          <Box position="relative" left={["1vw"]} top={["3vh", "4vw", "6%"]}>
            <Box
              position="relative"
              display={["block", "block", "inline-block"]}
              ml="2.5vw"
              w={["45%", "30%"]}
            >
              <Text fontSize={["5vw", "3.4vw", "1.5vw"]} fontWeight="400">
                User Name
              </Text>
            </Box>
            <Box
              display={["block", "block", "inline-block"]}
              position="relative"
              ml={["2.5vw", "2.5vw", "5vw"]}
              w="50%"
            >
              <Text
                position="reletive"
                ml={["0", "0", "5%"]}
                fontSize={["5vw", "3.4vw", "1.5vw"]}
                fontWeight="300"
              >
                Brad Joey
              </Text>
            </Box>
            <PasswordInput field={"Current Password"} />
            <PasswordInput field={"New Password"} />
            <PasswordInput field={"Confirm Password"} />
          </Box>
          <Center mt={["10vh", "", "12vh"]} w="100%" h={["5vh", "5vh", "3vw"]}>
            <Button
              w={["60%", "40%", "30%"]}
              h="100%"
              bgColor="#A8DADC"
              fontWeight="600"
              boxShadow="2px 2px 2px #A8A8A8"
              fontSize={["4.8vw", "3.8vw", "1.6vw"]}
            >
              Change Password
            </Button>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default ChangePassword;
