import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { addIngredient } from "../redux/ingredientList";
import { formChange, clearForm } from "../redux/ingredientFormChange";
import { addIngredient } from "../redux/ingredientList";

export default function IngredientsForm() {
  const toast= useToast();
  const applicationColors = useSelector(
    (state) => state.applicationColors.value
  );
  const ingredientList = useSelector((state) => state.ingredientList.value);
  const dispatch = useDispatch();
  const handleFormChange = (e) => dispatch(formChange(e.target.value));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIngredient(formReading));
    dispatch(clearForm());

    let repeatIngredient = ingredientList.find((item) => {
      return item.ingredient === formReading;
    });

    if (repeatIngredient !== undefined) {
      toast({
        title: "Error",
        description: "you already entered this ingredient",
        status: "error",
        duration: 4000, 
      });
    }

    if (repeatIngredient === undefined) {
      toast({
        title: "Success",
        description: "your ingredient has been successfully added",
        status: "success",
        duration: 4000,
      });
    }
  };
  const formReading = useSelector((state) => state.ingredientFormChange.value);
  return (
    <>
      <Box p="6">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Type one ingredient</FormLabel>
            <Input
              type="text"
              size="lg"
              placeholder="ex. apple"
              onChange={handleFormChange}
              value={formReading}
            />
            <FormHelperText>Click Enter Ingredient to Submit</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            mt="6"
            bg={applicationColors.primaryColor}
            color={applicationColors.backgroundColor}
            _hover={{ color: "black", bg: applicationColors.secondaryColor }}
          >
            Enter Ingredient
          </Button>
        </form>
      </Box>
    </>
  );
}
