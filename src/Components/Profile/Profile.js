import React, { useState } from "react";
import { Box, FormControl, Input, ScrollView, VStack, Text } from "native-base";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Orders from "./Orders";
import firebase from 'firebase/app';
import 'firebase/auth';
import { db } from './../../data/Firebase';
import Colors from "../../color";
import Buttone from "../Buttone";

const Inputs = [
  {
    label: "USERNAME",
    type: "text",
  },
  {
    label: "EMAIL",
    type: "text",
  },
  {
    label: "NEW PASSWORD",
    type: "password",
  },
  {
    label: "CONFIRM PASSWORD",
    type: "password",
  },
];

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleUpdateProfile = async () => {
    const user = firebase.auth().currentUser;
    let error = "";
    try {
      // Check if email is valid
      if (email) {
        if (!email.includes("@")) {
          error = "Wrong email or password";
        } else {
          await user.updateEmail(email);
        }
      }
      // Check if passwords match
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          error = "Wrong email or password";
        } else {
          await user.updatePassword(newPassword);
        }
      }
      if (username) {
        await user.updateProfile({ displayName: username });
      }
      
    } catch (e) {
      error = e.message;
    }
    setErrorMessage(error);
  };



  return (
    <Box h="full" bg={Colors.white} px={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} mt={5} pb={10}>
          {Inputs.map((i, index) => (
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
                borderWidth={0.2}
                bg={Colors.lightGray}
                borderColor={Colors.black}
                py={4}
                type={i.type}
                color={Colors.black}
                fontSize={15}
                onChangeText={
                  i.label === "USERNAME"
                    ? (text) => setUsername(text)
                    : i.label === "EMAIL"
                      ? (text) => setEmail(text)
                      : i.label === "NEW PASSWORD"
                        ? (text) => setNewPassword(text)
                        : (text) => setConfirmPassword(text)
                }
                _focus={{
                  bg: Colors.lightGray,
                  borderColor: Colors.main,
                  borderWidth: 1,
                }}
              />
            </FormControl>
          ))}
          <Text color={Colors.red}>{errorMessage}</Text>
          <Buttone onPress={handleUpdateProfile} bg={Colors.main} color={Colors.white}>
            UPDATE PROFILE
          </Buttone>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Profile;
