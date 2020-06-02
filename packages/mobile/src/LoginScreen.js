import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import AuthContext from "./context";

import WelcomeBlock from "./components/WelcomeBlock";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "./components/LoginButton";

import styles, { MARGIN, PADDING } from "./styles";

const LoginScreen = ({ navigation }) => {
  const { login, user = {} } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <WelcomeBlock user={user} />
      <View style={{ marginBottom: MARGIN * 15 }}>
        <FacebookLoginButton onLogin={login} />
        <GoogleLoginButton onLogin={login} />
      </View>
    </View>
  );
};

export default LoginScreen;
