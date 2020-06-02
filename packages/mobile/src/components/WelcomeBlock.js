import React from "react";
import { View, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles, { MARGIN } from "../styles";
import Avatar from "./Avatar";

const WelcomeTitle = ({ name = "Stranger!" }) => (
  <Text style={styles.title}>{`Welcome, ${name}`}</Text>
);

const WelcomeBlock = ({ user = {} }) => (
  <View style={[styles.box, styles.flex1]}>
    <WelcomeTitle name={user.name} />
    <Avatar avatar={user.avatar} />
    <Text style={styles.title}>
      Please log in to continue to the awesomeness
    </Text>
  </View>
);

export default WelcomeBlock;
