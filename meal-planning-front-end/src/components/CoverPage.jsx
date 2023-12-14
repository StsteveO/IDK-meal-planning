import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Heading, Spacer, Stack } from "@chakra-ui/react";
import logoSVG from "../assets/appFavicon.svg";
import wideScreenPic from "../assets/wideScreenCoverPic.jpg"
import narrowScreenPic from "../assets/narrowScreenCoverPic.jpg"

export default function CoverPage() {
  const applicationColors = useSelector(
    (state) => state.applicationColors.value
  );
  return (
    <Box bg={applicationColors.accentColor} minH="100vh" overflow="hidden">
      <Stack direction={{ base: "column", md: "row" }}>
        <Box>
          <Box>
            <Box boxSize={{ base: "sm", lg: "lg" }} pt="6" px="6">
              <img src={logoSVG} alt="IDKMeals Logo" />
            </Box>
          </Box>
          {/* {{ base: "column", md: "row" }} */}
          {/* <img src={narrowScreenPic} alt="cover screen art" /> */}
          {/* Photo by{" "}
          <a href="https://unsplash.com/@ellaolsson?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Ella Olsson
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/vegetable-salad-KPDbRyFOTnE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a> */}
          <Box>
            <Box px="6">
              <Link to="/mainPage/:">
                <Button
                  bg={applicationColors.primaryColor}
                  color="white"
                  _hover={{
                    color: "black",
                    bg: applicationColors.secondaryColor,
                  }}
                >
                  Enter Site!
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Spacer />
        <Box boxSize="lg" display={{ base: "none", md: "block" }}>
          <img src={wideScreenPic} alt="cover screen art" />
          {/* Photo by{" "}
          <a href="https://unsplash.com/@calumlewis?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Calum Lewis
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/five-gray-spoons-filled-with-assorted-color-powders-near-chilli-vA1L1jRTM70?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a> */}
        </Box>
      </Stack>
    </Box>
  );
}
