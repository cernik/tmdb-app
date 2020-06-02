import React from "react";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles, { MARGIN } from "../styles";

const Avatar = React.memo(({ avatar = "", mini = false }) =>
  avatar ? (
    <Image
      style={mini ? styles.miniavatar : styles.avatar}
      source={{ uri: avatar }}
    />
  ) : (
    <FontAwesome
      name="user-circle-o"
      size={mini ? 20 : 120}
      style={{ margin: MARGIN }}
      color="black"
    />
  )
);

export default Avatar;
