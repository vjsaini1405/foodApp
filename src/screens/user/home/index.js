import React, {useEffect, useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import {Header, IconButton, Text, Button} from '@components';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native-paper';
import {s, vs, ms} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import styles from './styles';

const Home = ({route, navigation}) => {
  const {isFocused} = useIsFocused();
  const [state, setState] = useState({
    userId: '',
    isLoading: false,
    itemList: [],
    itemCount: '',
  });

  useEffect(() => {
    // Stop listening for updates when no longer required
    getData();
  }, [isFocused]);

  useEffect(() => {
    getCartData();
  }, [isFocused]);

  const getData = async () => {
    setState(prev => ({...prev, isLoading: true}));
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
          getCartData();
        });
        setState(prev => ({
          ...prev,
          isLoading: false,
          itemList: tempData,
        }));
      })
      .catch(err => {
        setState(prev => ({...prev, isLoading: false}));
        console.log('errro', err);
      });
  };

  const getCartData = async () => {
    const Id = await AsyncStorage.getItem('USERID');
    const cartData = await firestore().collection('users').doc(Id).get();
    setState(prev => ({
      ...prev,
      itemCount: cartData?._data?.cart?.length,
      userId: Id,
    }));
  };

  const handleAddToCart = async (item, index) => {
    const userData = await firestore()
      .collection('users')
      .doc(state.userId)
      .get();
    let tempCart = [];
    tempCart = userData._data.cart;
    if (tempCart.length > 0) {
      let existing = false;
      tempCart.map((itm, ind) => {
        if (itm.id == item.id) {
          existing = true;
          itm.data.qty = itm.data.qty + 1;
        }
      });
      if (existing == false) {
        tempCart.push(item);
      }
      firestore().collection('users').doc(state.userId).update({
        cart: tempCart,
      });
    } else {
      tempCart.push(item);
    }
    firestore()
      .collection('users')
      .doc(state.userId)
      .update({
        cart: tempCart,
      })
      .then(() => {
        alert('add to cart');
        // navigation.navigate('Cart', {
        //   userId: state.userId,
        // });
      })
      .catch(errr => {
        console.log(errr);
      });
    getCartData();
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
          <Text numberOfLines={1} style={styles.discText}>
            {item.data.discription}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.disPriceText}>{'$' + item.data.discount}</Text>
            <Text style={styles.pricetext}>{'$' + item.data.price}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <Button
            title={'Add To Card'}
            btnTextStyle={{fontSize: ms(12), fontWeight: '900'}}
            buttonStyle={styles.addToCardButtonStyle}
            onPress={() => handleAddToCart(item, index)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'FoodApp'}
        icon={true}
        iconName={'shopping-cart'}
        iconColor={'orange'}
        iconSize={s(35)}
        count={state.itemCount}
        activeOpacity={1}
        handleIconOnPress={() => {
          navigation.navigate('Cart', {
            userId: state.userId,
          });
        }}
      />
      {state.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'orange'}
          style={{marginTop: vs(20)}}
        />
      ) : (
        <FlatList
          data={state.itemList}
          renderItem={renderItem}
          style={{paddingVertical: vs(10), paddingHorizontal: s(20)}}
        />
      )}
    </View>
  );
};

export default Home;
