import { View, StyleSheet } from "react-native";

const Card = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    borderRadius: 12,
  },
});
