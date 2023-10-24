import React,{useEffect,useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {ms, s, vs} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import {Button} from '../../../components';
import firestore from '@react-native-firebase/firestore';
import { resources } from '../../../../i18n';

const OrderStatus = ({navigation, route}) => {
  const {
    status,
    paymentId,
    cardList,
    total,
    address,
    userId,
    userName,
    userEmail,
    userMobile,
  } = route?.params;

useEffect(()=>{
    if(status == "success"){
        placeOrder()
    }
},[])

  const placeOrder = async() => {

    const user = await firestore().collection('users').doc(userId).get()

    console.log("userData=====>>>>",user._data.orders)

    let tempOrders =[]
    tempOrders= user._data.orders
    tempOrders.push({
      items:cardList,
      address:address,
      orderBy:userName,
      userEmail:userEmail,
      userMobile:userMobile,
      userId:userId,
      orderTotal:total,
      paymentId:paymentId
    })
    console.log("tempOrders========>>>>>",tempOrders)
    firestore().collection('users').doc(userId).update({
      cart: [],
      orders:tempOrders
    })
    firestore().collection('orders').add({
      data:{
        items:cardList,
        address:address,
        orderBy:userName,
        userEmail:userEmail,
        userMobile:userMobile,
        userId:userId,
        orderTotal:total,
        paymentId:paymentId
      },
      orderBy:userId,
      paymentId:paymentId
    })
  };


  return (
    <View style={styles.container}>
      <Image
        source={
          status == 'success'
            ? require('../../../assets/images/success.gif')
            : require('../../../assets/images/failed.gif')
        }
        style={styles.iconStyle}
      />
      <Text style={styles.msg}>
        {status == 'success' ? 'Order Placed Successfully !!' : 'Order Failed'}
      </Text>
      <Button
        title={'Go To Home'}
        // btnTextStyle={null}
        buttonStyle={styles.backToHome}
        onPress={() => {
          navigation.navigate('UserBottomTab');
        }}
      />
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
  },
  msg: {
    fontSize: ms(20),
    fontWeight: '600',
    color: '#000',
    // marginTop: vs(-10),
  },
  backToHome: {
    width: '50%',
    height: vs(50),
    borderWidth: 0.5,
    marginTop: vs(30),
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
