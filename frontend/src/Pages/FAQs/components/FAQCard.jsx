import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function FAQCard() {
  return (
    <>
      <Flex fontSize={20} flexDirection="column" w="95%" minHeight="146px">
        <Box
          fontWeight="bold"
          p={4}
          textAlign="start"
          borderTopRadius={12}
          bg="#C4C4C4"
        >
          For writers, a random sentence can help.
        </Box>
        <Box flexGrow="1" p={4} borderBottomRadius={12} bg="#A8DADC">
          For writers, a random sentence can help them.
        </Box>
      </Flex>
    </>
  );
}
