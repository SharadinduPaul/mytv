import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../assets/Colors';
import {ShowDetails} from '../Types/ShowDetails';
import LinearGradient from 'react-native-linear-gradient';

interface DetailsScreenProps {
  navigation: any;
  route: any;
}
const TextWithBackground = ({text}: {text: string}) => {
  return (
    <View style={styles.textWithBackground}>
      <Text style={{fontWeight: '800'}}>{text}</Text>
    </View>
  );
};
const Genres = ({text}: {text: string}) => {
  return (
    <View style={styles.genres}>
      <Text style={styles.genresText}>{text}</Text>
    </View>
  );
};
const handleVisit = (url: string) => {
  Linking.openURL(url);
};
export const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  let id: string = route?.params?.id;
  const data: ShowDetails = route?.params?.data?._embedded?.show;

  useEffect(() => {
    console.log('#### Data in details screen', data);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.backGround}>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={['#0000', colors.background_primary]}
            style={styles.linearGradient}
          />
          <Image source={{uri: data?.image?.original}} style={styles.image} />
          <Text style={styles.heading}>{data?.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.geresContainer}>
            {data?.genres?.map((item, index) => (
              <Genres text={item} key={index} />
            ))}
          </View>
          <Text style={styles.text}>
            Released: {data?.premiered} - {data?.status}
          </Text>
          <Text style={styles.text}>Language: {data?.language}</Text>
          <Text style={styles.text}>
            {data?.schedule?.days?.map((item, index) => (
              <TextWithBackground text={item} key={index} />
            ))}
          </Text>
          <Text style={styles.summary}>{data?.summary}</Text>
          <TouchableHighlight
            onPress={() => handleVisit(data?.url)}
            style={{marginTop: 10}}>
            <Text style={{...styles.text, color: '#57a0ff'}}>
              Visit Website
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backGround: {
    backgroundColor: colors.background_primary,
    height: '100%',
  },
  imageContainer: {
    height: 400,
    width: '100%',
    position: 'relative',
  },
  linearGradient: {
    height: '40%',
    width: '100%',
    position: 'absolute',
    top: 240,
    zIndex: 10,
  },
  heading: {
    color: colors.text_primary,
    fontSize: 25,
    position: 'absolute',
    bottom: 10,
    zIndex: 11,
    padding: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    width: '100%',
    padding: 10,
  },
  text: {
    color: colors.text_primary,
    fontSize: 15,
    marginTop: 6,
  },
  textWithBackground: {
    backgroundColor: colors.text_primary,
    color: colors.background_primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: colors.background_primary,
    borderWidth: 2,
  },
  geresContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  genres: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.text_secondary,
    borderRadius: 30,
    marginRight: 6,
  },
  genresText: {
    color: colors.text_primary,
    fontSize: 14,
    fontWeight: '600',
  },
  summary: {
    fontSize: 14,
    color: colors.text_secondary,
    marginTop: 20,
  },
});
