import { Box, Center, Image, Button, Text } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import mastercard from "../../../assets/mastercard.svg";

const Item = ({ description, amount }) => {
  return (
    <Box ml="2%" mt="0.5%" w="96%" h="fit-content">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="13px">{description}</Text>
        <Text fontSize="13px">{amount}</Text>
      </Box>
      <Box W="100%" h="1px" bg="black" />
    </Box>
  );
};

const UsageAndInvoicesItem = ({ description, amount }) => {
  return (
    <Box ml="2%" mt={["4%", "4%", "0.5%"]} w="96%" h="fit-content">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="12px">{description}</Text>
        <Text fontSize="12px">{amount}</Text>
      </Box>
      <Box display={["none", "none", "block"]} W="100%" h="1px" bg="black" />
    </Box>
  );
};

const Billing = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      position="absolute"
      top={["0vh", "0vh", "0vh"]}
      display={["block", "block", "inline-block"]}
      h="100%"
      w={["100%", "100%", "100%"]}
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        h="8%"
        w="100%"
        bgColor="#A8DADC"
      >
        <CgProfile
          style={{ height: "80%", width: "auto" }}
          onClick={props.onOpen}
        />
        <Image
          position="relative"
          display="inline-block"
          bottom="8%"
          h="100%"
          ml={["2vw", "2vw", "1vw"]}
          src={logo}
        />
      </Box>
      <Box w="100%" h="92%" bgColor="#EFF6EC">
        <Box
          position="relative"
          top="2.5%"
          ml={["4%", "4%", "2%"]}
          w={["92%", "92%", "96%"]}
          h="43%"
        >
          <Box h="17%" w="100%" bgColor={["#EFF6EC", "#EFF6EC", "#455874"]}>
            <Text
              position="relative"
              top={["2vw", "2vw", "auto"]}
              ml={["auto", "auto", "1.5%"]}
              fontSize="3.5vh"
              fontWeight="600"
            >
              Plan Details
            </Text>
          </Box>
          <Box h="83%" w="100%" mt={["3vw", "3vw", "auto"]}>
            <Box
              display="inline-block"
              verticalAlign="top"
              h="100%"
              w={["100%", "100%", "35%"]}
              bgColor={["#EFF6EC", "#EFF6EC", "#E5E5E5"]}
              borderRadius={["4vw", "4vw", "0"]}
              boxShadow={["1px 1px 2px grey", "1px 1px 2px grey", "none"]}
            >
              <Box
                w="100%"
                h={["25%", "25%", "100%"]}
                bgColor={["#A8DADC", "#A8DADC", "inherit"]}
                display={["flex", "flex", "block"]}
                justifyContent={["center", "center", "normal"]}
                alignItems={["center", "center", "normal"]}
                borderRadius={["4vw 4vw 0 0", "4vw 4vw 0 0", "0"]}
              >
                <Text
                  position="relative"
                  top="7%"
                  left={["auto", "auto", "7%"]}
                  fontSize={["20px", "20px", "1.5em"]}
                  fontWeight="500"
                >
                  Desk Standard
                </Text>
              </Box>
              <Box
                display={["block", "block", "none"]}
                w="80%"
                minH="75%"
                ml="10%"
                mt="10%"
                justifyContent={["center", "center", "normal"]}
                alignItems={["center", "center", "normal"]}
                borderRadius={["4vw 4vw 0 0", "4vw 4vw 0 0", "0"]}
                wordWrap="break-word"
              >
                acdjslknnsancskacsnhdsshheiuufsuduklmejkdvsbsdcdsdsrfdsvsdfvsv
              </Box>
            </Box>
            <Box
              display={["none", "none", "inline-block"]}
              verticalAlign="top"
              h="100%"
              w="65%"
              bgColor="#A8DADC"
            >
              <Box ml="2%" mt="1.5%" w="96%" h="fit-content">
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="16px" fontWeight="500">
                    DESCRIPTION
                  </Text>
                  <Text fontSize="16px" fontWeight="500">
                    AMOUNT
                  </Text>
                </Box>
                <Box w="100%" mt="0.4%" h="1.5px" bg="black" />
              </Box>
              <Box mt="1%" w="100%">
                <Item description="50 HOUR FLEX BOUNDLE" amount="$ 1000.00" />
                <Item description="50 HOUR FLEX BOUNDLE" amount="$ 1000.00" />
                <Item description="50 HOUR FLEX BOUNDLE" amount="$ 1000.00" />
                <Item description="50 HOUR FLEX BOUNDLE" amount="$ 1000.00" />
              </Box>
              <Box
                mt="4px"
                ml="45%"
                w="50%"
                h="30%"
                borderRadius="0.4vw"
                bgColor="#EFF6EC"
                display="flex"
                justifyContent="space-between"
              >
                <Box
                  display="inline-block"
                  position="relative"
                  top="8%"
                  w="30%"
                  h="100%"
                >
                  <Text ml="7%" fontSize="1.5vw" fontWeight="500">
                    Total
                  </Text>
                  <Text ml="3%" mt="1%" fontSize="1vw" fontWeight="500">
                    Due June 16,2021
                  </Text>
                </Box>
                <Box
                  display="inline-block"
                  h="100%"
                  w="30%"
                  position="relative"
                  top="20%"
                >
                  <Text
                    position="relative"
                    bottom="15%"
                    display="inline-block"
                    fontSize="0.9vw"
                  >
                    $
                  </Text>
                  <Text display="inline-block" ml="5%" fontSize="1.5vw">
                    4000.00
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          w="100%"
          h={["60%", "60%", "32%"]}
          bgColor={["#EFF6EC", "#EFF6EC", "inherit"]}
        >
          <Box
            display={["block", "block", "flex"]}
            justifyContent="space-between"
            mt={["10vh", "10vh", "5vh"]}
            ml="2%"
            w="96%"
            h={["100%", "70%", "100%"]}
            bgColor={["#EFF6EC", "#EFF6EC", "inherit"]}
          >
            <Box
              display={["none", "none", "inline-block"]}
              verticalAlign="top"
              h="100%"
              w="45%"
              bgColor="#A8DADC"
            >
              <Box h="22%" w="100%" bgColor="#455874">
                <Text ml="3%" fontSize="4vh" fontWeight="500">
                  Usage Statictics
                </Text>
              </Box>
              <Box ml="6%" w="88%">
                <Box ml="2%" mt="1.5%" w="96%" h="fit-content">
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="16px" fontWeight="500">
                      DESCRIPTION
                    </Text>
                    <Text fontSize="16px" fontWeight="500">
                      AMOUNT
                    </Text>
                  </Box>
                  <Box w="100%" mt="1.5%" h="1.5px" bg="black" />
                </Box>
                <Box mt="1%" w="100%">
                  <UsageAndInvoicesItem
                    description="50 HOUR FLEX BOUNDLE"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="50 HOUR FLEX BOUNDLE"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="50 HOUR FLEX BOUNDLE"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="50 HOUR FLEX BOUNDLE"
                    amount="$ 1000.00"
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={["block", "block", "inline-block"]}
              verticalAlign="top"
              h="100%"
              w={["94%", "94%", "45%"]}
              bgColor={["#EFF6EC", "#EFF6EC", "#A8DADC"]}
              ml={["3%", "3%", "auto"]}
            >
              <Box h="22%" w="100%" bgColor={["#EFF6EC", "#EFF6EC", "#455874"]}>
                <Text
                  ml={["auto", "auto", "3%"]}
                  fontSize={["3.5vh", "3.5vh", "4vh"]}
                  fontWeight="500"
                >
                  Invoices
                </Text>
              </Box>
              <Box
                ml={["auto", "auto", "6%"]}
                w={["100%", "100%", "88%"]}
                mb="2%"
                mt={["1%", "3%", "auto"]}
                h={["65%", "100%", "auto"]}
                borderRadius={["4vw", "4vw", "0"]}
                boxShadow={["1px 1px 2px grey", "1px 1px 2px grey", "none"]}
                bgColor={["#EFF6EC", "#EFF6EC", "inherit"]}
              >
                <Box
                  ml={["auto", "auto", "2%"]}
                  mt="1.5%"
                  w={["100%", "100%", "96%"]}
                  h={["25%", "25%", "fit-content"]}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    h={["100%", "100%", "inherit"]}
                    borderRadius={["4vw 4vw 0 0", "4vw 4vw 0 0", "0"]}
                    bgColor={["#A8DADC", "#A8DADC", "inherit"]}
                  >
                    <Box
                      mt={["4%", "4%", "auto"]}
                      w="100%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text
                        ml={["2%", "2%", "0"]}
                        fontSize="16px"
                        fontWeight="500"
                      >
                        DATE
                      </Text>
                      <Text
                        mr={["2%", "2%", "0"]}
                        fontSize="16px"
                        fontWeight="500"
                      >
                        AMOUNT
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    display={["none", "none", "block"]}
                    w="100%"
                    mt="1.5%"
                    h="1.5px"
                    bg="black"
                  />
                </Box>
                <Box h={["75%", "75%", "inherit"]} mt="1%" w="100%">
                  <UsageAndInvoicesItem
                    description="April 8th, 2022"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="April 8th, 2022"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="April 8th, 2022"
                    amount="$ 1000.00"
                  />
                  <UsageAndInvoicesItem
                    description="April 8th, 2022"
                    amount="$ 1000.00"
                  />
                </Box>
              </Box>
              <Center mt="-2" display={["none", "none", "flex"]}>
                <Button bgColor="#A8DADC" fontSize="14px" size="fit-content">
                  View All
                </Button>
              </Center>
            </Box>
          </Box>
        </Box>
        <Box
          ml={["auto", "auto", "2%"]}
          mt={["0", "0", "1.5%"]}
          h={["40%", "40%", "14%"]}
          w={["100%", "100%", "96%"]}
          bgColor={["#EFF6EC", "#EFF6EC", "inherit"]}
        >
          <Box
            h={["20%", "20%", "49%"]}
            bgColor={["#EFF6EC", "#EFF6EC", "#455874"]}
          >
            <Text
              ml={["4%", "4%", "1.5%"]}
              fontSize={["3.5vh", "3.5vh", "4vh"]}
              fontWeight="500"
            >
              Payment Method
            </Text>
          </Box>
          <Box
            h={["60%", "60%", "51%"]}
            display={["block", "block", "flex"]}
            justifyContent="space-between"
            bgColor={["#EFF6EC", "#EFF6EC", "#A8DADC"]}
            w={["92%", "92%", "auto"]}
            mt={["6%", "6%", "auto"]}
            ml={["4%", "4%", "auto"]}
            borderRadius={["4vw", "4vw", "none"]}
            boxShadow={["1px 1px 2px grey", "1px 1px 2px grey", "none"]}
          >
            <Box
              display={["block", "block", "inline-block"]}
              verticalAlign="top"
              h={["52%", "52%", "100%"]}
              w={["100%", "100%", "50%"]}
            >
              <Box
                w={["60%", "60%", "auto"]}
                h="100%"
                ml={["20%", "30%", "auto"]}
              >
                <Image
                  display="inline-block"
                  verticalAlign="top"
                  ml="2.5%"
                  h={["20vw", "10vw", "100%"]}
                  src={mastercard}
                />
                <Text
                  display="inline-block"
                  mt={["4vw", "2vw", "auto"]}
                  ml="8%"
                  verticalAlign="top"
                  fontSize={["8vw", "4vw", "26px"]}
                >
                  ***1234
                </Text>
              </Box>
            </Box>
            <Box
              h={["48%", "48%", "98%"]}
              display={["block", "block", "inline-block"]}
              verticalAlign="top"
              mr="1%"
              bgColor={["#A8DADC", "#A8DADC", "inherit"]}
              w={["100%", "100%", "auto"]}
              borderRadius={["0 0 4vw 4vw", "0 0 4vw 4vw", "none"]}
            >
              <Button
                h="100%"
                ml={["15%", "23%", "auto"]}
                w={["70%", "54%", "auto"]}
                bgColor="#A8DADC"
                fontSize={["5vw", "4vw", "1.3vw"]}
              >
                Change Payment Method
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Billing;
