import React, { useEffect, useState } from 'react';
import {StyleSheet, Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/AntDesign';
import {vs,ms,s} from 'react-native-size-matters';
import ItemsScreen from '@screens/admin/items';
import AddItems from '@screens/admin/addItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderScreen from '../../screens/admin/orders';

const Bottom = createMaterialBottomTabNavigator();

const TabBarIcon = ({focused, iconName, url}) => {
  return (
    // <Icons name={iconName} size={vs(20)} color={focused ? 'red' : 'whiite'} />
    <Image
      source={url}
      style={{height: vs(20), width: s(20)}}
      tintColor={focused ? 'orange' : 'white'}
    />
  );
};

const BottomTab = () => {
  return (
    <Bottom.Navigator 
    initialRouteName='AddItems'
    barStyle={{
      backgroundColor: 'orange',
      height: vs(50),
      alignItems: 'center',
      elevation: 5,
      borderRadius:ms(10),
      borderTopLeftRadius:ms(20)
    }}
    screenOptions={()=>({
      // tabBarActiveTintColor: '#58ceb2',
      // tabBarInactiveTintColor: 'gray',
      //Tab bar styles can be added here
      // tabBarStyle:{
      //   paddingVertical: 5,
      //   borderTopLeftRadius:15,
      //   borderTopRightRadius:15,
      //   backgroundColor:'red',
      //   // position:'absolute',
      //   height:50
      // },
      // tabBarLabelStyle:{paddingBottom:3},
    })}>
      <Bottom.Screen
        name="ItemsScreen"
        component={ItemsScreen}
        options={{
          title:'sv s v s ajv',
          headerShown:false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('../../assets/images/items.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="AddItems"
        component={AddItems}
        options={{
          title: "Lists",
          headerShown: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('../../assets/images/add.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: "Lists",
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('../../assets/images/orders.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomTab;
