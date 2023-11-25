import { Box, Heading, Text } from "@chakra-ui/react";

export default function DefaultBody() {
  return (
    <>
      <Box p="6">
        <Box>
          <Heading>
            What Do You Want To Eat ?
          </Heading>
        </Box>
        <Box>
          <Text>
            If your answer is IDK! you are int he right place. 
          </Text>
        </Box>
        <Box>
          <Heading size="lg">
            Enter (one at a time) ingredients you have.
          </Heading>
        </Box>
      </Box>
    </>
  );
}
