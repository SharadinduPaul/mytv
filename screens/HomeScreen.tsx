import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  VirtualizedList,
} from 'react-native';

interface DataType {
  id: string;
  name: string;
  _embedded: {
    show: {
      image: {
        medium: string;
        original: string;
      };
    };
  };
}
export const HomeScreen = () => {
  const [data, setData] = useState<DataType[]>([]);
  const getAllShows = async () => {
    const rawData = await fetch('https://api.tvmaze.com/schedule/full');
    const jsonData: DataType[] = await rawData.json();
    console.log(jsonData[1]._embedded.show.image.medium);
    setData(jsonData);
  };
  useEffect(() => {
    getAllShows();
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={item => item?.id}
        renderItem={({item}: {item: DataType}) => (
          <View>
            <Image
              source={{uri: item?._embedded?.show?.image?.original}}
              style={{width: 400, height: 400}}
            />
            <Text>{item?.name}</Text>
          </View>
        )} //Item component to be placed here
        initialNumToRender={10}
        bounces
      />
    </SafeAreaView>
  );
};
