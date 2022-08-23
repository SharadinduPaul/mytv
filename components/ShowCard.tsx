import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../assets/Colors';
import {AllShows} from '../Types/AllShows';

interface ShowCardProps {
  data: AllShows;
  navigation: any;
}

export const ShowCard = ({data, navigation}: ShowCardProps) => {
  const HandleCardPress = (id: string) => {
    navigation.navigate('Details', {id: id, data: data});
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => HandleCardPress(data?.id)}
      activeOpacity={0.8}>
      <View style={styles.cardView}>
        <Image source={{uri: data?.image?.original}} style={styles.cardImage} />
        <Text style={styles.cardText}>{data?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '46%',
    margin: '2%',
  },
  cardView: {
    backgroundColor: colors.background_light,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: 250,
    elevation: 20,
    shadowColor: '#52006A',
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#4a4a4a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardText: {
    color: colors.text_primary,
    fontSize: 16,
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 10,
  },
});