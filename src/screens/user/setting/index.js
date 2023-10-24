import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Header, Text} from '@components';
import {ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const Setting = () => {
  const {t, i18n} = useTranslation();

  const [language, setLanguage] = useState([
    {name: t('language.english'), selected: true, lang: 'en'},
    {name: t('language.hindi'), selected: false, lang: 'hn'},
    {name: t('language.marathi'), selected: false, lang: 'mr'},
  ]);

  const getLanguage = async index => {
    // console.log('124567890', index);
    await AsyncStorage.setItem('LANG', index);
  };

  const handleLanguage = index => {
    let temp = language;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = false;
        } else {
          item.selected = true;
          // getLanguage(ind);
        }
      } else {
        item.selected = false;
      }
    });
    let temp2 = [];
    temp.map(item => {
      temp2.push(item);
    });
    setLanguage(temp2);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleLanguage(index)}
        style={[
          styles.languageBtnContainer,
          {
            backgroundColor: item.selected ? 'orange' : 'white',
            elevation: item.selected ? 2 : 0,
          },
        ]}>
        <Icon
          name={
            item.selected ? 'radio-button-checked' : 'radio-button-unchecked'
          }
          color={item.selected ? 'white' : 'orange'}
          size={vs(20)}
        />
        <Text
          style={[
            styles.languageText,
            {color: item.selected ? 'white' : 'orange'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Setting'}
        headerContainerStyle={styles.headerContainerStyle}
        icon
        iconSize={s(25)}
        iconName={'settings'}
      />
      <FlatList
        ListHeaderComponent={() => {
          return <Text style={styles.listHeading}>{'Select Language'}</Text>;
        }}
        data={language}
        renderItem={(item, index) => renderItem(item, index)}
        style={styles.listStyle}
      />
    </View>
  );
};

export default Setting;


