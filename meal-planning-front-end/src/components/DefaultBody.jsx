import { Box, Heading, Text } from "@chakra-ui/react";
import IngredientsForm from "./IngredientsForm";
import IngredientsReadout from "./IngredientsReadout";
import RecipeReadout from "./RecipeReadout";

export default function DefaultBody() {
  return (
    <>
      <IngredientsForm />
      <IngredientsReadout />
      <RecipeReadout />
    </>
  );
}
