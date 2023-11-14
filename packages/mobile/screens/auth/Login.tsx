import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import Card from "../components/card";
import Input from "../components/Input";
import { useState } from "react";

export default function Login({}: NativeStackScreenProps<
  StackScreens,
  "Login"
>) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setErrorMessage] = useState<string>('') 
  const disabled = !(username?.length > 1) || !(password.length > 1)

  const signInHandler = async() => {
    console.log('pressed')
    try {
      const response = await fetch(`http://68.204.113.54/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful, you can navigate to the next screen or perform other actions
        console.log('Login successful');
      } else {
        // Login failed, update error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
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
              autoFocus: true,
              minLength: 4,
              placeholder: "******",
              value: password,
              onChangeText: (text: string) => setPassword(text),
            }}
          />
        </View>

        <Pressable
          onPress={signInHandler}
     
          style={{...styles.button, backgroundColor: disabled ? 'grey' : "#6495ED"}}
        >
          <Text style={styles.text}>Sign in</Text>
        </Pressable>
      </Card>
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
});
