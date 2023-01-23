import { Box } from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import HomeProducts from "../Components/HomeProducts";
import HomeSearch from "../Components/HomeSearch";

function HomeScreen() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box flex={1} bg={Colors.lightGray}>
      <HomeSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <HomeProducts searchValue={searchValue} />
    </Box>
  );
}

export default HomeScreen;
