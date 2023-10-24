import React, {useState} from 'react';
import {StyleSheet, Image, PermissionsAndroid, Alert} from 'react-native';
import {Button, InputField, Text} from '@components';
import {ms, s, vs} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import storage, {getDownloadURL} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Loader from '../../../components/loader';
import styles from './styles';

const AddItems = () => {
  const [state, setState] = useState({
    name: '',
    price: '',
    discount: '',
    discription: '',
    image: null,
    imageUrl: '',
    qty: 1,
    modalVisible: false,
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Food App Camera Permission',
          message:
            'Food App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      setState(prev => ({...prev, image: result}));
    }
  };

  const uploadImage = async () => {
    const reference = storage().ref(state?.image?.assets[0]?.fileName);

    // path to existing file on filesystem
    const pathToFile = state?.image?.assets[0]?.uri;

    //   // uploads file
    await reference
      .putFile(pathToFile)
      .then(res => {
        console.log('putFile response', res);
      })
      .catch(err => {
        console.log('putFile response', err);
      });

    const url = await getDownloadURL(reference);
    handleUploadItem(url);
  };

  const handleUploadItem = url => {
    setState(prev => ({...prev, modalVisible: true}));
    firestore()
      .collection('items')
      .add({
        name: state.name,
        price: state.price,
        discount: state.discount,
        discription: state.discription,
        imageUrl: url,
        qty: state.qty,
      })
      .then(() => {
        Alert.alert('Items Uploaded Sucessfully');
        setState(prev => ({
          ...prev,
          name: '',
          price: '',
          discount: '',
          discription: '',
          image: null,
          imageUrl: '',
          modalVisible: false,
        }));
      })
      .catch(e => {
        console.log('uploading image error => ', e);
        setState(prev => ({...prev, modalVisible: false}));
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
      <Text style={styles.headingText}>{'ADD ITEMS'}</Text>
      {state.image != null ? (
        <Image
          source={{uri: state.image?.assets[0]?.uri}}
          style={styles.imageStyle}
        />
      ) : null}
      <InputField
        style={styles.inputContainerStyle}
        placeholder={'Enter item name'}
        InputStyle={styles.inputStyle}
        value={state.name}
        onChangeText={text => setState(prev => ({...prev, name: text}))}
      />
      <InputField
        style={styles.inputContainerStyle}
        placeholder={'Enter item price'}
        InputStyle={styles.inputStyle}
        value={state.price}
        onChangeText={text => setState(prev => ({...prev, price: text}))}
      />
      <InputField
        style={styles.inputContainerStyle}
        placeholder={'Enter item discount price'}
        InputStyle={styles.inputStyle}
        value={state.discount}
        onChangeText={text => setState(prev => ({...prev, discount: text}))}
      />
      <InputField
        style={styles.discriptionInput}
        placeholder={'Enter item discription'}
        InputStyle={styles.inputStyle}
        value={state.discription}
        multiline
        numberOfLines={5}
        onChangeText={text => setState(prev => ({...prev, discription: text}))}
      />
      <InputField
        style={styles.inputContainerStyle}
        placeholder={'Enter item image url'}
        InputStyle={styles.inputStyle}
        value={state.imageUrl}
        onChangeText={text => setState(prev => ({...prev, imageUrl: text}))}
      />
      <Text style={styles.speratorText}>{'OR'}</Text>
      <Button
        title={'Pick image from gallerry'}
        onPress={() => {
          requestCameraPermission();
        }}
        buttonStyle={styles.uploadBtn}
        btnTextStyle={{color: 'lightgrey'}}
      />
      <Button
        title={'Upload Item'}
        onPress={() => {
          uploadImage();
        }}
        buttonStyle={{backgroundColor: 'orange', marginBottom: vs(50)}}
        btnTextStyle={{color: 'white'}}
      />
      <Loader
        modalVisible={state.modalVisible}
        // setModalVisible={()=>{
        //   setState((prev)=>({...prev , modalVisible: false}))
        // }}
      />
    </KeyboardAwareScrollView>
  );
};

export default AddItems;

