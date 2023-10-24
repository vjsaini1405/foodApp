import React, {useState} from 'react';
import {StyleSheet, Image, PermissionsAndroid, Alert} from 'react-native';
import {Button, InputField, Text} from '@components';
import {ms, s, vs} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import storage,{getDownloadURL} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditItem = ({route, navigation}) => {
    // console.log("route",route?.params.data);

    const  {data, id} = route?.params
    // console.log("data245678io",id);
  const [state, setState] = useState({
    name: data.name,
    price: data.price,
    discount: data.discount,
    discription: data.discription,
    image: {assets:[{uri:data.imageUrl}]},
    imageUrl: '',
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
    await reference.putFile(pathToFile).then((res)=>{
      console.log("putFile response", res)
    }).catch((err)=>{
      console.log("putFile response",err)
    });

    const url = await getDownloadURL(reference)
    handleUploadItem(url);
  };
  
  const handleUploadItem = url => {
    firestore()
      .collection('items')
      .doc(id)
      .update({
        name: state.name,
        price: state.price,
        discount: state.discount,
        discription: state.discription,
        imageUrl: url,
      })
      .then(() => {
        Alert.alert("Items Update Sucessfully")
        navigation.goBack();
      })
      .catch(e => console.log('updateting image error => ', e));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
      <Text style={styles.headingText}>{'EDIT ITEMS'}</Text>
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
        onChangeText={text => setState(prev => ({...prev, discription: text}))}
      />
      <InputField
        style={styles.inputContainerStyle}
        placeholder={'Enter item image url'}
        InputStyle={styles.inputStyle}
        value={state.imageUrl}
        onChangeText={text =>  setState(prev => ({...prev, imageUrl: text}))}
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
        title={'Update Item'}
        onPress={() => {
          uploadImage();
        }}
        buttonStyle={{backgroundColor: 'orange', marginBottom: vs(50)}}
        btnTextStyle={{color: 'white'}}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor:'white',
    paddingHorizontal: s(20),
  },
  headingText: {
    color: 'orange',
    alignSelf: 'center',
    fontSize: s(20),
    fontWeight: '700',
  },
  imageStyle: {
    alignSelf: 'center',
    width: '100%',
    height: vs(250),
    borderRadius: ms(12),
    marginVertical: vs(20),
  },
  inputContainerStyle: {
    marginTop: vs(20),
    borderColor: 'black',
    width: '100%',
  },
  inputStyle: {
    fontSize: ms(14),
    color: 'black',
  },
  discriptionInput: {
    marginTop: vs(20),
    borderColor: 'black',
    width: '100%',
    height: vs(150),
    borderRadius: ms(12),
    alignItems: 'flex-start',
    paddingHorizontal: s(5),
  },
  speratorText: {
    alignSelf: 'center',
    marginVertical: vs(20),
    fontWeight: '700'
  },
  uploadBtn: {
    backgroundColor: '',
    height: vs(150),
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(20),
  },
});
