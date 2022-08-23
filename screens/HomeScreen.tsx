import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import {ShowCard} from '../components/ShowCard';
import type {AllShows} from '../Types/AllShows';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState<AllShows[]>([]);
  const getAllShows = async () => {
    const rawData = await fetch('https://api.tvmaze.com/schedule/full');
    const jsonData: AllShows[] = await rawData.json();
    console.log(jsonData[1]);
    console.log(jsonData[1]._embedded.show?.id);

    setData(jsonData);
  };
  useEffect(() => {
    getAllShows();
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={item => item?._embedded?.show?.id + Math.random()}
        renderItem={({item}: {item: AllShows}) => (
          <ShowCard data={item} navigation={navigation} />
        )} //Item component to be placed here
        initialNumToRender={50}
        bounces
      />
    </SafeAreaView>
  );
};
