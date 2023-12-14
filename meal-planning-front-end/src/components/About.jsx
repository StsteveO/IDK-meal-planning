import { Box, Container, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  addNewRecipeToFavorites,
} from "../redux/favoriteRecipesList";
import { useEffect } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function About() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavoriteRecipesList = JSON.parse(
      localStorage.getItem("favorite recipes list")
    );
    if (storedFavoriteRecipesList) {
      storedFavoriteRecipesList.forEach((item) => {
        dispatch(addNewRecipeToFavorites(item));
      });
    }
  }, []);
  return (
    <>
      <Box mx="4" my="6">
        <Box>
          <Heading>About Us</Heading>
        </Box>
        <Box pt="4" fontSize="xl">
          <Stack spacing="1rem">
            <Text>
              {`IDKMeals is designed to answer a univeral question... What
                do you want to eat?`}
            </Text>
            <Text>
              {`In today's world it is easier to buy food (mostly unhealthy) than use ingredients we have for one reason...less thinking.`}
            </Text>
            <Text>
              {`IDKMeals does all the thinking for you. Simply enter the ingredients, and IDKMeals will come up with a list of recipes for you.`}
            </Text>
            <Text>
              {`IDKMeals utilizes React on the frontend, with Chakra UI for styling.`}
            </Text>
            <Link textDecoration="underline" fontWeight="bold" color="teal" my="6" href="https://www.linkedin.com/in/stephen-omari-pt-dpt-10010822b/" isExternal>
              Developer contact information <ExternalLinkIcon/>
            </Link>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
