import { CloseIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient } from "../redux/ingredientList";

export default function IngredientsReadout() {
  const ingredients = useSelector((state) => state.ingredientList.value);
  const dispatch= useDispatch();
  const removeIngredientFromList= (e)=>{dispatch(removeIngredient(e.target.id));};
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
              display="flex"
              alignItems="center"
            >
              <Box p="3">{ingredient.ingredient}</Box>
              <IconButton
                aria-label={`remove ${ingredient.ingredient}`}
                id={ingredient.ingredientId}
                icon={<CloseIcon pointerEvents="none" />}
                onClick={removeIngredientFromList}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
