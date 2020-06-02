import * as React from "react";
import { View, ActivityIndicator } from "react-native";

import List from "./components/List";

import { useAsyncStorage } from "./helper";
import styles from "./styles";

const FavoritesScreen = ({ navigation }) => {
  const [data] = useAsyncStorage("selectedItems", []);

  const handleItemPress = React.useCallback(
    data => {
      navigation.navigate("Details", { data });
    },
    [navigation]
  );

  return <List data={data} onItemPress={handleItemPress} />;
};

export default FavoritesScreen;
