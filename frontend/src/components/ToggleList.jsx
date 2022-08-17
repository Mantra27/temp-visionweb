import { Box, Center, Text, Button, List, ListItem } from "@chakra-ui/react";
import { BsUpload, BsArrowLeftCircle, BsQuestionCircle } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineBell } from "react-icons/ai";
import { FiDatabase, FiLayers } from "react-icons/fi";
import { RiFeedbackLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const ToggleList = ({ showMenu, setShowMenu }) => {
  return (
    <Box
      position="fixed"
      display={showMenu ? "inline-block" : "none"}
      w={["90%", "90%", "27.5%"]}
      h="100%"
      borderRight="2px"
      zIndex="1"
    >
      <Box h="30%" bgColor="#455874" borderBottom="2px">
        <Box position="relative" top="2%" w="100%" h="10%" color="#A8DADC">
          <Box display="inline-block" w="8%" ml="2%">
            <Button
              size="inherit"
              fontSize="4vh"
              bgColor="#455874"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <BsArrowLeftCircle />
            </Button>
          </Box>
          <Box display="inline-block" mr="2%" w="88%" textAlign="right">
            <Button
              display="inline-block"
              mr="8%"
              size="inherit"
              fontSize="3vh"
              bgColor="#455874"
            >
              <AiOutlineBell />
            </Button>
            <Button
              display="inline-block"
              mr="8%"
              size="inherit"
              fontSize="3vh"
              bgColor="#455874"
            >
              <AiOutlineSetting />
            </Button>
            <Button
              display="inline-block"
              size="inherit"
              fontSize="3vh"
              bgColor="#455874"
              transform="rotate(90deg)"
            >
              <BsUpload />
            </Button>
          </Box>
        </Box>
        <Box
          h={["16vh", "17vh", "17vh"]}
          w={["16vh", "17vh", "17vh"]}
          background="white"
          borderRadius="50%"
          position="relative"
          top="8%"
          bottom="0"
          left="0"
          right="0"
          m="auto"
        />
        <Center mt="3vh" w="100%">
          <Text fontSize="4vh" color="#A8DADC">
            Hello User!
          </Text>
        </Center>
      </Box>
      <Box h="70%" w="100%" bgColor="#A8DADC">
        <List position="relative" top="10%">
          <ListItem>
            <Button ml="1%" w="98%" h="11vh" bgColor="#A8DADC">
              <Center w="10%" fontSize={["5.5vw", "3vh"]}>
                <FiDatabase />
              </Center>
              <Center w="90%">
                <Text fontSize={["5vw", "2.5vh"]}>Data</Text>
              </Center>
            </Button>
          </ListItem>
          <ListItem mt="0.7%">
            <Button ml="1%" w="98%" h="11vh" bgColor="#A8DADC">
              <Center w="10%" fontSize={["5.5vw", "3vh"]}>
                <FiLayers />
              </Center>
              <Center w="90%">
                <Text fontSize={["5vw", "2.5vh"]}>Logs</Text>
              </Center>
            </Button>
          </ListItem>
          <ListItem mt="0.7%">
            <Button ml="1%" w="98%" h="11vh" bgColor="#A8DADC">
              <Center w="10%" fontSize={["5.5vw", "3vh"]}>
                <FontAwesomeIcon icon={faIndianRupee} />
              </Center>
              <Center w="90%">
                <Text fontSize={["5vw", "2.5vh"]}>Billings</Text>
              </Center>
            </Button>
          </ListItem>
          <ListItem mt="0.7%">
            <Button ml="1%" w="98%" h="11vh" bgColor="#A8DADC">
              <Center w="10%" fontSize={["5.5vw", "3vh"]}>
                <BsQuestionCircle />
              </Center>
              <Center w="90%">
                <Text fontSize={["5vw", "2.5vh"]}>FAQs</Text>
              </Center>
            </Button>
          </ListItem>
          <ListItem mt="0.7%">
            <Button ml="1%" w="98%" h="11vh" bgColor="#A8DADC">
              <Center w="10%" fontSize={["5.5vw", "3vh"]}>
                <RiFeedbackLine />
              </Center>
              <Center w="90%">
                <Text fontSize={["5vw", "2.5vh"]}>Feedback and Support</Text>
              </Center>
            </Button>
          </ListItem>
        </List>
        <Box
          position="relative"
          left={["18vw", "20vw", "4.8vw"]}
          top="-70.1%"
          h="80%"
          w="1.5px"
          bg="black"
        />
      </Box>
    </Box>
  );
};

export default ToggleList;
