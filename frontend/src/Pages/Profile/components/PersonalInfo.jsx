import { Box, Center, Text } from "@chakra-ui/react";

const InitialValues = ({ field, value }) => {
  return (
    <Box mt={["2vh", "2vh", "5%"]}>
      <Text
        position="relative"
        display="inline-block"
        left="2%"
        w="30%"
        fontSize={["4.2vw", "3.4vw", "1.8vw"]}
        fontWeight="400"
      >
        {field}
      </Text>
      <Box display="inline-block" position="relative" left="16%" w="50%">
        <Text
          position="reletive"
          ml="5%"
          fontSize={["4.2vw", "3.4vw", "1.8vw"]}
          fontWeight="300"
        >
          {value}
        </Text>
      </Box>
    </Box>
  );
};

const PersonalInfo = () => {
  return (
    <Box
      position="relative"
      top={["8vh", "8vh", "0vh"]}
      display={["block", "block", "inline-block"]}
      w={["100%", "100%", "32.8%"]}
      h="100%"
    >
      <Center h={["25vh", "28vh", "34.7vh"]} w="100%" bgColor="#1D3557">
        <Box
          h={["16vh", "22vh", "12vw"]}
          w={["16vh", "22vh", "12vw"]}
          background="white"
          borderRadius="50%"
        />
      </Center>
      <Box
        h={["35vh", "40vh", "65.3%"]}
        w={["96vw", "96vw", "100%"]}
        bgColor="#A8DADC"
        ml={["2vw", "2vw", "0"]}
        mr={["2vw", "2vw", "0"]}
        mt={["2vh", "2vh", "0"]}
      >
        <Text
          position="relative"
          left="2%"
          top="3%"
          fontSize={["8vw", "5vw", "2.3vw"]}
          fontStyle="normal"
          fontWeight="640"
        >
          Personal Information:
        </Text>
        <Box position="relative" h="auto" w="auto" top={["2vh", "2vh", "5%"]}>
          <InitialValues field={"Name:"} value={"Brad Joey"} />
          <InitialValues field={"Email:"} value={"Brad@gmail.com"} />
          <InitialValues field={"Phone:"} value={"9867540810"} />
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
