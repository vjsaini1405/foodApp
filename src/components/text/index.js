import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import { Colors } from '../../themes';

const DefaultText = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={style}>
      {children}
    </Text>
  );
};

const ModalHeading = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.modalHeading, style]}>
      {children}
    </Text>
  );
};

const PageTitleBold = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.pageTitleBold, style]}>
      {children}
    </Text>
  );
};

const PageTitleMedium = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.pageTitleMedium, style]}>
      {children}
    </Text>
  );
};

const SmallText = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      adjustsFontSizeToFit
      numberOfLines={numberOfLines}
      style={[styles.smallText, style]}>
      {children}
    </Text>
  );
};

const VerySmallText = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.verySmallText, style]}>
      {children}
    </Text>
  );
};

const MediumText = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.mediumText, style]}>
      {children}
    </Text>
  );
};

const LargeText = props => {
  const {style, children, numberOfLines, onPress} = props.data;
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.largeText, style]}>
      {children}
    </Text>
  );
};

const NativeText = props => {
  switch (props?.variant) {
    case 'verySmall':
      return <VerySmallText data={props} />;
    case 'small':
      return <SmallText data={props} />;
    case 'large':
      return <LargeText data={props} />;
    case 'medium':
      return <MediumText data={props} />;
    case 'modalHeading':
      return <ModalHeading data={props} />;
    case 'pageTitleBold':
      return <PageTitleBold data={props} />;
    case 'pageTitleMedium':
      return <PageTitleMedium data={props} />;
    default:
      return <DefaultText data={props} />;
  }
};

const styles = StyleSheet.create({
  modalHeading: {
    fontSize: ms(25),
    color: Colors.hexGray,
    alignSelf: 'center',
  },
  largeText: {
    fontSize: ms(25),
    color: Colors.greyishBrown,
    alignSelf: 'center',
    // fontFamily: fonts.poppinsBold,
  },
  mediumText: {
    color: Colors.greyishBrown,
    fontSize: ms(20),
  },
  smallText: {
    color: Colors.greyishBrown,
    fontSize: ms(16),
    alignSelf: 'center',
  },
  pageTitleBold: {
    fontSize: ms(40),
    color: Colors.white,
    // fontFamily: fonts.poppinsBold,
  },
  pageTitleMedium: {
    fontSize: ms(25),
    color: Colors.white,
    // fontFamily: fonts.poppinsRegular,
  },
  verySmallText: {
    fontSize: ms(12),
  },
});

export default NativeText;
