import { Center, Heading, Image, Text, TouchableOpacity, View, Button } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Camera } from 'expo-camera';
import { updateProfilePicture } from './../data/Firebase'


function ProfileScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  let options = {year: "2-digit", month: "2-digit", day: "2-digit"};
  const creationDate = new Date(currentUser.metadata.creationTime).toLocaleDateString('de-DE', options).replace(/\//g, '.');
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

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

  useEffect(() => {
    setDisplayName(currentUser.displayName);
  }, [currentUser.displayName]);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setProfileImage(photo.uri);
      setIsCameraVisible(false);
      // Save image to Firebase Storage
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref().child("images/" + new Date().getTime() + ".jpg");
      ref.put(blob).then(function () {
        ref.getDownloadURL().then(function (downloadURL) {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            photoURL: downloadURL
          }).then(function () {
            console.log("Profile updated successfully with new profile picture");
          }).catch(function (error) {
            console.log("Error updating profile: " + error.message);
          });
        });
      });

    }
  }

  return (
    <>
      {/* Render the camera component */}
      {isCameraVisible && (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 300, height: 50 }}>
              <Button
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={handleTakePicture}
              >
                <Text style={{ fontSize: 14, marginBottom: 5, color: 'white', width: 45 }}> Snap </Text>
              </Button>
              <Button
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => setIsCameraVisible(false)}
              >
                <Text style={{ fontSize: 14, marginBottom: 5, color: 'white', width: 47 }}> Close </Text>
              </Button>
            </View>
          </View>


        </Camera>
      )}
      {/* Render the rest of the components */}
      {!isCameraVisible && (
        <>
          <Center bg={Colors.main} pt={10} pb={6}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                alt="profile"
                w={24}
                h={24}
                borderRadius={100}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: currentUser.photoURL }}
                alt="profile"
                w={24}
                h={24}
                borderRadius={100}
                resizeMode="cover"
              />
            )}
            <Button
              _pressed={{
                bg: Colors.main,
              }}
              bg={Colors.main}
              onPress={() => setIsCameraVisible(true)}
            >
              EDIT
            </Button>
            <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
              {displayName}
            </Heading>
            <Text italic fontSize={10} color={Colors.white}>
              Joined {creationDate}
            </Text>
          </Center>
          <Tabs />
        </>
      )
      }
    </>
  );
}

export default ProfileScreen;
