import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const SplashScreen = () => (
  <View style={[styles.box, styles.container]}>
    <Text style={styles.title}>Loading...</Text>
  </View>
);

export default SplashScreen;
