import { Box, Button, HStack, ScrollView, Text } from "native-base";
import { Pressable } from "react-native";
import Colors from "../../color";
import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userUID = firebase.auth().currentUser.uid;
      let options = { year: "2-digit", month: "2-digit", day: "2-digit" };
      const snapshot = await firebase
        .firestore()
        .collection("orders")
        .where("userUID", "==", userUID)
        .get();
        console.log(snapshot.id);
      setOrders(
        snapshot.docs.map((doc) => {
          let order = doc.data();
          order.creationDate = new Date(order.creationDate.toDate()).toLocaleDateString("en-US", options);
          return order;
        })
      );
    }
    fetchData();
  }, []);

  return (
    <Box h="full" bg={Colors.white} pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <Pressable key={order.uid}>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
              bg={order.payNow ? Colors.deepGray : Colors.white}
              py={5}
              px={2}
            >
              <Text fontSize={9} color={Colors.blue} isTruncated>
                {order.uid}
              </Text>
              <Text
                fontSize={12}
                bold
                color={Colors.black}
                isTruncated
              >
                {order.payNow ? "PAID" : "NOT PAID"}
              </Text>
              <Text fontSize={11} italic color={Colors.black} isTruncated>
                {order.creationDate}
              </Text>
              <Button
                px={7}
                py={1.5}
                rounded={50}
                bg={order.payNow ? Colors.green : Colors.red}
                _text={{
                  color: Colors.white,
                }}
                _pressed={{
                  bg: order.payNow ? Colors.green : Colors.red,
                }}
              >
                {order.totalAmount} PLN
              </Button>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Orders;
