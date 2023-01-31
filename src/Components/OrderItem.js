import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Center,
  ScrollView,
  HStack,
  View,
  Spacer,
  Text,
  Pressable,
  VStack,
} from "native-base";
import { cartsRef, fetchCartItems, fetchProducts } from "../data/Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import Colors from "../color";

const OrderList = (data) => {
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  const [cartItems, setCartItems] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchCartItems(user.uid).then(data => {
      setCartItems(data);
    });
  }, [user]);
  

  useEffect(() => {
    if (cartItems.length) {
      let productsData = []
      cartItems.map(item => {
        firebase.firestore().collection('product').where("id", "==", item.productID).get()
          .then(productSnapshot => {
            productSnapshot.forEach(product => {
              const productData = {
                id: product.id,
                name: product.data().name,
                image: product.data().image,
                price: product.data().price,
                quantity: item.quantity
              }
              productsData.push(productData);
              setproducts(products => [...products, productData]);
            });
          });
      });
    }
  }, [cartItems]);

  return (
    <Box mr={6}>
      <ScrollView>
        {
          products.map(data => (
            <Pressable key={data.id}>
              <Box ml={6} mb={3}>
                <HStack
                  alignItems="center"
                  bg={Colors.white}
                  shadow={1}
                  rounded={10}
                  overflow="hidden"
                >
                  <Center w="25%" bg={Colors.deepGray}>
                    <Image
                      source={{ uri: data.image }}
                      alt={data.name}
                      w="full"
                      h={24}
                      resizeMode="contain"
                    />
                  </Center>
                  <VStack w="60%" px={2} space={2}>
                    <Text isTruncated color={Colors.black} bold fontSize={10}>
                      {data.name}
                    </Text>
                    <Text bold color={Colors.lightBlack}>
                      {data.price} PLN
                    </Text>
                  </VStack>
                  <Center>
                    <Button
                      bg={Colors.main}
                      _pressed={{ bg: Colors.main }}
                      _text={{
                        color: Colors.white,
                      }}
                    >
                      {data.quantity}
                    </Button>
                  </Center>
                </HStack>
              </Box>
            </Pressable>
          ))}
      </ScrollView>
    </Box>
  );
}

  const OrderItem = () => {
    return (
      <Box mr={6}>
        <OrderList />
      </Box>
    );
  };

  export default OrderItem;