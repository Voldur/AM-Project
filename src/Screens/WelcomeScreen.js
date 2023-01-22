import { Box, Center, Image, VStack } from "native-base";
import React from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <Box flex={1} bg={Colors.main} safeAreaTop>
      <Center w="full" h={250}>
        <Image
          source={require("../../assets/favicon.png")}
          alt="Logo"
          size="2xl"
          mt={10}
        />
      </Center>
      <VStack space={10} px={5} alignItems="center" mt={10}>
        <Buttone bg={Colors.black} color={Colors.white} onPress={() => navigation.navigate("Register")} mt={5}>
          REGISTER
        </Buttone>
        <Buttone bg={Colors.white} color={Colors.black} onPress={() => navigation.navigate("Login")} mt={5}>
          LOGIN
        </Buttone>
      </VStack>
    </Box>
  );
}

export default WelcomeScreen;
