import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import Colors from "../color";
import Buttone from "../Components/Buttone";
// import CartEmpty from "../Components/CartEmpty";
import CartIterms from "../Components/CartIterms";
import { cartsRef, fetchCartItems, fetchProducts } from "../data/Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

function CartScreen() {
  const navigation = useNavigation();
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  const [cartItems, setCartItems] = useState([]);
  const [products, setproducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems(user.uid).then(data => {
      setCartItems(data);
    });
  }, [user]);

  useEffect(() => {
    if (cartItems.length) {
      let total = 0;
      let productsData = []
      cartItems.map(item => {
        firebase.firestore().collection('product').where("id", "==", item.productID).get()
          .then(productSnapshot => {
            productSnapshot.forEach(product => {
              const productData = {
                productID: product.data().productID,
                price: product.data().price,
                quantity: item.quantity
              }
              productsData.push(productData);
              total += productData.price * productData.quantity;
            });
            setTotalPrice(total);
            setproducts(productsData);
          });
      });
    }
  }, [cartItems]);

  return (
    <Box flex={1} safeAreaTop bg={Colors.lightGray}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={20} bold>
          Cart
        </Text>
      </Center>
      {/* IF CART IS EMPTY
      <CartEmpty /> */}
      {/* CART ITEMS */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartIterms products={products} />
        {/* Total */}
        <Center mt={5}>
          <HStack
            rounded={50}
            justifyContent="space-between"
            bg={Colors.white}
            shadow={2}
            w="90%"
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text>Total</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg={Colors.main}
              _text={{
                color: Colors.white,
                fontWeight: "semibold",
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              {totalPrice} PLN
            </Button>
          </HStack>
        </Center>

        {/* Checkout */}
        <Center px={5}>
          <Buttone
            onPress={() => navigation.navigate("Shipping")}
            bg={Colors.black}
            color={Colors.white}
            mt={10}
          >
            CHECKOUT
          </Buttone>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
