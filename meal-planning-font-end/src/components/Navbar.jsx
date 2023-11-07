import { Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Box p="6">
        <Box>(Logo goes here)</Box>
        <Box>
          <Link to="/">Cover Page</Link>
        </Box>
        <Box>
          <Link to="/mainPage/:">Home</Link>
        </Box>
        <Box>
          <Link to="/mainPage/about">About</Link>
        </Box>
      </Box>
    </>
  );
}
