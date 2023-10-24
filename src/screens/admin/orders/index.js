import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {Text} from '@components';
import firestore from '@react-native-firebase/firestore';
import {ms, s, vs} from 'react-native-size-matters';
import {Header} from '../../../components';

const OrderScreen = () => {
  const [state, setState] = useState({
    orderList: [],
  });

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    firestore()
      .collection('orders')
      .get()
      .then(querySnapshot => {
        console.log('Total orders: ', querySnapshot.size);
        let tempOrderList = [];

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempOrderList.push({
            orderId: documentSnapshot.id,
            data: documentSnapshot.data().data,
          });
        });
        setState(prev => ({...prev, orderList: tempOrderList}));
      });
  };

  const orderItemRender = ({item}) => {
    console.log('snjbdvjjajsvjjsadbvbjsdbv', item);
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
    console.log('item----->>>', item);
    return (
      <View style={styles.orderItemContainer}>
        <FlatList
          data={item.data.items}
          renderItem={orderItemRender}
          keyExtractor={({item, index}) => index}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'All Orders'} />
      <FlatList
        data={state.orderList}
        keyExtractor={({item, index}) => index}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: s(10)}}
      />
    </View>
  );
};

export default OrderScreen;
