import { Link, useParams } from "react-router-dom";
import DefaultBody from "./DefaultBody";
import About from "./About";
import { Heading } from "@chakra-ui/react";

export default function MainPage() {
  const { name } = useParams();
  return (
    <>
      <Heading>Header and Nav</Heading>
      <br />
      <Link to="/">Cover Page</Link>
      <br />
      <Link to="/mainPage/:">Home Page</Link>
      <br />
      <Link to= "/mainPage/about">About</Link>
      <br />
      <br />
      {
        name === "about" ? (
          <About />
        ) : (
          <DefaultBody />
        )
      }
    </>
  );
}
