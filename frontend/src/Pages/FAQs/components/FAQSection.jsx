import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import FAQCard from "./FAQCard";

export default function FAQSection() {
  return (
    <>
      <Box
        borderRadius={16}
        margin="auto"
        w="95%"
        border="2px solid #909090"
        marginTop={7}
        minHeight="500px"
      >
        <Flex
          marginTop={7}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={10}
          marginBottom={5}
        >
          <FAQCard />
          <FAQCard />
          <FAQCard />
          <FAQCard />
          <FAQCard />
        </Flex>
      </Box>
    </>
  );
}
