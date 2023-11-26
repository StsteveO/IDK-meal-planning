import { Box, Button, Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react";
const spoonacularAPIKey= import.meta.env.VITE_spoonacularAPIKey
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeList } from "../redux/recipeList";

export default function RecipeReadout() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientList.value);
  const recipes= useSelector((state)=> state.recipeList.value);
  console.log(recipes);
  // console.log(spoonacularAPIKey);
  const updatedIngredientList = ingredients.map((item)=>{
    if(typeof item=== "object"){
      item= item.ingredient
    }
    return item
  })
  const updatedIngredientsString = updatedIngredientList.toString();
  // console.log(updatedIngredientsString);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAPIKey}&ingredients=${updatedIngredientsString}&number=2`
      );
      const data= await response.json();
      console.log(data);
      dispatch(updateRecipeList(data));
    }catch (error){
      console.error(`Error getting recipes: ${error}`);
    }
  };
  return (
    <Box px="6" py="3">
      <Button onClick={getRecipes}>Get Recipes!</Button>
      <Box>
        {recipes.map((recipe)=>{
          return (
            <Card key={recipe.id}>
              <CardBody>
                <Image src={recipe.image} alt={`Image of ${recipe.title}`} borderRadius="lg" />
                <Stack>
                  <Heading>{recipe.title}</Heading>
                </Stack>
              </CardBody>
            </Card>
          )
        })}
      </Box>
    </Box>
  );
}
