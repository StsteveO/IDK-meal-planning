import {
  Box,
  Collapse,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import logoSVG from "../assets/appFavicon.svg";

export default function Navbar() {
  const location= useLocation();
  const { isOpen, onToggle } = useDisclosure();
  const applicationColors = useSelector(
    (state) => state.applicationColors.value
  );
  const favoriteRecipesList = useSelector(
    (state) => state.favoriteRecipesList.value
  );

  return (
    <>
      <Box
        bg={applicationColors.accentColor}
        borderRadius="xl"
        p="6"
        boxShadow="lg"
        fontSize="lg"
        py="0"
      >
        <Box display="flex" alignItems="center">
          <Box boxSize="15rem" display="flex" alignItems="center">
            <img src={logoSVG} />
          </Box>
          <Spacer />
          <Box display={{ base: "none", md: "flex" }} gap="6">
            <Box>
              <Link to="/">Cover Page</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/:" && "black"}
              borderBottom={location.pathname === "/mainPage/:" && "3px solid"}
              borderColor={location.pathname === "/mainPage/:" && "black"}
            >
              <Link to="/mainPage/:">Home</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/about" && "black"}
              borderBottom={
                location.pathname === "/mainPage/about" && "3px solid"
              }
              borderColor={location.pathname === "/mainPage/about" && "black"}
            >
              <Link to="/mainPage/about">About</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/favorites" && "black"}
              borderBottom={
                location.pathname === "/mainPage/favorites" && "3px solid"
              }
              borderColor={
                location.pathname === "/mainPage/favorites" && "black"
              }
            >
              <Link to="/mainPage/favorites">{`Favorites(${favoriteRecipesList.length})`}</Link>
            </Box>
          </Box>
          <Box display={{ md: "none" }}>
            <IconButton
              onClick={onToggle}
              aria-label="Toogle menu"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            />
          </Box>
        </Box>
        <Box mt="3" display={{ md: "none" }}>
          <Collapse in={isOpen} animateOpacity>
            <Box mb="2">
              <Link to="/">Cover Page</Link>
            </Box>
            <Box
              mb="2"
              color={location.pathname === "/mainPage/:" && "black"}
              borderBottom={location.pathname === "/mainPage/:" && "3px solid"}
              borderColor={location.pathname === "/mainPage/:" && "black"}
            >
              <Link to="/mainPage/:">Home</Link>
            </Box>
            <Box
              mb="2"
              color={location.pathname === "/mainPage/about" && "black"}
              borderBottom={
                location.pathname === "/mainPage/about" && "3px solid"
              }
              borderColor={location.pathname === "/mainPage/about" && "black"}
            >
              <Link to="/mainPage/about">About</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/favorites" && "black"}
              borderBottom={
                location.pathname === "/mainPage/favorites" && "3px solid"
              }
              borderColor={
                location.pathname === "/mainPage/favorites" && "black"
              }
            >
              <Link to="/mainPage/favorites">{`Favorites(${favoriteRecipesList.length})`}</Link>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}
