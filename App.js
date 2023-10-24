/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigation from './src/navigations';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <Provider store={store}> */}
      <MainNavigation />
      {/* </Provider> */}
      {/* <Text>{"FOOD APP"}</Text> */}
    </GestureHandlerRootView>
    // <View style={{flex:1}}>
    //   <Text>{"FOOD APP"}</Text>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '700',
    color: 'orange',
  },
});
