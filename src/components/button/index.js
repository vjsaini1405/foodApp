import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Button = ({disabled, title, onPress, buttonStyle, btnTextStyle}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, buttonStyle]}>
      <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const IconButton = ({
  handleOnPress,
  iconSize,
  iconBtnStyle,
  iconName,
  iconColor,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={handleOnPress}
      style={[styles.iconBtn, iconBtnStyle]}>
      <Icon
        name={iconName}
        size={iconSize ? iconSize : vs(30)}
        color={iconColor ? iconColor : 'grey'}
      />
    </TouchableOpacity>
  );
};

export {Button, IconButton};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: ms(20),
    height: vs(50),
    width: s(320),
  },
  btnText: {
    color: 'orange',
    fontSize: ms(16),
    fontWeight: '700',
  },
  iconBtn: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: ms(12),
  },
});
