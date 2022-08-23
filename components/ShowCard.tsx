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
    navigation.navigate('Details', {id: id});
  };
  const show = data?._embedded?.show;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => HandleCardPress(show?.id)}
      activeOpacity={0.8}>
      <View style={styles.cardView}>
        <Image source={{uri: show?.image?.original}} style={styles.cardImage} />
        <Text style={styles.cardText}>{show?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background_light,
    width: '46%',
    margin: '2%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    elevation: 20,
    shadowColor: '#52006A',
    paddingBottom: 10,
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
  },
});