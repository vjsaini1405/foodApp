import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from '@components';
import styles from  './styles'

const WishList = () =>{
    return(
        <View style={styles.container}>
            <Text>{"WishList Screen"}</Text>
        </View>
    );
}

export default WishList;