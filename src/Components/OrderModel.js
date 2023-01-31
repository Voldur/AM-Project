import {
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import Buttone from "./Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { cartsRef, fetchCartItems, fetchProducts } from "../data/Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const OrderModel = () => {
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

  function placeOrder(totalAmount, payNow) {
    try {
      const user = firebase.auth().currentUser;
      const creationDate = new Date();
      const userUID = user.uid;

      firebase.firestore().collection('orders').add({
        creationDate,
        payNow,
        totalAmount,
        userUID,
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }

  function delCart() {
    firebase.firestore().collection("cart")
    .where("userUID", "==", currentUser.uid)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .catch(error => {
      console.error("Error deleting documents: ", error);
    });
  }

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
        bg={Colors.main}
        color={Colors.white}
        mt={5}
      >
        SHOW PAYMENT & TOTAL
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
                    {i.price} PLN
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
              <Button
              w="full"
              mt={2}
              bg={Colors.black}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("Home");
                placeOrder(OrdersInfos[3].price,1);
                delCart();
                setShowModel(false);
              }}
              _pressed={{
                bg: Colors.black,
              }}
            >
              PAY NOW
            </Button>
            <Button
              w="full"
              mt={2}
              bg={Colors.black}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("Home");
                placeOrder(OrdersInfos[3].price,0);
                delCart();
                setShowModel(false);
              }}
              _pressed={{
                bg: Colors.black,
              }}
            >
              PAY LATER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default OrderModel;
