import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {colors} from '../assets/Colors';
import {ShowCard} from '../components/ShowCard';
import type {AllData, AllShows, SearchedData} from '../Types/AllShows';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  let allShowsData: AllData[];
  const [data, setData] = useState<AllData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<SearchedData[]>([]);

  const getAllShows = async () => {
    try {
      const rawData = await fetch('https://api.tvmaze.com/schedule/full');
      const jsonData: AllData[] = await rawData.json();
      console.log(jsonData[1]);
      allShowsData = jsonData;
      setData(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  const fetchQuery = async () => {
    const rawData = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchText.split(' ').join('')}`,
    );
    const jsonData: SearchedData[] = await rawData.json();
    console.log('>>>>> searched querry response:', jsonData);
    setSearchData(jsonData);
  };
  function debounce(
    func: {apply: (arg0: any, arg1: any[]) => void},
    timeout: number = 300,
  ) {
    let timer: any;
    return (...args: any[]) => {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, timeout);
    };
  }
  const deboucnedFetch = debounce(fetchQuery, 500);
  useEffect(() => {
    console.log(searchText);
    deboucnedFetch();
  }, [searchText]);
  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        placeholder="Search here"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
        }}
        searchIcon={() => (
          <Image
            source={require('../assets/search.png')}
            style={{height: 20, width: 20}}
          />
        )}
      />
      {searchData.length === 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item?._embedded?.show?.id + index}
          renderItem={({item}: {item: AllData}) => {
            const data = item?._embedded?.show;
            return <ShowCard data={data} navigation={navigation} />;
          }}
          initialNumToRender={10}
          numColumns={2}
          removeClippedSubviews
          maxToRenderPerBatch={5}
        />
      ) : (
        <FlatList
          data={searchData}
          keyExtractor={(item, index) => item?.show?.id + index}
          renderItem={({item}: {item: SearchedData}) => {
            const data = item?.show;
            return <ShowCard data={data} navigation={navigation} />;
          }}
          initialNumToRender={10}
          numColumns={2}
          removeClippedSubviews
          maxToRenderPerBatch={5}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background_primary,
  },
});
function setSearchText(text: string) {
  throw new Error('Function not implemented.');
}

