import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function IngredientsReadout() {
  const ingredients = useSelector((state) => state.ingredientList.value);
  return (
    <>
      <Box p="6">
        {console.log(crypto.randomUUID())}
      </Box>
      <Box>placeholder</Box>
    </>
  );
}
