import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

function PrimaryField({props}) {
  const {
    placeholder,
    keyboardType,
    onChangeText,
    onChange,
    value,
    secureText,
    onSubmitEditing,
    style,
    placeHolderColor,
    returnKeyType,
    warningText,
    rightIcon,
    InputStyle,
    maxLength,
    contextMenuHidden,
    onPressEyeButton,
    multiline,
    numberOfLines
  } = props;
  return (
    <View>
      <View style={[styles.primaryInputContainer, style]}>
        <TextInput
          {...props}
          maxLength={maxLength}
          placeholder={placeholder || ''}
          placeholderTextColor={placeHolderColor || 'lightgrey'}
          keyboardType={keyboardType || 'default'}
          value={value || ''}
          onChange={onChange}
          onChangeText={onChangeText}
          secureTextEntry={secureText ? true : false}
          style={[
            InputStyle,
            styles.InputStyle,
            {width: rightIcon ? '80%' : '100%'},
          ]}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
          onSubmitEditing={onSubmitEditing}
          spellCheck={false}
          autoCorrect={false}
          multiline={multiline && true}
          contextMenuHidden={contextMenuHidden}
          numberOfLines={numberOfLines}
        />
        {rightIcon ? (
          <TouchableOpacity onPress={onPressEyeButton}>
            {' '}
            <Icon
              name={secureText ? 'eye-off' : 'eye'}
              size={ms(25)}
              color="#fff"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {warningText ? warningText : null}
    </View>
  );
}

const DefaultField = ({props}) => {
  const {
    placeholder,
    keyboardType,
    onChangeText,
    onChange,
    value,
    secureText,
    onSubmitEditing,
    style,
    placeHolderColor,
    returnKeyType,
    warningText,
    rightIcon,
    InputStyle,
    maxLength,
    contextMenuHidden,
    onPressEyeButton,
  } = props;
  return (
    <View>
      <View style={[styles.defaultInputContainer, style]}>
        <TextInput
          {...props}
          maxLength={maxLength}
          placeholder={placeholder || ''}
          placeholderTextColor={placeHolderColor || 'lightgrey'}
          keyboardType={keyboardType || 'default'}
          value={value || ''}
          onChange={onChange}
          onChangeText={onChangeText}
          secureTextEntry={secureText ? true : false}
          style={[ styles.InputStyle,InputStyle]}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
          onSubmitEditing={onSubmitEditing}
          spellCheck={false}
          autoCorrect={false}
          contextMenuHidden={contextMenuHidden}
        />
        {rightIcon ? (
          <TouchableOpacity onPress={onPressEyeButton}>
            <Icon
              name={secureText ? 'eye-off' : 'eye'}
              size={ms(25)}
              color="#fff"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {warningText ? warningText : null}
    </View>
  );
};

const InputField = props => {
  switch (props.variant) {
    case 'primary':
      return <PrimaryField props={props} />;
    default:
      return <DefaultField props={props} />;
  }
};

const styles = StyleSheet.create({
  primaryInputContainer: {
    flexDirection: 'row',
    height: vs(65),
    width: s(284),
    borderWidth: ms(2),
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: ms(50),
    paddingLeft: vs(20),
    paddingRight: vs(15),
  },
  defaultInputContainer: {
    flexDirection: 'row',
    height: vs(50),
    width: s(284),
    borderWidth: ms(1),
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: ms(50),
    paddingLeft: vs(20),
    paddingRight: vs(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InputStyle: {
    flexGrow: 1,
    fontSize: ms(18),
    color:'white',
    paddingVertical: vs(1),
  },
});

export default InputField;
