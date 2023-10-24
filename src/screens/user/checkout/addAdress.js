import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {InputField, Text, Button,Loader} from '@components';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {ms, vs} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = ({navigation, route}) => {
  const {userId} = route?.params;
  const [state, setState] = useState({
    street: '',
    city: '',
    pinCode: '',
    phone: '',
    modalVisible: false,
  });

  const handleSaveAdress = async () => {
    setState(prev => ({...prev, modalVisible: true}));
    const addressId = uuid.v4();
    await AsyncStorage.setItem("ADDRESSID", addressId)
    const userData = await firestore().collection('users').doc(userId).get();
    let tempAddress = [];
    tempAddress = userData._data.address;
    // console.log('TempAdress', tempAddress);
    tempAddress.push({
      street: state.street,
      city: state.city,
      pincode: state.pinCode,
      phone: state.phone,
      addressId: addressId,
      selected: false
    });
    // console.log('After temp', tempAddress);
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        address: tempAddress,
      })
      .then(() => {
        setState(prev => ({...prev, modalVisible: false}));
        navigation.goBack();
      })
      .catch(err => {
        setState(prev => ({...prev, modalVisible: false}));
        console.log('Save Address Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <InputField
        style={styles.inputContainer}
        InputStyle={{color: 'black'}}
        placeholder={'Enter the Street'}
        placeHolderColor={'#Bebebe'}
        value={state.street}
        onChangeText={text => setState(prev => ({...prev, street: text}))}
      />
      <InputField
        style={styles.inputContainer}
        InputStyle={{color: 'black'}}
        placeholder={'Enter the City'}
        placeHolderColor={'#Bebebe'}
        value={state.city}
        onChangeText={text => setState(prev => ({...prev, city: text}))}
      />
      <InputField
        style={styles.inputContainer}
        InputStyle={{color: 'black'}}
        placeholder={'Enter the PinCode'}
        placeHolderColor={'#Bebebe'}
        keyboardType={'number-pad'}
        value={state.pinCode}
        onChangeText={text => setState(prev => ({...prev, pinCode: text}))}
      />
      <InputField
        style={styles.inputContainer}
        InputStyle={{color: 'black'}}
        placeholder={'Enter the Mobile Number'}
        placeHolderColor={'#Bebebe'}
        keyboardType={'number-pad'}
        value={state.phone}
        maxLength={10}
        onChangeText={text => setState(prev => ({...prev, phone: text}))}
      />
      <Button
        title={'Save Adress'}
        btnTextStyle={styles.addNewAddressText}
        buttonStyle={styles.addNewAddressBtn}
        onPress={handleSaveAdress}
      />
      <Loader
        modalVisible={state.modalVisible}
        // setModalVisible={()=>{
        //   setState((prev)=>({...prev , modalVisible: false}))
        // }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: vs(20),
  },
  inputContainer: {
    marginVertical: vs(10),
    borderColor: 'grey',
    borderRadius: ms(8),
  },
  addNewAddressBtn: {
    backgroundColor: 'orange',
    // position: 'absolute',
    // bottom: vs(10),
    borderRadius: ms(10),
    alignSelf: 'center',
    marginTop: vs(50),
  },
  addNewAddressText: {
    color: 'white',
    fontWeight: '500',
  },
});
