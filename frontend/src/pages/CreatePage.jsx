import {
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
    const { success, message } = await createProduct(newProduct);
    console.log(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded="lg"
        shadow="md"
        w="full"
        mx="auto"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              size="lg"
              focusBorderColor="blue.400"
              bg={useColorModeValue("gray.50", "gray.700")}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
              size="lg"
              focusBorderColor="blue.400"
              bg={useColorModeValue("gray.50", "gray.700")}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              size="lg"
              focusBorderColor="blue.400"
              bg={useColorModeValue("gray.50", "gray.700")}
            />
            <Button type="submit" colorScheme="blue" size="lg" mt={4} w="full">
              Create Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default CreatePage;
