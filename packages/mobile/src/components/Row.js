import React from "react";
import { View } from "react-native";

import styles from "../styles";

const Row = ({ style = {}, children = React.Node }) => (
  <View style={[styles.row, style]}>{children}</View>
);

export default Row;
