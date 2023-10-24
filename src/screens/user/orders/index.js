import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Text} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Header} from '../../../components';
import {ms, s, vs} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';
import styles from './styles';

const Orders = () => {
  const {isFocused} = useIsFocused();
  const [state, setState] = useState({
    orderList: [],
  });

  useEffect(() => {
    getOrders();
  }, [isFocused]);

  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setState(prev => ({...prev, orderList: user._data.orders}));
  };

  const orderItemRender = ({item}) => {
    return (
      <View style={styles.itemOrderView}>
        <Image source={{uri: item.data.imageUrl}} style={styles.itemImage} />
        <View>
          <Text style={styles.nameText}>{item.data.name}</Text>
          <Text style={styles.nameText}>
            {'Price: ' + item.data.discount + ' Qty: ' + item.data.qty}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    console.log('item----->>>', item.items);
    return (
      <View style={styles.orderItemContainer}>
        <FlatList
          data={item.items}
          renderItem={orderItemRender}
          keyExtractor={({item, index}) => index}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'My Orders'} />
      <FlatList
        data={state.orderList}
        keyExtractor={({item, index}) => index}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: s(10)}}
      />
    </View>
  );
};

export default Orders;
