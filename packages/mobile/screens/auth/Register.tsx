import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import Card from "../components/card";
import Input from "../components/Input";
import { useState } from "react";

export default function Register({}: NativeStackScreenProps<
  StackScreens,
  "Register"
>) {
  const [username, setUsername] = useState<string >('');
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const disabled = !(username?.length > 1) || !!(password !== password2)
  

  const registerHandler = () => {
   
    console.log("sign in");
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
           <Input
            label="Reenter Password"
            isHidden={true}
            textInputConfig={{
              autoFocus: true,
              minLength: 4,
              placeholder: "******",
              value: password2,
              onChangeText: (text: string) => setPassword2(text),
            }}
          />
        </View>

        <Pressable
          onPress={registerHandler}
          disabled={disabled}
          style={{...styles.button, backgroundColor: disabled ? 'grey' : "#6495ED"}}
        >
          <Text style={styles.text}>Sign up</Text>
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
