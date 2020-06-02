import * as React from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useFetch } from "utils";

import List from "./components/List";
import Avatar from "./components/Avatar";
import AuthContext from "./context";

import styles, { MARGIN } from "./styles";

const URL = Constants.manifest.extra.apiUrl;

const HomeScreen = ({ navigation }) => {
  const { response } = useFetch(URL);
  const { logout, user = {} } = React.useContext(AuthContext);

  const handleItemPress = React.useCallback(
    data => {
      navigation.navigate("Details", { data });
    },
    [navigation]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={logout} style={styles.headerButton}>
          <FontAwesome
            name="sign-out"
            size={22}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity disabled style={styles.headerButton}>
          <Avatar avatar={user.avatar} mini />
        </TouchableOpacity>
      ),
    });
  }, [logout, user]);

  return (
    <View style={styles.container}>
      {response ? (
        <List data={response.results} onItemPress={handleItemPress} />
      ) : (
        <ActivityIndicator size="large" color="orange" />
      )}
    </View>
  );
};

export default HomeScreen;
