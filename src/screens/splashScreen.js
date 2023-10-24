import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../components';
import {ms} from 'react-native-size-matters';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SelectLogin');
    }, [2000]);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{'FOOD APP'}</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  textStyle: {
    fontSize: ms(28),
    color: 'white',
    fontWeight: '900',
  },
});
