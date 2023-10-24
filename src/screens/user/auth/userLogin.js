import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import {InputField, Text, Button} from '@components';
import firestore from '@react-native-firebase/firestore';
import Loader from '@components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

const UserLogin = ({navigation}) => {

  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    email: '',
    password: '',
    secureText: true,
    modalVisible: false,
    userId:'',
    role:''
  });

  const handleLogin = async () => {
    setState(prev => ({...prev, modalVisible: true}));
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', state.email)
      .get()
      .then(querySnapshot => {
        /* ... */
        setState(prev => ({...prev, modalVisible: false, userId:querySnapshot.docs[0]._data.userId}));
        if (querySnapshot.docs[0]._data !== null) {
          if (querySnapshot.docs[0]._data.email !== state.email) {
            alert("User Does Not Exit's");
          } else if (querySnapshot.docs[0]._data.password !== state.password) {
            alert('Invalid Credentials');
          } else {
            alert('Login SuccessFull');
            setState(prev => ({...prev, modalVisible: false, role:querySnapshot.docs[0]._data.role}));
            goToNextScreen()
          }
        }
      })
      .catch(err => {
        alert("User Does Not Exit's");
        setState(prev => ({...prev, modalVisible: false}));
        // console.log('fgvhbjn', err);
      });
  };


  const  goToNextScreen = async()=>{
    await AsyncStorage.setItem('EMAIL',state.email)
    let userID= await AsyncStorage.getItem("USERID")
    // console.log("BerforeuserIDdfghjkl", userID)
    if(userID == null){
      await AsyncStorage.setItem("USERID", state.userId)
      let userID= await AsyncStorage.getItem("USERID")
      // console.log("After njavbjbjksabvbbabsjkv",userID)
    }
    navigation.navigate("UserBottomTab", {
      userId: state.userId
    })
    
  }

  const handleSignUpNavigation = () => {
    navigation.navigate('UserSignUp');
  };


  // console.log("userID from Home Screen",state.userId)
  return (
    <View style={styles.mainContainer}>
      <Text variant={'large'} style={{color: 'white', fontWeight: '700'}}>
        {'User Login'}
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
          title={"SingIn"}
          onPress={handleLogin}
          buttonStyle={styles.buttonStyle}
        />
        <View style={styles.userNavigationContainer}>
          <Text style={{color: 'white'}}>{'Create New Account?'}</Text>
          <TouchableOpacity onPress={handleSignUpNavigation}>
            <Text style={styles.clickTextbtn}>{' SignUp'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader modalVisible={state.modalVisible} />
    </View>
  );
};

export default UserLogin;

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
  },
});
