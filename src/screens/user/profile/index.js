import React from 'react';
import {View} from 'react-native';
import { Text } from '@components';
import styles from  './styles'

const Profile = () =>{
    return(
        <View style={styles.container}>
            <Text>{"Profile Screen"}</Text>
        </View>
    );
}

export default Profile;