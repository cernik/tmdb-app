import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Card from "./components/Card";
import Badge from "./components/Badge";
import Button from "./components/Button";

import styles, { MARGIN } from "./styles";

import { useAsyncStorage } from "./helper";

const DetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [storageData, updateStorageData, clearStorageData] = useAsyncStorage(
    "selectedItems",
    []
  );

  const selected =
    storageData.length && storageData.filter(x => x.id === data.id).length;

  const handlePress = React.useCallback(() => {
    let nextStorageData = storageData;
    if (selected) {
      nextStorageData = nextStorageData.filter(x => x.id !== data.id);
    } else {
      nextStorageData = nextStorageData.concat([data]);
    }

    updateStorageData(nextStorageData);
  }, [data, storageData, selected]);

  const handleFavoritesPress = React.useCallback(() => {
    navigation.navigate("Favorites");
  }, [navigation]);

  React.useEffect(() => {
    if (!storageData.length) {
      return navigation.setOptions({
        headerRight: null,
      });
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleFavoritesPress}
          style={{ marginHorizontal: 18 }}
        >
          <FontAwesome name="shopping-basket" size={22} />
          <Badge
            badgeStyle={styles.badge}
            textStyle={{ fontSize: 10, color: "white" }}
            text={storageData.length}
          />
        </TouchableOpacity>
      ),
    });
  }, [storageData, navigation, handleFavoritesPress]);

  return (
    <View style={styles.container}>
      <Card data={data} style={[styles.bottomHairLine, styles.row]} />
      <Text style={[styles.text, { margin: MARGIN }]}>{data.overview}</Text>
      <Button
        style={{ width: 200 }}
        title={selected ? "Remove from favorites" : "Add to favorites"}
        onPress={handlePress}
      />
    </View>
  );
};

export default DetailScreen;
