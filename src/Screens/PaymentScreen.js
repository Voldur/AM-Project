import {
  Box,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  Button,
} from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import { addPaymentMethod } from './../data/Firebase'

const paymentMethodes = [
  {
    image: require("../../assets/images/paypal.png"),
    alt: "paypal",
  },
  {
    image: require("../../assets/images/mastercard.png"),
    alt: "mastercard",
  },
  {
    image: require("../../assets/images/googlepay.png"),
    alt: "googlepay",
  },
];

function PaymentScreen() {
  const navigation = useNavigation();

  const handlePress = (paymentMethod) => {
    addPaymentMethod(paymentMethod);
    navigation.navigate("Placeorder");
  }

  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* Header */}
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          PAYMENT METHOD
        </Text>
      </Center>
      {/* Selection */}
      <Box h="full" bg={Colors.lightGray} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethodes.map((i, index) => (
              <Button
                key={index}
                bg={Colors.white}
                px={3}
                py={1}
                rounded={10}
                onPress={() => handlePress(i.alt)}
              >
                <Box>
                  <Image
                    source={i.image}
                    alt={i.alt}
                    resizeMode="contain"
                    w={60}
                    h={50}
                  />
                </Box>
              </Button>
            ))}
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
