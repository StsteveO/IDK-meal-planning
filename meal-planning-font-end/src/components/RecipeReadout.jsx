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
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

export default function RecipeReadout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientList.value);
  const recipes = useSelector((state) => state.recipeList.value);
  const recipeInstructions= useSelector((state)=> state.recipeInstructions.value);
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
  const getRecipeInstructions = async (event) => {
    console.log(event.target.id);
    let recipeId = event.target.id;

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
    console.log(recipeInstructions);
  };
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
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Header</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
