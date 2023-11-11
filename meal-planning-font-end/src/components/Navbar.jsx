import {
  Box,
  Collapse,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const location= useLocation();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Box bg="silver" borderRadius="xl" p="6">
        <Box display="flex" alignItems="center">
          <Box>(Logo goes here)</Box>
          <Spacer />
          <Box display={{ base: "none", md: "flex" }} gap="6">
            <Box>
              <Link to="/">Cover Page</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/:" && "red"}
              borderBottom={location.pathname === "/mainPage/:" && "3px solid"}
              borderColor={location.pathname === "/mainPage/:" && "red"}
            >
              <Link to="/mainPage/:">Home</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/about" && "red"}
              borderBottom={
                location.pathname === "/mainPage/about" && "3px solid"
              }
              borderColor={location.pathname === "/mainPage/about" && "red"}
            >
              <Link to="/mainPage/about">About</Link>
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
              color={location.pathname === "/mainPage/:" && "red"}
              borderBottom={location.pathname === "/mainPage/:" && "3px solid"}
              borderColor={location.pathname === "/mainPage/:" && "red"}
            >
              <Link to="/mainPage/:">Home</Link>
            </Box>
            <Box
              color={location.pathname === "/mainPage/about" && "red"}
              borderBottom={
                location.pathname === "/mainPage/about" && "3px solid"
              }
              borderColor={location.pathname === "/mainPage/about" && "red"}
            >
              <Link to="/mainPage/about">About</Link>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}
