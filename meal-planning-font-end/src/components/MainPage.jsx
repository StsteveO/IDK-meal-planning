import { useParams } from "react-router-dom";
import DefaultBody from "./DefaultBody";
import About from "./About";
import Navbar from "./Navbar";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { add, addBy, minus } from "../redux/counter";
import { addIngredient } from "../redux/ingredientList"
import IngredientsForm from "./IngredientsForm";
import IngredientsReadout from "./IngredientsReadout";

export default function MainPage() {
  const { name } = useParams();

  // const { value } = useSelector((state) => state.counter);
  const countValue = useSelector((state) => state.counter.value);
  const ingredients= useSelector((state)=> state.ingredientList.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <IngredientsForm />
      <IngredientsReadout />
      
      <Box p="5">Count: {countValue}</Box>
      <Button mx="3" variant="outline" onClick={() => dispatch(add())}>
        Add
      </Button>
      <Button mx="3" variant="outline" onClick={() => dispatch(minus())}>
        Minus
      </Button>
      <Button mx="3" variant="outline" onClick={() => dispatch(addBy(50))}>
        Add 50
      </Button>
      <Box p="5">List: {ingredients}</Box>
      {console.log(ingredients)}
      <Button
        mx="3"
        variant="outline"
        onClick={() => dispatch(addIngredient("CHerry"))}
      >
        Add Ingredient
      </Button>

      {name === "about" ? <About /> : <DefaultBody />}
    </>
  );
}
