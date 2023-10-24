import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text} from '@components';
import {ms, s, vs} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Address = ({navigation, route}) => {
  const {isFocused} = useIsFocused();
  const {userId} = route?.params;

  const [state, setState] = useState({
    addressList: [],
    selectedAddress: '',
    addressId:''
  });

  useEffect(() => {
    getAddressData();
  }, [isFocused]);

  const getAddressData = async () => {
    const addressId = await AsyncStorage.getItem('ADDRESSID');
    setState((prev)=>({...prev,addressId:addressId}))
    // console.log('addressId', addressId);
    const userData = await firestore().collection('users').doc(userId).get();
    let tempAddress = [];
    tempAddress = userData._data.address;
    // console.log("tempAdrees",tempAddress)
    tempAddress.map((item, index) => {
      if (item.addressId == addressId) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setState(prev => ({...prev, addressList: tempAddress}));
  };

  const handleSetDefaultAddress = async (item, index) => {
    // console.log('item>>><<<<>>>', item);

    // await AsyncStorage.setItem("ADDRESSID", item.item.addressId)
    // await AsyncStorage.setItem('ADDRESS', item.item.addressId);
    let tempAddress = [];
    tempAddress = state.addressList;
    tempAddress.map((itm, index) => {
      if (itm.addressId == item.item.addressId) {
        itm.selected = true;
      } 
      else {
        itm.selected = false;
      }
    });

    let temp = [];
    tempAddress.map((itm, index) => {
      temp.push(itm);
    });
    // console.log('temp', temp); 
    
//     await firestore().collection('users').doc(userId).update({
//       address:temp
//     }).then((res)=>{
//       console.log("update")
//     }).catch((errr)=>{
// console.log("errr",errr)
//     })
    // setState(prev => ({...prev, addressList: temp}));
    // getAddressData()

  };

  // console.log("State.AddressList",state.addressList)
  const renderItem = (item, index) => {
    // console.log('itemskvjakbvj', item);
    return (
      <View
        style={[
          styles.addressContainer,
          {
            marginBottom:
              index == state.addressList.lenght - 1 ? vs(100) : vs(10),
          },
        ]}>
        <View style={{flex: 1}}>
          <Text>{'Street: ' + item.item.street}</Text>
          <Text>{'City: ' + item.item.city}</Text>
          <Text>{'pinCode: ' + item.item.pinCode}</Text>
          <Text>{'Mobile: ' + item.item.phone}</Text>
        </View>
        {item?.item?.selected == true ? (
          <Text style={{color:'green',alignSelf:'center'}}>{'Default'}</Text>
        ) : (
          <Button
            title={'Set Default'}
            btnTextStyle={styles.setDefaulBtnTxt}
            buttonStyle={styles.setDefaulBtn}
            onPress={() => handleSetDefaultAddress(item, index)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.addressList}
        renderItem={renderItem}
        style={{paddingVertical: vs(10), paddingHorizontal: s(20)}}
      />
      <Button
        title={'Add New Address'}
        btnTextStyle={styles.addNewAddressText}
        buttonStyle={styles.addNewAddressBtn}
        onPress={() => {
          navigation.navigate('AddAddress', {
            userId: userId,
          });
        }}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  addressContainer: {
    // height: vs(60),
    width: '100%',
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: s(10),
    gap: 10,
  },
  addNewAddressBtn: {
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: vs(10),
    borderRadius: ms(10),
    alignSelf: 'center',
  },
  addNewAddressText: {
    color: 'white',
    fontWeight: '500',
  },
  setDefaulBtn: {
    backgroundColor: 'green',
    height: vs(40),
    width: '40%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    elevation: 0,
    alignItems: 'center',
    borderRadius: ms(8),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  setDefaulBtnTxt: {
    fontWeight: '500',
    color: 'white',
    fontSize: ms(14),
  },
});
