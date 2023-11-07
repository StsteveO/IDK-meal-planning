import { useParams } from "react-router-dom";
import DefaultBody from "./DefaultBody";
import About from "./About";
import Navbar from "./Navbar";

export default function MainPage() {
  const { name } = useParams();
  return (
    <>
      <Navbar />
      
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
