import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import {Text} from '../text';
import {ms, s, vs} from 'react-native-size-matters';

const Loader = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        {/* <View style={styles.modalView}> */}
        <ActivityIndicator size={'large'} color={'orange'} />
        {/* </View> */}
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: vs(22),
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: vs(20),
    backgroundColor: 'white',
    borderRadius: ms(20),
    padding: s(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
