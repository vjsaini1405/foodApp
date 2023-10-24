// import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from '@navigations/bottomTabNavigator';
import SplashScreen from '@screens/splashScreen';
import SelectLogin from '@screens/selectLogin';
import AdminLogin from '@screens/admin/auth/adminLogin';
import UserLogin from '@screens/user/auth/userLogin';
import UserSignUp from '@screens/user/auth/userSignUp';
import Home from '@screens/user/home';
import UserBottomTab from '@navigations/bottomTabNavigator/userBottomNavigation';
import EditItem from '@screens/admin/items/editItem';
import Cart from '@screens/user/cart';
import Setting from '@screens/user/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckOut from '@screens/user/checkout/checkout';
import AddAddress from '@screens/user/checkout/addAdress';
import Address from '@screens/user/checkout/Adress';
import OrderStatus from '@screens/user/checkout/OrderStatus';

const Stack = createStackNavigator();

const MyStack = () => {
  // const [state, setState] = useState({
  //   jobRole: ''
  // });

  // useEffect(() => {
  //   getToken();
  // }, [state.jobRole]);

  // console.log('role',typeof state.jobRole);

  // const getToken = async () => {
  //   let role = await AsyncStorage.getItem('JOBROLE');
  //   // console.log("roledfghjkl;",role)
  //   setState(prev => ({...prev, jobRole: role}));
  // };

  // var initialRouteName =
  // state.jobRole == null ? "SelectLogin":
  // state.jobRole == "admin"
  // ? 'UserBottomTab'
  // : 'BottomTab'

  return (
    <Stack.Navigator
      initialRouteName={"SelectLogin"}
      screenOptions={{
        headerTintColor: 'orange',
      headerBackTitleStyle:{
        // fontWeight:'00'
      }}}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectLogin"
        component={SelectLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserSignUp"
        component={UserSignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserBottomTab"
        component={UserBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        // options={{headerShown: false}}
      />
        <Stack.Screen
        name="CheckOut"
        component={CheckOut}
        // options={{headerShown: false}}
      />
       <Stack.Screen
        name="Address"
        component={Address}
        // options={{headerShown: false}}
      />
       <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        // options={{headerShown: false}}
      />
       <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
