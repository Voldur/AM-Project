import { Center, Heading, Image, Text } from "native-base";
import React from "react";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";

function ProfileScreen() {
  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{
            uri: "https://cdn.vox-cdn.com/thumbor/qz69U-p3xQ7BEcfsz9wp-D1PmrI=/0x0:599x399/1400x1400/filters:focal(0x0:599x399):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/5535551/cnbc_failed_celeb_businesses_hulk.0.jpg",
          }}
          alt="profile"
          w={24}
          h={24}
          borderRadius={100}
          resizeMode="cover"
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
          Hulk Hogan
        </Heading>
        <Text italic fontSize={10} color={Colors.white}>
          Joined 12.12.2022
        </Text>
      </Center>
      {/* TABS */}
      <Tabs />
    </>
  );
}

export default ProfileScreen;
