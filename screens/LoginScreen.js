import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import ChatIcon from "../assets/chat.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    auth
      .signInAnonymously()
      .then(() => navigation.navigate("Chat"))
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

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginTop: 64 }}>
        <Image source={ChatIcon} style={styles.img} />
      </View>
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(name) => {
            setName(name);
          }}
          value={name}
        />
      </View>
      <View style={{ alignItems: "flex-end", marginTop: 50, marginRight: 25 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="md-arrow-round-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  circle: {
    width: 530,
    height: 530,
    borderRadius: 530 / 2,
    backgroundColor: "#fff",
    position: "absolute",
    left: -100,
    top: -30,
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    color: "#514E5A",
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    borderRadius: 30,
    padding: 16,
    color: "#514E5A",
    fontWeight: "600",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075E3",
    alignItems: "center",
    justifyContent: "center",
  },
});
