import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Input({
  label,
  textInputConfig,
  isHidden = false,
}: {
  label?: string;
  textInputConfig: any;
  isHidden?: boolean;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const labelStyle = () => {
    let labelStyles;
    if (label == null) {
      labelStyles = {
        height: 0,
      };
    } else {
      labelStyles = {
        color: "black",
        fontSize: 16,
        marginBottom: 5,
      };
    }
    return labelStyles;
  };
  return (
    <View>
      <Text style={labelStyle()}>{label}</Text>
      <View style={styles.wrapper}>
        <TextInput
          secureTextEntry={isHidden ? !showPassword : false}
          style={styles.input}
          {...textInputConfig}
          placeholderTextColor={"#808080"}
          returnKeyType="done"
        />

        {isHidden && (
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={25}
            color="#808080"
            style={{
              marginRight: 10,
              position: "absolute",
              right: 0,
              top: 6,
              bottom: 0,
            }}
            onPress={toggleShowPassword}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    position: "relative",
  },
  input: {
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 22,
    padding: 6,
    paddingHorizontal: 18,
  },
});
