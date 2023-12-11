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
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeInstructions } from "../redux/recipeInstructions";
import { updateRecipeTitle } from "../redux/recipeTitle";
const spoonacularAPIKey = import.meta.env.VITE_spoonacularAPIKey;
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { addNewRecipeToFavorites, removeRecipeFromFavorites } from "../redux/favoriteRecipesList";
import { useEffect } from "react";

export default function FavoriteRecipesList() {
  const toast = useToast();
  const recipeTitle = useSelector((state) => state.recipeTitle.value);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const recipes = useSelector((state) => state.recipeList.value);
  const recipeInstructions = useSelector(
    (state) => state.recipeInstructions.value
  );
  const favoriteRecipesList = useSelector(
    (state) => state.favoriteRecipesList.value
  );
  const getRecipeTitle = async (recipe_Id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe_Id}/information?includeNutrition=false&apiKey=${spoonacularAPIKey}`
      );
      const data = await response.json();
      dispatch(updateRecipeTitle(data));
    } catch (error) {
      console.error(`Error getting recipe title: ${error}`);
    }
    console.log(`Recipe title worked!`);
    console.log(recipeTitle);
  };
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
  const removeRecipeFromFavoritesList = (event) => {
    console.log(Number(event.target.id));
    let clickedRecipe = Number(event.target.id);
    dispatch(removeRecipeFromFavorites(clickedRecipe));
    toast({
      title: "Success",
      description: "recipe removed from favorite(s) list",
      status: "success",
      duration: 4000,
    });
  };
  // const addRecipeToFavorites = (event) => {
  //   console.log(Number(event.target.id));
  //   let clickedRecipe = Number(event.target.id);
  //   let recipeAddedToFavorites = recipes.find(
  //     (recipe) => recipe.id === clickedRecipe
  //   );
  //   console.log(recipeAddedToFavorites);
  //   dispatch(addNewRecipeToFavorites(recipeAddedToFavorites));
  // };
  useEffect(()=>{
    const storedFavoriteRecipesList = JSON.parse(localStorage.getItem("favorite recipes list"));
    if(storedFavoriteRecipesList){
      storedFavoriteRecipesList.forEach((item)=>{
        dispatch(addNewRecipeToFavorites(item));
      });
    }
  }, []);
  return (
    <Box>
      <div>FavoriteRecipesList</div>
      <Box>
        {favoriteRecipesList.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              direction={{ base: "column", md: "row" }}
              m="4"
              variant="outline"
              overflow="auto"
              border="2px black solid"
            >
              <Image
                src={recipe.image}
                alt={`Image of ${recipe.title}`}
                objectFit="contain"
                maxWidth={{ base: "75%", md: "45%" }}
                mx="auto"
                mt={{ base: "6", md: "0px" }}
                borderRadius={{ base: "lg", md: "none" }}
              />
              <CardBody>
                <Stack>
                  <Heading size="md">{recipe.title}</Heading>
                  {/* <Accordion defaultIndex={[]} allowMultiple>
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
                  </Accordion> */}
                  <CardFooter pl="0">
                    {/* pt={{ base: "0px", md: "15%" }} for card footer */}
                    <ButtonGroup spacing="0" flexWrap="wrap">
                      <Button
                        border="1px black solid"
                        borderRadius="lg"
                        mr="2"
                        mb="3"
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
                        onClick={removeRecipeFromFavoritesList}
                      >
                        Remove from Favorites
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
                {/* <Button
                  borderRadius="lg"
                  border="1px solid black"
                  onClick={
                    favoriteRecipesList.includes(recipeTitle)
                      ? removeRecipeFromFavoritesList
                      : addRecipeToFavorites
                  }
                >
                  {favoriteRecipesList.includes(recipeTitle)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Button> */}
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
