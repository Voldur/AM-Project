import { Input, HStack } from "native-base";
import React from 'react';
import Colors from "../color";

function HomeSearch({ setSearchValue, searchValue }) {
  return (
    <HStack
      space={3}
      w="full"
      px={6}
      bg={Colors.main}
      py={4}
      alignItems="center"
      safeAreaTop
    >
    <Input 
    placeholder="Search for products..."
    w="100%"
    bg={Colors.white}
    type="search"
    variant="filled"
    h={12}
    borderWidth={0}
    _focus={{
      bg: Colors.white,
    }}
      onChangeText={(searchValue) => setSearchValue(searchValue)}
      value={searchValue}
    />
    </HStack>
  );
}

export default HomeSearch;