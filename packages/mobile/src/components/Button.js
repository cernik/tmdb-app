import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { noop } from "utils";
import styles from "../styles";

const Button = React.memo(
  ({ title, onPress = noop, style, children = React.Node }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonTitle}>{title}</Text>
      {children}
    </TouchableOpacity>
  )
);

export default Button;
