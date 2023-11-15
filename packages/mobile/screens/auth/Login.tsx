import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import Card from "../components/card";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";
import { storeData } from "../../helpers";

export default function Login({}: NativeStackScreenProps<
  StackScreens,
  "Login"
>) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled] = useState( !(username?.length > 1) || !(password.length > 1))
  

  const signInHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_WEBAPP_ROOT}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data, success, message } = response.data

      if (success) {
        const { token } = data;
        setSuccess(message);
        await storeData("TAKE_HOME_TOKEN", token);
        setErrorMessage("");
        setUsername("");
        setPassword("");
      } else {
        setErrorMessage(message);
      }
    } catch (error: any) {
      setErrorMessage(`${error.response.data.message} Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Card>
        <View style={styles.inputs}>
          <Input
            label="User Name"
            textInputConfig={{
              autocapitalize: "none",
              autoFocus: true,
              minLength: 4,
              placeholder: "enter your username",
              value: username,
              onChangeText: (text: string) => setUsername(text),
            }}
          />
          <Input
            label="Password"
            isHidden={true}
            textInputConfig={{
              autocapitalize: "none",
              minLength: 4,
              placeholder: "********",
              value: password,
              onChangeText: (text: string) => setPassword(text),
            }}
          />
        </View>

        <Pressable
          onPress={signInHandler}
       
          style={{
            ...styles.button,
            backgroundColor: disabled ? "grey" : "#6495ED",
          }}
        >
          <Text style={styles.text}>Sign in</Text>
        </Pressable>
      </Card>
      <View>
        {error && (
          <Text
            style={{
              ...styles.messageText,
              backgroundColor: "#ef9a9a",
              color: "#f44336",
            }}
          >
            {error}
          </Text>
        )}
        {success && (
          <Text
            style={{
              ...styles.messageText,
              color: "#FFF5EE",
              backgroundColor: "#2E8B57",
            }}
          >
            {success}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "Azure",
  },
  input: {
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 22,
    padding: 4,
    paddingHorizontal: 12,
  },
  inputs: {
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6495ED",
    padding: 10,
    paddingHorizontal: 15,
    color: "white",
    textAlign: "center",
    borderRadius: 20,
  },
  messageText: {
    alignSelf: "center",
    fontSize: 25,
    padding: 6,
    borderRadius: 15,
  },
});
