import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';
import {Button, Text} from '@components';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {s, vs, ms} from 'react-native-size-matters';
import styles from './styles';

const Cart = ({route, navigation}) => {
  const {userId} = route?.params;
  const isfocused = useIsFocused();
  const [state, setState] = useState({
    cartList: [],
    isLoading: false,
  });

  useEffect(() => {
    getCartItem();
  }, [isfocused]);

  const getCartItem = async () => {
    setState(prev => ({...prev, isLoading: true}));
    // console.log('userID', userId);
    await firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(res => {
        // console.log('res', res._data.cart);
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

  const additem = async (item, index) => {
    const cartData = await firestore().collection('users').doc(userId).get();
    let tempCart = [];
    tempCart = cartData._data.cart;
    tempCart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });

    getCartItem();
  };

  const removeItem = async (item, index) => {
    // console.log('remove');
    const cartData = await firestore().collection('users').doc(userId).get();

    let tempCart = [];
    tempCart = cartData._data.cart;
    tempCart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty - 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });

    getCartItem();
  };

  const deleteitem = async index => {
    const cartData = await firestore().collection('users').doc(userId).get();
    let tempCart = [];
    tempCart = cartData._data.cart;

    tempCart.splice(index, 1);

    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });
    getCartItem();
  };

  const renderItem = ({item, index}) => {
    // console.log("item",item)
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.data.imageUrl}}
          style={styles.itemImageStyle}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.data.name}</Text>
          <Text numberOfLines={1} style={styles.discText}>
            {item.data.discription}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.disPriceText}>{'$' + item.data.discount}</Text>
            <Text style={styles.pricetext}>{'$' + item.data.price}</Text>
          </View>
        </View>

        <View style={styles.addRemoveContainer}>
          <Button
            title={'-'}
            btnTextStyle={styles.addRemoveText}
            buttonStyle={styles.addToCardButtonStyle}
            onPress={() =>
              item.data.qty > 1 ? removeItem(item, index) : deleteitem(index)
            }
          />
          <Text style={styles.itemQty}>{item?.data?.qty}</Text>
          <Button
            title={'+'}
            btnTextStyle={styles.addRemoveText}
            buttonStyle={styles.addToCardButtonStyle}
            onPress={() => {
              additem(item, index);
            }}
          />
        </View>
      </View>
    );
  };

  const getTotal = () => {
    let total = 0;
    state.cartList.map(item => {
      total = total + item.data.qty * item.data.discount;
    });
    // console.log('total Price', total);
    return total;
  };

  return (
    <View style={styles.container}>
      {/* {state.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'orange'}
          style={{marginTop: vs(20)}}
        />
      ) : (
        <> */}
      <FlatList
        data={state.cartList}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{'No Cart are available'}</Text>
            </View>
          );
        }}
        style={{paddingVertical: vs(10), paddingHorizontal: s(20)}}
      />
      {state.cartList.length > 0 && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutBtnText}>
            {'Items: ' + state.cartList.length + '\n Total: $' + getTotal()}
          </Text>
          <Button
            title={'Check out'}
            btnTextStyle={{color: 'white', fontWeight: '500'}}
            buttonStyle={styles.checkoutBtn}
            onPress={() => {
              navigation.navigate('CheckOut', {
                userId: userId,
              });
            }}
          />
        </View>
      )}
      {/* </>
      )} */}
    </View>
  );
};

export default Cart;
