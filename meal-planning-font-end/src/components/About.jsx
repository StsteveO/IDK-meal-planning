import { Box, Heading, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <>
      <Box p="6">
        <Box>
          <Heading>About Us</Heading>
        </Box>
        <Box>
          <Text>
            IDK meal planning is designed to answer a univeral question... What do you want to eat?
          </Text>
        </Box>
      </Box>
    </>
  );
}