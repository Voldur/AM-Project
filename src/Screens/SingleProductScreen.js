import {
  Box,
  Heading,
  Image,
  ScrollView,
  HStack,
  View,
  Spacer,
  Text,
} from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import Buttone from "../Components/Buttone";
import Review from "../Components/Review";
import { handleAddToCart } from '../data/Firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigation } from "@react-navigation/native";

function SingleProductScreen({ route }) {
  const [value, setValue] = useState(0);
  const navigation = useNavigation();
  const product = route.params;
  const addToCart = async () => {
    const user = await firebase.auth().currentUser;
    if(user){
      await handleAddToCart(product.id, value, user.uid);
    }
    else{
      console.log("User not logged in");
    }
  }

  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          mt={5}
          source={{ uri: product.image }}
          alt="Image"
          w="full"
          h={300}
          resizeMode="contain"
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {product.name}
        </Heading>
        {/*<Rating value={product.rating} text={`${product.numReviews} reviews`} />*/}
        <HStack space={2} alignItems="center" my={5}>
            <NumericInput
              value={value}
              onChange={setValue}
              totalWidth={140}
              totalHeight={30}
              iconSize={25}
              step={1}
              minValue={0}
              borderColor={Colors.deepGray}
              rounded
              textColor={Colors.black}
              iconStyle={{ color: Colors.white }}
              rightButtonBackgroundColor={Colors.main}
              leftButtonBackgroundColor={Colors.main}
            />
          <Spacer />
          <Heading bold color={Colors.black} fontSize={19}>
            {product.price} PLN
          </Heading>
        </HStack>
        <Text lineHeight={24} fontSize={12}>
          {product.description}
        </Text>
          <Buttone
          onPress={() => {
            if(value){
              addToCart();
            }
            navigation.navigate("Cart");
          }}
          bg={Colors.main}
          color={Colors.white}
          mt={10}
        >
          ADD TO CART
        </Buttone>
        {/* REVIEW */}
        {/*<Review />*/}
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
