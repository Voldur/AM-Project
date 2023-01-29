import React, { useState, useEffect } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
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
import { FontAwesome } from "@expo/vector-icons";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import Colors from "../color";

const CartList = (data) => {
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
      console.log(cartItems);
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
            });
            setproducts(productsData);
          });
      });
    }
  }, [cartItems]);


  return (
    <SwipeListView
      data={products}
      renderItem={(data) => renderitem(data)}
      renderHiddenItem={hiddenItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Cart Item
const renderitem = (data, products) => (
  <Pressable>
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
            source={{ uri: data.item.image }}
            alt={data.item.name}
            w="full"
            h={24}
            resizeMode="contain"
          />
        </Center>
        <VStack w="60%" px={2} space={2}>
          <Text isTruncated color={Colors.black} bold fontSize={10}>
            {data.item.name}
          </Text>
          <Text bold color={Colors.lightBlack}>
            {data.item.price} PLN
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
            {data.item.quantity}
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);

// Hidden
const hiddenItem = () => (
  <Pressable
    w={50}
    roundedTopRight={10}
    roundedBottomRight={10}
    h="88%"
    ml="auto"
    justifyContent="center"
    bg={Colors.red}
  >
    <Center alignItems="center" space={2}>
      <FontAwesome name="trash" size={24} color={Colors.white} />
    </Center>
  </Pressable>
);

const CartIterms = () => {
  return (
    <Box mr={6}>
      <CartList />
    </Box>
  );
};

export default CartIterms;