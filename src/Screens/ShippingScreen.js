import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Box, Center, FormControl, Input, ScrollView, Text, VStack } from "native-base";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { addShippingData } from './../data/Firebase';

const ShippingInputs = [
  {
    label: "ENTER CITY",
    type: "text",
  },
  {
    label: "ENTER COUNTRY",
    type: "text",
  },
  {
    label: "ENTER POSTAL CODE",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
  },
];

function ShippingScreen() {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  
  const handleAddShippingData = async () => {
    if (!city || !country || !postalCode || !address) {
      alert('Please fill all the fields');
      return;
    }
    const data = {
      city,
      country,
      postalCode,
      address
    };
    addShippingData(data);
    navigation.navigate("Checkout");
  };
  

  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          DELIVERY ADDRESS
        </Text>
      </Center>
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {ShippingInputs.map((i, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {i.label}
                </FormControl.Label>
                <Input
                  value={i.label === 'ENTER CITY' ? city : i.label === 'ENTER COUNTRY' ? country : i.label === 'ENTER POSTAL CODE' ? postalCode : address}
                  onChangeText={i.label === 'ENTER CITY' ? text => setCity(text) : i.label === 'ENTER COUNTRY' ? text => setCountry(text) : i.label === 'ENTER POSTAL CODE' ? text => setPostalCode(text) : text => setAddress(text)}
                  borderWidth={0.2}
                  borderColor={Colors.main}
                  bg={Colors.lightGray}
                  py={4}
                  type={i.type}
                  color={Colors.black}
                  _focus={{
                    bg: Colors.lightGray,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                />
              </FormControl>
            ))}
            <Buttone
              onPress={() => handleAddShippingData()}
              bg={Colors.main}
              color={Colors.white}
              mt={5}
            >
              CONTINUE
            </Buttone>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
