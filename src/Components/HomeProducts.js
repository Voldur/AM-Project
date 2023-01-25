import { useEffect, useState } from 'react';
import { fetchProducts } from './../data/Firebase';
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from "native-base";
import React from "react";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";

function HomeProducts({ searchValue }) {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
    }
    fetchData();
  }, []);

  const filteredProducts = searchValue.length > 0 ? products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue.toLowerCase());
  }) : products;

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {filteredProducts.map((product) => (
          <Pressable
            onPress={() => navigation.navigate("Single", product)}
            key={product._id}
            w="47%"
            bg={Colors.white}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={{ uri: product.image }}
              alt={product.name}
              w="full"
              mt={5}
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                ${product.price}
              </Heading>
              <Text fontSize={10} mt={1} isTruncated w="full">
                {product.name}
              </Text>
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;