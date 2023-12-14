import { CloseIcon } from "@chakra-ui/icons";
import { Box, Center, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient } from "../redux/ingredientList";

export default function IngredientsReadout() {
  const ingredients = useSelector((state) => state.ingredientList.value);
  const applicationColors = useSelector(
    (state) => state.applicationColors.value
  );
  const dispatch= useDispatch();
  const removeIngredientFromList= (e)=>{dispatch(removeIngredient(e.target.id));};
  return (
    <>
      <Box px="6" py="3">
        Ingredients({ingredients.length}):
      </Box>
      {ingredients.length===0 && <Box border="2px dashed gray" mx="6" py="6" mt="3">
        <Center>
          No ingredients in list, enter some.
        </Center>
        </Box>}
      <Box px="6" py="3" display="flex" gap="2" flexWrap="wrap">
        {ingredients.map((ingredient) => {
          return (
            <Box
              key={ingredient.ingredientId}
              // border="2px solid black"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              bg={applicationColors.secondaryColor}
              boxShadow="lg"
              pr="2"
              py="1"
            >
              <Box p="3">{ingredient.ingredient}</Box>
              <IconButton
                aria-label={`remove ${ingredient.ingredient}`}
                id={ingredient.ingredientId}
                icon={<CloseIcon pointerEvents="none" />}
                onClick={removeIngredientFromList}
                // bg={applicationColors.primaryColor}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
