import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllShows} from '../Types/AllShows';

interface ShowCardProps {
  data: AllShows;
  navigation: any;
}

export const ShowCard = ({data, navigation}: ShowCardProps) => {
  const HandleCardPress = (id: string) => {
    navigation.navigate('Details', {id: id});
  };
  const {show} = data?._embedded;
  return (
    <TouchableOpacity
      onPress={() => HandleCardPress(show?.id)}
      activeOpacity={0.8}>
      <Image
        source={{uri: show?.image?.original}}
        style={{width: 400, height: 400}}
      />
      <Text>{show?.name}</Text>
    </TouchableOpacity>
  );
};
