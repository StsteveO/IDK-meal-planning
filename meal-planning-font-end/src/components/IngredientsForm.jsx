import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { addIngredient } from "../redux/ingredientList";
import { formChange, clearForm } from "../redux/ingredientFormChange";
import { addIngredient } from "../redux/ingredientList";

export default function IngredientsForm() {
  const dispatch = useDispatch();
  const handleFormChange = (e) => dispatch(formChange(e.target.value));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIngredient(formReading));
    dispatch(clearForm());
  };
  const formReading = useSelector((state) => state.ingredientFormChange.value);
  return (
    <>
      <Box p="6">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Ingredient</FormLabel>
            <Input
              type="text"
              size="lg"
              placeholder="ex. apple"
              onChange={handleFormChange}
              value={formReading}
            />
            <FormHelperText>Type single ingredient</FormHelperText>
          </FormControl>
          <Button type="submit" mt="6">Enter Ingredient</Button>
        </form>
      </Box>
    </>
  );
}
