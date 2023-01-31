import { Button, Center, HStack, Modal, Text, VStack } from "native-base";
import Buttone from "./Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { cartsRef, fetchCartItems, fetchProducts } from "../data/Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const PlaceOrderModel = () => {
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems(user.uid).then(data => {
      setCartItems(data);
    });
  }, [user]);

  useEffect(() => {
    if (cartItems.length) {
      let total = 0;
      cartItems.map(item => {
        firebase.firestore().collection('product').where("id", "==", item.productID).get()
          .then(productSnapshot => {
            productSnapshot.forEach(product => {
              const productData = {
                productID: product.data().productID,
                price: product.data().price,
                quantity: item.quantity
              }
              total += productData.price * productData.quantity;
            });
            setTotalPrice(total);
          });
      });
    }
  }, [cartItems]);

  const OrdersInfos = [
    {
      title: "Products",
      price: totalPrice.toFixed(2),
      color: "black",
    },
    {
      title: "Shipping",
      price: (cartItems.length * 5).toFixed(2),
      color: "black",
    },
    {
      title: "Tax",
      price: (totalPrice * 0.23).toFixed(2),
      color: "black",
    },
    {
      title: "Total Amount",
      price: (totalPrice + (cartItems.length * 2) + (totalPrice * 0.23)).toFixed(2),
      color: "main",
    },
  ];

  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.black}
        color={Colors.white}
        mt={5}
      >
        SHOW TOTAL
      </Buttone>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <Modal.Content maxWidth={350}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={7}>
              {OrdersInfos.map((i, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontWeight="medium">{i.title}</Text>
                  <Text
                    color={i.color === "main" ? Colors.main : Colors.black}
                    bold
                  >
                    ${i.price}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex={1}
              bg={Colors.main}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("order");
                setShowModel(false);
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              PLACE AN ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PlaceOrderModel;
