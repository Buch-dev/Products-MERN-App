import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Box,
  Image,
  HStack,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    const response = await useProductStore.getState().deleteProduct(id);
    if (response.success) {
      fetchProducts(); // refresh the list
    } else {
      console.error("Failed to delete product:", response.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product }); // ✅ clone the product for editing
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const response = await useProductStore
      .getState()
      .updateProduct(selectedProduct._id, updatedProduct);
    if (response.success) {
      closeModal();
      fetchProducts(); // ✅ immediately reflect update
    } else {
      console.error("Failed to update product:", response.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setUpdatedProduct(null);
  };

  return (
    <>
      <Container maxW={"container.xl"} py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            textAlign={"center"}
            bgGradient="linear(to-r, red.400, blue.500)"
            bgClip="text"
          >
            Current Products
          </Text>

          {products.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              w={"full"}
            >
              {products.map((product) => (
                <Box
                  key={product._id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="200px"
                    objectFit="cover"
                    mx="auto"
                    borderRadius="md"
                    fallbackSrc="https://via.placeholder.com/200"
                  />
                  <Text fontSize="xl" fontWeight="bold" mt={2}>
                    {product.name}
                  </Text>
                  <Text color="blue.600" fontSize="lg">
                    ${product.price}
                  </Text>

                  <HStack spacing={4} mt={4}>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      aria-label="Edit Product"
                      onClick={() => handleEditClick(product)}
                    />
                    <IconButton
                      icon={<MdDelete />}
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete Product"
                      onClick={() => handleDelete(product._id)}
                    />
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              No Products Found{" "}
              <Link to={"/create"}>
                <Text
                  as={"span"}
                  color={"blue.500"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a Product
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>

      {/* ✅ Custom Modal */}
      {isModalOpen && updatedProduct && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}>
              Edit Product
            </h2>
            <Input
              name="name"
              placeholder="Product Name"
              value={updatedProduct.name || ""}
              onChange={handleEditChange}
              mb={2}
            />
            <Input
              name="price"
              placeholder="Price"
              type="number"
              value={updatedProduct.price || ""}
              onChange={handleEditChange}
              mb={2}
            />
            <Input
              name="image"
              placeholder="Image URL"
              value={updatedProduct.image || ""}
              onChange={handleEditChange}
              mb={2}
            />
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button onClick={closeModal} variant="outline">
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;

// Custom Modal Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  width: "400px",
};
