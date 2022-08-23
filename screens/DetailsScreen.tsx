import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ShowDetails} from '../Types/ShowDetails';

interface DetailsScreenProps {
  navigation: any;
  route: any;
}

export const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  const {id} = route.params;
  const [data, setData] = useState<ShowDetails>();

  const getShowDetails = async (showId?: string) => {
    const rawData = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    const jsonData: ShowDetails = await rawData.json();
    setData(jsonData);
    console.log('### Show Details data : ', jsonData);
  };
  useEffect(() => {
    console.log('yes console log is working');
    setTimeout(() => {
      console.log('fetching show details');
      getShowDetails(id);
    }, 1000);
  }, []);
  return (
    <View>
      <Text>name: {data?.name}</Text>
      <Text>
        Released: {data?.premiered} Status: {data?.status}
      </Text>
    </View>
  );
};
