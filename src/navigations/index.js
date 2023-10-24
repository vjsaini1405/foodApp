import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './stackNavigator';

 const MainNavigation = () =>{
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
 }

 export default MainNavigation; 