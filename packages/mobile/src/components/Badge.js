import React from "react";
import { View, Text } from "react-native";

import styles from "../styles";

const Badge = React.memo(({ text = "", badgeStyle, textStyle }) => (
  <View style={[styles.badgeContainer, badgeStyle]}>
    <Text style={[styles.rating, textStyle]}>{text}</Text>
  </View>
));

export default Badge;
