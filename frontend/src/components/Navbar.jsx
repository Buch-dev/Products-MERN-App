import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa"; // Add these icons
import { useColorMode, useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1140px"}
      px={4}
      
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="red.200"
          gradientTo="blue.200"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack textSpacingTrim={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaRegPlusSquare />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
