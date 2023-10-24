import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../text';
import {ms, s, vs} from 'react-native-size-matters';
import {IconButton} from '../button';

const Header = ({
  headerContainerStyle,
  title,
  icon,
  handleIconOnPress,
  iconColor,
  iconName,
  iconSize,
  count,
  activeOpacity
}) => {
  return (
    <View style={[styles.container, headerContainerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
      {icon && (
        <>
          <IconButton
          activeOpacity={activeOpacity}
            handleOnPress={handleIconOnPress}
            iconName={iconName}
            iconColor={iconColor ? iconColor : 'orange'}
            iconSize={iconSize}
            iconBtnStyle={styles.iconBtnStyle}
          />
          {count > 0 && 
            <View style={styles.countContainer}>
            {count < 10 ? (
              <Text style={styles.countText}>{count}</Text>
            ) : (
              <Text
                style={styles.countText}>
                {'9+'}
              </Text>
            )}
          </View>}
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: vs(50),
    elevation: 5,
    // justifyContent:'center',
    width:'100%',
    alignItems: 'center',
    paddingHorizontal: s(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: ms(20),
    fontWeight: '700',
    color: 'orange',
  },
  iconBtnStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    position: 'absolute',
    right: s(10),
  },
  countContainer: {
    height: vs(20),
    width: s(20),
    backgroundColor: 'orange',
    borderRadius: ms(20),
    position: 'absolute',
    right: s(10),
    top: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: ms(10),
    color: 'white',
    fontWeight: '700',
  },
});
