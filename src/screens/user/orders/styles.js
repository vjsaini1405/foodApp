import {StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItemContainer: {
    width: '100%',
    // height:vs(100),
    borderRadius: ms(10),
    elevation: 3,
    alignSelf: 'center',
    backgroundColor: '',
    marginTop: vs(20),
    marginBottom: vs(10),
    padding: s(10),
    // backgroundColor:'red'
  },
  itemOrderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    marginTop: vs(10),
    // backgroundColor:'red',
    // height:vs(50)
  },
  itemImage: {
    width: s(100),
    height: vs(100),
    borderRadius: ms(10),
  },
  nameText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: 'black',
    marginVertical: vs(2),
  },
});

export default styles;
