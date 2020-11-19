import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth } from "../config/firebase";

export default function ChatScreen() {
  const [login, setLogin] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          error,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    auth.onAuthStateChanged((user) => {
      if (isSubscribed) {
        if (user) {
          setLogin(user.uid);
          // console.log(user);
        } else {
          setLogin("error");
        }
      }
    });
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.profile}>
      <Button onPress={logout} title="Logout" color="#841584" />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: login,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    marginTop: 64,
    backgroundColor: "#fff",
  },
});
