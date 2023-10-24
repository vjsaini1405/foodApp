import {StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    itemContainer: {
      backgroundColor: 'orange',
      flexDirection: 'row',
      width: '100%',
      height: vs(110),
      paddingVertical: vs(5),
      marginVertical: vs(10),
      borderRadius: ms(10),
      elevation: 5,
      paddingHorizontal: s(5),
    },
    itemImageStyle: {
      width: s(90),
      height: vs(100),
      borderRadius: ms(10),
    },
    nameContainer: {
      margin: s(10),
      // width: '38%',
      flex: 1,
    },
    priceContainer: {
      flexDirection: 'row',
      gap: s(5),
      alignItems: 'center',
    },
    nameText: {
      fontSize: ms(14),
      fontWeight: '700',
      color: 'white',
    },
    discText: {
      fontSize: ms(12),
      fontWeight: '600',
      color: 'white',
      marginVertical: vs(5),
    },
    disPriceText: {
      fontSize: ms(16),
      fontWeight: '700',
      color: 'green',
    },
    pricetext: {
      fontSize: ms(16),
      fontWeight: '600',
      color: 'white',
      textDecorationLine: 'line-through',
    },
    iconContainer: {
      gap: s(10),
      justifyContent: 'center',
    },
    addToCardButtonStyle: {
      width: '100%',
      height: vs(40),
      paddingHorizontal: s(10),
      borderRadius: ms(8),
      alignSelf: 'flex-end',
      right: 0,
    },
  });

  export default  styles;