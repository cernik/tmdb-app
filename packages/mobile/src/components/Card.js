import React from "react";
import { View, Image, Text } from "react-native";
import Constants from "expo-constants";

import styles from "../styles";
import Row from "./Row";
import Badge from "./Badge";

const IMAGE_URL_PREFIX = Constants.manifest.extra.imageUrlPrefix;

const Poster = React.memo(({ imagePath = "", width = 92, style }) => {
  const uri = `${IMAGE_URL_PREFIX}w${width}/${imagePath}`;
  return <Image style={[styles.icon, style]} source={{ uri }} />;
});

const Card = React.memo(({ data, style, children, preview }) => {
  const year = new Date(data.release_date).getFullYear();

  return (
    <View style={[styles.card, style]}>
      <Poster imagePath={data.poster_path} />
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.name}>
          {data.title}
        </Text>
        <Row style={styles.infoRow}>
          <Badge text={data.vote_average} />
          <Text style={styles.yearText}>{year}</Text>
        </Row>
      </View>
      {children}
    </View>
  );
});

export default Card;
