import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { noop } from "utils";
import styles from "../styles";
import Row from "./Row";
import Card from "./Card";

const CardItem = ({ data = {}, onPress = noop }) => {
  const handlePress = React.useCallback(() => {
    onPress(data);
  }, [data, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card
        data={data}
        style={[styles.shadow, { maxHeight: 102 }, styles.row]}
      />
    </TouchableOpacity>
  );
};

const List = ({ data = [], onItemPress = noop, style }) => {
  const handlePress = React.useCallback(
    data => {
      onItemPress(data);
    },
    [data, onItemPress]
  );

  const renderItem = React.useCallback(
    ({ item, index }) => <CardItem data={item} onPress={handlePress} />,
    [data]
  );

  const renderListEmptyComponent = () => (
    <View style={[styles.container, styles.box, styles.emptyComponent]}>
      <Text style={styles.title}>No data found</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(index)}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

export default List;
