import { Box, Heading, ScrollView, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import Colors from "../color";
import OrderInfo from "../Components/OrderInfo";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import OrderItem from "../Components/OrderItem";
import CartIterms from "../Components/CartIterms";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { cartsRef, fetchCartItems, fetchProducts } from "../data/Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

function PlaceOrderScreen() {

  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  const [cartItems, setCartItems] = useState([]);
  const [products, setproducts] = useState([]);
  const [shippingData, setShippingData] = useState({});
const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    fetchCartItems(user.uid).then(data => {
      setCartItems(data);
    });
  }, [user]);

  useEffect(() => {
    if (cartItems.length) {
      console.log(cartItems);
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
              console.log(productData);
              productsData.push(productData);
            });
          });
      });
      setproducts(productsData);
    }
  }, [cartItems]);

  useEffect(() => {
    console.log("TU ZACZYNA");
    if (user) {
      const shippingRef = firebase.firestore().collection('shipping').where("userUID", "==", user.uid);
      const paymentsRef = firebase.firestore().collection('payments').where("userUID", "==", user.uid);
      console.log("TU: "+shippingRef);
      shippingRef.orderBy("date", "desc").limit(1).get()
        .then(shippingSnapshot => {
          console.log("TU: "+shippingSnapshot.date);
          if (!shippingSnapshot.empty) {
            shippingSnapshot.forEach(shipping => {
              setShippingData(shipping.data());
            });
          }
        });
      paymentsRef.orderBy("date", "desc").limit(1).get()
        .then(paymentSnapshot => {
          if (!paymentSnapshot.empty) {
            paymentSnapshot.forEach(payment => {
              setPaymentMethod(payment.data().paymentMethod);
            });
          }
        });
    }
    console.log("TU KONCZY");
  }, [user]);

  return (
    <Box bg={Colors.lightGray} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <OrderInfo
            title="CUSTOMER"
            subTitle={user.displayName}
            text={user.email}
            icon={<FontAwesome name="user" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="SHIPPING INFO"
            subTitle={`Shipping: ${shippingData.city}`}
            text={`Pay Method: ${paymentMethod}`}
            icon={
              <FontAwesome5
                name="shipping-fast"
                size={30}
                color={Colors.white}
              />
            }
          />
          <OrderInfo
            title="DELIVER TO"
            subTitle="Address:"
            text="Sosnowiec, Dziurowiso 23, P.O BOX 1234"
            icon={
              <Ionicons name="location-sharp" size={30} color={Colors.white} />
            }
          />
        </ScrollView>
      </Box>
      {/* Order Iterm */}
      <Box px={6} flex={1} pb={3}>
        <Heading bold fontSize={15} isTruncated my={4}>
          PRODUCTS
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderItem products={products} />
        </ScrollView>
        {/* Total */}
        <PlaceOrderModel />
      </Box>
    </Box>
  );
}

export default PlaceOrderScreen;
