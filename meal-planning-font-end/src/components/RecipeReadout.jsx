import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
const spoonacularAPIKey = import.meta.env.VITE_spoonacularAPIKey;
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeList } from "../redux/recipeList";
import { updateRecipeInstructions } from "../redux/recipeInstructions";
import { updateRecipeTitle } from "../redux/recipeTitle";
import { AddIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";

export default function RecipeReadout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientList.value);
  const recipes = useSelector((state) => state.recipeList.value);
  const recipeInstructions= useSelector((state)=> state.recipeInstructions.value);
  const recipeTitle = useSelector((state) => state.recipeTitle.value);
  // console.log(recipes);
  // console.log(spoonacularAPIKey);
  const updatedIngredientList = ingredients.map((item) => {
    if (typeof item === "object") {
      item = item.ingredient;
    }
    return item;
  });
  const updatedIngredientsString = updatedIngredientList.toString();
  // console.log(updatedIngredientsString);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAPIKey}&ingredients=${updatedIngredientsString}&number=20`
      );
      const data = await response.json();
      console.log(
        data.sort((a, b) => {
          return a.missedIngredientCount - b.missedIngredientCount;
        })
      );
      dispatch(
        updateRecipeList(
          data.sort((a, b) => {
            return a.missedIngredientCount - b.missedIngredientCount;
          })
        )
      );
    } catch (error) {
      console.error(`Error getting recipes: ${error}`);
    }
  };
  const getRecipeTitle = async (recipe_Id) =>{
    try{
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe_Id}/information?includeNutrition=false&apiKey=${spoonacularAPIKey}`
      );
      const data= await response.json();
      dispatch(updateRecipeTitle(data));
    } catch (error) {
      console.error(`Error getting recipe title: ${error}`);
    } 
    console.log(`Recipe title worked!`);
    console.log(recipeTitle);
  }
  const getRecipeInstructions = async (event) => {
    console.log(event.target.id);
    let recipeId = event.target.id;
    getRecipeTitle(recipeId);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${spoonacularAPIKey}`
      );
      const data = await response.json();
      // console.log(data);
      dispatch(updateRecipeInstructions(data));
    } catch (error) {
      console.error(`Error getting recipe instructions: ${error}`);
    }
    onOpen();
    // console.log(recipeInstructions);
  };
  const addRecipeToFavorites= (event) =>{
    console.log(Number(event.target.id));
    let clickedRecipe= Number(event.target.id);
    let recipeAddedToFavorites = recipes.find(
      (recipe) => recipe.id === clickedRecipe
    );
    console.log(recipeAddedToFavorites)
  }
  return (
    <Box px="6" py="3">
      <Button onClick={getRecipes}>Get Recipes!</Button>
      <Box>
        {recipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              direction="row"
              m="4"
              variant="outline"
              overflow="hidden"
              border="2px black solid"
            >
              <Image
                src={recipe.image}
                alt={`Image of ${recipe.title}`}
                objectFit="cover"
                // borderRadius="lg"
              />
              <CardBody>
                <Stack>
                  <Heading size="md">{recipe.title}</Heading>
                  <Accordion defaultIndex={[]} allowMultiple>
                    <AccordionItem
                      border="1px black solid"
                      borderRadius="lg"
                      p="2"
                    >
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Missing Ingredients ({recipe.missedIngredientCount})
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <ul>
                          {recipe.missedIngredients.map((missedIngredient) => {
                            return (
                              <li key={missedIngredient.id}>
                                {missedIngredient.name}
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <CardFooter pl="0">
                    <ButtonGroup>
                      <Button
                        border="1px black solid"
                        borderRadius="lg"
                        // leftIcon={<ViewIcon />}
                        id={recipe.id}
                        onClick={getRecipeInstructions}
                        // onClick={onOpen}
                      >
                        View Recipe
                      </Button>
                      {/* <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        closeOnOverlayClick={false}
                      >
                        <ModalOverlay bg="blackAlpha.200" />
                        <ModalContent>
                          <ModalHeader>Header</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>Body</ModalBody>
                          <ModalFooter>Footer</ModalFooter>
                        </ModalContent>
                      </Modal> */}
                      <Button
                        border="1px black solid"
                        borderRadius="lg"
                        // leftIcon={<AddIcon />}
                        id={recipe.id}
                        onClick={addRecipeToFavorites}
                      >
                        Add to Favorites
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </Box>
      {recipeInstructions && (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{recipeTitle.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Image src={recipeTitle.image} alt="food picture" />
              </Box>
              <Box my="3">
                <Link href={recipeTitle.sourceUrl} isExternal>
                  Measurements and amounts <ExternalLinkIcon />
                </Link>
              </Box>
              {recipeInstructions[0].name && (
                <Box fontStyle="italic">{recipeInstructions[0].name}</Box>
              )}
              {recipeInstructions[0].steps.map((step) => {
                return (
                  <Box key={step.number} py="3">
                    <Box
                      fontWeight="bold"
                      fontSize="2xl"
                    >{`Step ${step.number}:`}</Box>
                    <Box pb={step.ingredients.length > 0 && "3"}>
                      {step.ingredients.length > 0 && (
                        <Box fontStyle="italic" textDecoration="underline">
                          Ingredients
                        </Box>
                      )}
                      <ul>
                        {step.ingredients.length > 0 &&
                          step.ingredients.map((ingredient) => {
                            return (
                              <li
                                key={ingredient.id}
                              >{`${ingredient.name}`}</li>
                            );
                          })}
                      </ul>
                    </Box>
                    <Box pb={step.equipment.length > 0 && "3"}>
                      {step.equipment.length > 0 && (
                        <Box fontStyle="italic" textDecoration="underline">
                          Equipment
                        </Box>
                      )}
                      <ul>
                        {step.equipment.length > 0 &&
                          step.equipment.map((equipmentItem) => {
                            return (
                              <li
                                key={equipmentItem.id}
                              >{`${equipmentItem.name}`}</li>
                            );
                          })}
                      </ul>
                    </Box>
                    <Box>{step.step}</Box>
                  </Box>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button borderRadius="lg" border="1px solid black">
                  Add to Favorites
                </Button>
                <Button
                  onClick={onClose}
                  borderRadius="lg"
                  border="1px solid black"
                >
                  Close
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
