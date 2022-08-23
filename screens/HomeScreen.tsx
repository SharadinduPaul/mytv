import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import {colors} from '../assets/Colors';
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
    <SafeAreaView style={styles.background}>
      <FlatList
        data={data}
        keyExtractor={item => item?._embedded?.show?.id + Math.random()}
        renderItem={({item}: {item: AllShows}) => (
          <ShowCard data={item} navigation={navigation} />
        )}
        initialNumToRender={10}
        numColumns={2}
        removeClippedSubviews
        maxToRenderPerBatch={5}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background_primary,
  },
});
