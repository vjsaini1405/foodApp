import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import {InputField, Text, Button} from '@components';
import firestore from '@react-native-firebase/firestore';
import Loader from '@components/loader';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSignUp = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    secureText: true,
    modalVisible: false,
  });

  const handleSaveUser = async () => {
    setState(prev => ({...prev, modalVisible: true}));
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        userId: userId,
        name: state.name,
        phone: state.phone,
        email: state.email,
        password: state.password,
        cart: [],
        address: [],
        role: 'user',
      })
      .then(() => {
        console.log('User added!');
        setState(prev => ({...prev, modalVisible: false}));
        navigation.goBack();
      })
      .catch(err => {
        console.log('User Sign Up Error!', err);
        setState(prev => ({...prev, modalVisible: false}));
      });
  };

  const handleSignUp = async () => {
    // await AsyncStorage.removeItem('USERID')
    if (
      state.email !== '' &&
      state.name !== '' &&
      state.password !== '' &&
      state.phone !== '' &&
      state.phone.length > 9
    ) {
      handleSaveUser();
    } else {
      alert('Please Enter Data');
    }
  };

  const handleSignInNavigation = () => {
    navigation.navigate('UserLogin');
  };

  return (
    <View style={styles.mainContainer}>
      <Text variant={'large'} style={{color: 'white', fontWeight: '700'}}>
        {'Sign Up'}
      </Text>
      <View style={styles.container}>
        <InputField
          style={{marginVertical: vs(10)}}
          placeholder={'Enter the Name'}
          placeHolderColor={'white'}
          value={state.name}
          onChangeText={text => setState(prev => ({...prev, name: text}))}
        />
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
          placeholder={'Enter the Mobile'}
          placeHolderColor={'white'}
          keyboardType={'number-pad'}
          value={state.phone}
          onChangeText={text => setState(prev => ({...prev, phone: text}))}
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
          title={'SignUp'}
          onPress={handleSignUp}
          buttonStyle={styles.buttonStyle}
        />
        <View style={styles.userNavigationContainer}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            {'Already have Account?'}
          </Text>
          <TouchableOpacity onPress={handleSignInNavigation}>
            <Text style={styles.clickTextbtn}>{' SignIn'}</Text>
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

export default UserSignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: vs(50),
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  container: {
    marginVertical: vs(50),
  },
  buttonStyle: {
    marginTop: vs(30),
  },
  userNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(8),
  },
  clickTextbtn: {
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    color: 'white',
    fontWeight: '700',
  },
});
