import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function IngredientsReadout() {
  const ingredients = useSelector((state) => state.ingredientList.value);
  return (
    <>
      <Box px="6" py="3">
        Ingredients({ingredients.length}):
      </Box>
      <Box px="6" py="3" display="flex" gap="2" flexWrap="wrap">
        {ingredients.map((ingredient) => {
          return (
            <Box
              key={ingredient.ingredientId}
              border="2px solid black"
              borderRadius="lg"
            >
              <Box p="2">{ingredient.ingredient}</Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
