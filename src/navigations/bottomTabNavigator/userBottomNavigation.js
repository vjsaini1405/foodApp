// import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/AntDesign';
import {vs, ms, s} from 'react-native-size-matters';
import Search from '@screens/user/search';
import Profile from '@screens/user/profile';
import WishList from '@screens/user/wishList';
import Orders from '@screens/user/orders';
import Home from '@screens/user/home';

const Bottom = createMaterialBottomTabNavigator();

const TabBarIcon = ({focused, iconName, url}) => {
  return (
    // <Icons name={iconName} size={vs(25)} color={focused ? 'orange' : 'lightgrey'} />
    <Image
      source={url}
      style={{height: vs(20), width: s(20)}}
      tintColor={focused ? 'orange' : 'white'}
    />
  );
};

const UserBottomTab = ({navigation, route}) => {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: 'orange',
        height: vs(50),
        alignItems: 'center',
        elevation: 5,
        borderRadius: ms(10),
        borderTopLeftRadius: ms(20),
      }}
      // screenOptions={()=>({
      //   // tabBarActiveTintColor: 'green',
      //   // tabBarInactiveTintColor: 'gray',
      //   //Tab bar styles can be added here
      //   // tabBarStyle:{
      //   //   paddingVertical: 5,
      //   //   borderTopLeftRadius:15,
      //   //   borderTopRightRadius:15,
      //   //   // backgroundColor:'red',
      //   //   // position:'absolute',
      //   //   height:50
      //   // },
      //   // tabBarLabelStyle:{paddingBottom:3},
      // })}
    >
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerShown: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="home"
              url={require('@assets/images/home.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="search1"
              url={require('@assets/images/search.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          headerShown: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('@assets/images/orders.png')}
              focused={focused}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('@assets/images/wishlist.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              // iconName="football"
              url={require('@assets/images/user.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default UserBottomTab;
