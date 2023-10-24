import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {Button, Text} from '@components';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {s, vs, ms} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const CheckOut = ({navigation, route}) => {
  const {userId} = route?.params;

  // console.log("userID***********CheckOut",userId)

  const isfocused = useIsFocused();
  const [state, setState] = useState({
    cartList: [],
    isLoading: false,
    selectedAddress: 'No Selected Adress',
    addressList: [],
    userData: {},
  });

 

  useEffect(() => {
    getCartItem();
    getAddressData();
  }, [isfocused]);

  const getCartItem = async () => {
    setState(prev => ({...prev, isLoading: true}));
    // console.log('userID', userId);
    await firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(res => {
        console.log('res=========>>>>>>>', res._data.cart);
        setState(prev => ({
          ...prev,
          isLoading: false,
          cartList: res._data.cart,
        }));
      })
      .catch(() => {
        setState(prev => ({...prev, isLoading: false}));
      });
  };

  const getAddressData = async () => {
    const addressId = await AsyncStorage.getItem('ADDRESSID');
    // console.log('addressId', addressId);
    const userData = await firestore().collection('users').doc(userId).get();
    let tempAddress = [];
    setState(prev => ({...prev, userData: userData}));
    // console.log('userData************-------->>>>', userData);
    tempAddress = userData._data.address;
    tempAddress.map((item, index) => {
      // console.log('item====>>>>>>', item);
      if (item.addressId == addressId) {
        // console.log('item.street', item.addressId);
        setState(prev => ({
          ...prev,
          selectedAddress:
            item.street +
            ',' +
            item.city +
            ',' +
            item.pincode +
            ',\n' +
            item.phone,
        }));
      }
    });
  };

  const getTotal = () => {
    let total = 0;
    state.cartList.map(item => {
      total = total + item.data.qty * item.data.discount;
    });
    return total;
  };

  // console.log('getTotal', getTotal());

  const handlePayNow = total => {
    let cardData = state.cartList
    var options = {
      description: 'Credits towards consultation',
      image: require('../../../assets/images/FoodAppIcon.png'),
      currency: 'INR',
      key: 'rzp_test_LhlWK6RwVzBZjD',
      amount: total * 100,
      name: 'Food App',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: state.userData._data.email,
        contact: state.userData._data.phone,
        name: state.userData._data.name,
      },
      theme: {color: '#eb9834'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        // console.log("state.cardList paas thorght parmas===>>",state.cartList)
        navigation.navigate('OrderStatus', {
          status: 'success',
          paymentId: data.razorpay_payment_id,
          cardList:state.cartList,
          total:getTotal(),
          address:state.selectedAddress,
          userId:userId,
          userName: state.userData._data.name,
          userEmail: state.userData._data.email,
          userMobile: state.userData._data.phone,

        });
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        console.log("errorPAymentGAtway",error)
        navigation.navigate('OrderStatus', {
          status: 'failed',
        });
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.data.imageUrl}}
          style={styles.itemImageStyle}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.data.name}</Text>
          <Text numberOfLines={2} style={styles.discText}>
            {item.data.discription}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.disPriceText}>{'$' + item.data.discount}</Text>
            <Text style={styles.pricetext}>{'$' + item.data.price}</Text>
          </View>
        </View>
        <Text style={styles.qtyText}>{'Qty : ' + item.data.qty}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {state.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'orange'}
          style={{marginTop: vs(20)}}
        />
      ) : (
        <>
          <View>
            <FlatList
              data={state.cartList}
              renderItem={renderItem}
              style={{paddingVertical: vs(10), paddingHorizontal: s(20)}}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{'Total'}</Text>
            <Text style={styles.totalText}>{'$' + getTotal()}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{'Selected Address'}</Text>
            <Text
              style={styles.editAddress}
              onPress={() => {
                navigation.navigate('Address', {
                  userId: userId,
                });
              }}>
              {'Change Address'}
            </Text>
          </View>
          <Text style={styles.selectedAddress}>{state.selectedAddress}</Text>
          <Button
            disabled={state.selectedAddress == 'No Selected Adress'}
            title={`Pay Now $${getTotal()}`}
            btnTextStyle={styles.addNewAddressText}
            buttonStyle={[
              styles.addNewAddressBtn,
              {
                backgroundColor:
                  state.selectedAddress == 'No Selected Adress'
                    ? '#DADADA'
                    : 'green',
              },
            ]}
            onPress={() => {
              handlePayNow(getTotal());
            }}
          />
        </>
      )}
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: vs(110),
    paddingVertical: vs(5),
    marginVertical: vs(10),
    borderRadius: ms(10),
    elevation: 5,
    paddingHorizontal: s(5),
  },
  itemImageStyle: {
    width: s(90),
    height: vs(100),
    borderRadius: ms(10),
  },
  nameContainer: {
    margin: s(10),
    // width: '38%',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: s(5),
    alignItems: 'center',
  },
  nameText: {
    fontSize: ms(14),
    fontWeight: '700',
    color: 'white',
  },
  discText: {
    fontSize: ms(12),
    fontWeight: '600',
    color: 'white',
    marginVertical: vs(5),
    height: vs(30),
    width: '100%',
  },
  disPriceText: {
    fontSize: ms(16),
    fontWeight: '700',
    color: 'green',
  },
  pricetext: {
    fontSize: ms(16),
    fontWeight: '600',
    color: 'white',
    textDecorationLine: 'line-through',
  },
  qtyText: {
    flex: 0.5,
    color: 'white',
    fontSize: ms(14),
    fontWeight: '700',
  },
  totalContainer: {
    paddingHorizontal: s(20),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: vs(50),
    borderTopWidth: 0.5,
    marginTop: vs(20),
    alignItems: 'center',
    borderColor: '#Bebebe',
  },
  totalText: {
    // color:'orange',
    fontSize: ms(16),
    fontWeight: '600',
  },
  editAddress: {
    color: '#2F62D1',
    fontSize: ms(16),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  selectedAddress: {
    margin: 20,
    width: '100%',
    fontSize: ms(14),
    fontWeight: '500',
  },
  addNewAddressText: {
    color: 'white',
    fontWeight: '500',
  },
  addNewAddressBtn: {
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: vs(10),
    borderRadius: ms(10),
    alignSelf: 'center',
  },
});
