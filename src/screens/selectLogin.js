import React ,{useEffect}from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from '../components';
import {vs, s, ms} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLogin = ({navigation}) => {
  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin');
  };
  const handleUserLogin = () => {
    navigation.navigate('UserLogin');
  };

// useEffect(()=>{
//   removeStore()
// },[])

// const removeStore =async()=>{
//   await AsyncStorage.removeItem('USERID')
// }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{'Select Login'}</Text>
      <Button
        title={'Admin Login'}
        onPress={handleAdminLogin}
        buttonStyle={styles.btnStyle}
        btnTextStyle={styles.btnTextStyle}
      />
      <Button
        title={'User Login'}
        onPress={handleUserLogin}
        buttonStyle={styles.btnStyle}
        btnTextStyle={styles.btnTextStyle}
      />
    </View>
  );
};

export default SelectLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'orange'
  },
  headingText:{
    fontSize:ms(20), 
    fontWeight:'900',
    color:'orange'
},
  btnStyle: {
    backgroundColor: 'orange',
    marginVertical: vs(10),
    elevation: 2,
  },
  btnTextStyle: {
    color: 'white',
  },
});
