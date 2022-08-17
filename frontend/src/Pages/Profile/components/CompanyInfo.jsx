import { Box, Center, Image, Text, Button } from "@chakra-ui/react";
import { EditIcon, LockIcon, ArrowBackIcon } from "@chakra-ui/icons";

import logo from "../assets/Logo.svg";

const CompanyInfo = ( { setChangePassword } ) => {
  return (
    <Box
      position="absolute"
      top={["0vh", "0vh", "0vh"]}
      display={["block", "block", "inline-block"]}
      h="100%"
      w={["100%", "100%", "67.2%"]}
    >
      <Box position="relative" h="8vh" w="100%" bgColor="#A8DADC">
        <Center
          ml={["0.5vw","0.5vw","0"]}
          position="relative"
          display="inline-block"
          bottom="45%"
          left={["0.5%","0.5%","-48%"]}
          color="#A8DADC"
        >
          <Button
            h="4.2vh"
            w="4.2vh"
            borderRadius="50%"
            border="1.8px solid black"
            size="sm"
            color={["black","black","#A8DADC"]}
            borderColor={["black","black","#A8DADC"]}
            bgColor={["#A8DADC","#A8DADC","#1D3557"]}
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
          position="relative"
          display="inline-block"
          bottom="8%"
          h="100%"
          ml={["2vw","2vw","0"]}
          src={logo}
        />
      </Box>
      <Center
        position="absolute"
        top={["70vh", "78vh", "auto"]}
        h={["90vw", "65vw", "92%"]}
        w="100%"
      >
        <Box h="90%" w={["96vw", "96vw", "94%"]} bgColor="#F1FAEE">
          <Box
            position="relative"
            top="4%"
            left="3%"
            w="25%"
            h="14%"
            bgColor="white"
          />
          <Text
            ml="2vw"
            mt="5vh"
            fontSize={["7vw", "4vh", "2.5vw"]}
            fontWeight="600"
          >
            Company's Information:
          </Text>
          <Box position="relative" top={["3vh", "4vh", "10%"]}>
            <Box
              position="relative"
              display="inline-block"
              ml="2.5vw"
              w={["40%", "30%"]}
            >
              <Text fontSize={["4.2vw", "3.4vw", "1.8vw"]} fontWeight="400">
                Name
              </Text>
            </Box>
            <Box display="inline-block" position="relative" ml="5vw" w="50%">
              <Text
                position="reletive"
                ml="5%"
                fontSize={["4.2vw", "3.4vw", "1.8vw"]}
                fontWeight="300"
              >
                ABC
              </Text>
            </Box>
          </Box>
          <Box position="relative" top={["5vh", "6vh", "12%"]}>
            <Box
              position="relative"
              display="inline-block"
              ml="2.5vw"
              w={["40%", "30%"]}
            >
              <Text fontSize={["4.2vw", "3.4vw", "1.8vw"]} fontWeight="400">
                Address
              </Text>
            </Box>
            <Box display="inline-block" position="relative" ml="5vw" w="50%">
              <Text
                position="reletive"
                ml="5%"
                fontSize={["4.2vw", "3.4vw", "1.8vw"]}
                fontWeight="300"
              >
                west street, Michigan,Detroit,Usa
              </Text>
            </Box>
          </Box>
          <Box position="relative" top={["7vh", "8vh", "14%"]}>
            <Box
              position="relative"
              display="inline-block"
              ml="2.5vw"
              w={["40%", "30%"]}
            >
              <Text fontSize={["4.2vw", "3.4vw", "1.8vw"]} fontWeight="400">
                Contact Number
              </Text>
            </Box>
            <Box display="inline-block" position="relative" ml="5vw" w="50%">
              <Text
                position="reletive"
                ml="5%"
                fontSize={["4.2vw", "3.4vw", "1.8vw"]}
                fontWeight="300"
              >
                1234567890
              </Text>
            </Box>
            <Box
              display="inline-block"
              ml={["35%", "35%", "3%"]}
              mt={["19vw", "16vw", "19vh"]}
              w={["30%", "30%", "25%"]}
            >
              <Button
                boxShadow="5px 5px 5px #A8A8A8"
                bg="brand.50"
                w={["100%", "100%", "80%"]}
                colorScheme="brand"
                fontSize={["4vw", "3.5vw", "1.3vw"]}
                color="white"
                _hover={{
                  background: "white",
                  color: "black",
                  border: "1px solid #1D3557",
                }}
              >
                <EditIcon mr="7%" /> Edit Profile
              </Button>
            </Box>
            <Box
              ml={["27.5%", "27.5%", "15%"]}
              mt={["5vw", "5vw", "auto"]}
              w={["45%", "45%", "25%"]}
              h={["15vh", "15vh", "auto"]}
              display="inline-block"
            >
              <Button
                boxShadow="5px 5px 5px #A8A8A8"
                w={["100%"]}
                bg="brand.50"
                colorScheme="brand"
                fontSize={["4vw", "3.5vw", "1.3vw"]}
                onClick={() => {setChangePassword(true);}}
                color="white"
                _hover={{
                  background: "white",
                  color: "black",
                  border: "1px solid #1D3557",
                }}
              >
                <LockIcon mr="7%" /> Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default CompanyInfo;
