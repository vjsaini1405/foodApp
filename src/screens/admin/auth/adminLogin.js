import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import {InputField, Text, Button} from '@components';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader';
import styles from './styles';

const AdminLogin = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    secureText: true,
    modalVisible: false,
  });

  // useEffect(() => {
  //   firestore()
  // .collection('admin')
  // .add({
  //   email: 'admin@gmail.com',
  //   password:'Admin@123',
  //   role:'admin'
  // })
  // .then(() => {
  //   console.log('Admin added!');
  // });// first Time Add data on FireStore
  //   // getUserData()
  // }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const admin = await firestore().collection('admin').get();
    // console.log('admin******', admin._docs[0]._data);
  };

  const handleLogin = async () => {
    setState(prev => ({...prev, modalVisible: true}));
    const admin = await firestore().collection('admin').get();
    // console.log('admin******', admin._docs);
    if (
      state.email == admin?._docs[0]?._data?.email &&
      state.password == admin?._docs[0]?._data.password
    ) {
      setState(prev => ({...prev, modalVisible: false}));
      navigation.navigate('BottomTab');
      Alert.alert('Login SucessFully');
      await AsyncStorage.setItem('JOBROLE', admin?._docs[0]?._data?.role);
    } else if (state.email == '' || state.password == '') {
      Alert.alert('please enter email and password');
      setState(prev => ({...prev, modalVisible: false}));
    } else {
      setState(prev => ({...prev, modalVisible: false}));
      Alert.alert('User Does Not Exits');
    }
  };

  const handleUserNavigation = () => {
    navigation.navigate('UserLogin');
  };

  return (
    <View style={styles.mainContainer}>
      <Text variant={'large'} style={{color: 'white', fontWeight: '700'}}>
        {'Admin Login'}
      </Text>
      <View style={styles.container}>
        <InputField
          style={{marginVertical: vs(10)}}
          placeholder={'Enter the Email'}
          placeHolderColor={'white'}
          value={state.email}
          onChangeText={text =>
            setState(prev => ({...prev, email: text.toLowerCase()}))
          }
        />
        <InputField
          style={{marginVertical: vs(10)}}
          placeholder={'Enter the Password'}
          placeHolderColor={'white'}
          value={state.password}
          onChangeText={text => setState(prev => ({...prev, password: text}))}
          rightIcon
          secureText={state.secureText}
          onPressEyeButton={() =>
            setState(prev => ({...prev, secureText: !state.secureText}))
          }
        />
        <Button
          title={'Login'}
          onPress={handleLogin}
          buttonStyle={styles.buttonStyle}
        />
        <View style={styles.userNavigationContainer}>
          <Text style={{color: 'white'}}>{'user login? '}</Text>
          <TouchableOpacity onPress={handleUserNavigation}>
            <Text style={styles.clickTextbtn}>{' Click Here'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader
        modalVisible={state.modalVisible}
        // setModalVisible={()=>{
        //   setState((prev)=>({...prev , modalVisible: false}))
        // }}
      />
    </View>
  );
};

export default AdminLogin;
