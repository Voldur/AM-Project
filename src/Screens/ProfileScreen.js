import { Center, Heading, Image, Text } from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";
import firebase from 'firebase/app';
import 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const handleProfilePhoto = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // update the profile photo in firebase
        // you can use firebase.storage().ref().put()
        // or firebase.auth().currentUser.updateProfile({photoURL: result.uri});
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error('Permission not granted to access camera roll');
  }
};

function ProfileScreen() {
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  console.log(currentUser);
  if(currentUser.photoURL = null){
    currentUser.photoURL = "https://cdn.vox-cdn.com/thumbor/qz69U-p3xQ7BEcfsz9wp-D1PmrI=/0x0:599x399/1400x1400/filters:focal(0x0:599x399):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/5535551/cnbc_failed_celeb_businesses_hulk.0.jpg";
  }
  const photoUrl = "https://cdn.vox-cdn.com/thumbor/qz69U-p3xQ7BEcfsz9wp-D1PmrI=/0x0:599x399/1400x1400/filters:focal(0x0:599x399):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/5535551/cnbc_failed_celeb_businesses_hulk.0.jpg";

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{ uri: photoUrl }}
          alt="profile"
          w={24}
          h={24}
          borderRadius={100}
          resizeMode="cover"
          onPress={handleProfilePhoto}
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
          {currentUser.displayName}
        </Heading>
        <Text italic fontSize={10} color={Colors.white}>
          Joined {currentUser.metadata.creationTime}
        </Text>
      </Center>
      {/* TABS */}
      <Tabs />
    </>
  );
}

export default ProfileScreen;
