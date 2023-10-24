import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text} from '@components';
import firestore from '@react-native-firebase/firestore';
import {vs, s, ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ItemsScreen = ({navigation}) => {
  const [state, setState] = useState({
    itemData: [],
    loading: true,
  });
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        // console.log('Items users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'Items ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setState(prev => ({...prev, itemData: tempData, loading: false}));
      });
  };

  const renderItem = ({item, index}) => {
    const handleEdit = () => {
      navigation.navigate('EditItem', {
        data: item.data,
        id: item.id,
      });
    };

    const handleDelete = docId => {
      firestore()
        .collection('items')
        .doc(docId)
        .delete()
        .then(() => {
          // console.log('Item deleted!');
          getItems();
        });
    };

    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.data.imageUrl}}
          style={styles.itemImageStyle}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.data.name}</Text>
          <Text style={styles.discText}>{item.data.discription}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.disPriceText}>{'$' + item.data.discount}</Text>
            <Text style={styles.pricetext}>{'$' + item.data.price}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.iconBtn}>
            <Icon name={'edit'} size={s(30)} color={'grey'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.iconBtn}>
            <Icon name={'delete'} size={s(30)} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const EmptyComponent =()=>{
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{"No Data Available"}</Text>
      </View>
    );
  }

  // console.log("dfghjkl;lknjbjb jbdj",state.itemData)
  
  return (
    <View style={styles.mainContainer}>
      {state.loading ? (
        <ActivityIndicator size="large" color={'orange'} />
      ) : (
        <FlatList
         data={state.itemData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyComponent}
          />
      )}
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: vs(20),
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    width: '100%',
    height: vs(110),
    paddingVertical: vs(5),
    marginVertical: vs(10),
    borderRadius: ms(10),
    elevation: 5,
    paddingHorizontal: s(10),
  },
  itemImageStyle: {
    width: s(100),
    height: vs(100),
    borderRadius: ms(10),
  },
  nameContainer: {
    margin: s(10),
    width: '50%',
    // backgroundColor:'red'
  },
  priceContainer: {
    flexDirection: 'row',
    gap: s(5),
    alignItems: 'center',
  },
  nameText: {
    fontSize: ms(18),
    fontWeight: '700',
    color: 'white',
  },
  discText: {
    fontSize: ms(14),
    fontWeight: '600',
    color: 'white',
    // width:,
    height:vs(35)
  },
  disPriceText: {
    fontSize: ms(18),
    fontWeight: '700',
    color: 'green',
  },
  pricetext: {
    fontSize: ms(17),
    fontWeight: '600',
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  iconContainer: {
    gap: s(10),
    justifyContent: 'center',
  },
  iconBtn: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: ms(12),
  },
});
