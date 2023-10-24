import {StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
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
  addRemoveContainer: {
    gap: s(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    right: -10,
  },
  addRemoveText: {
    fontSize: ms(16),
    fontWeight: '900',
  },
  itemQty: {
    fontSize: ms(12),
    color: 'white',
    fontWeight: '700',
  },
  addToCardButtonStyle: {
    backgroundColor: 'white',
    width: '20%',
    height: vs(30),
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(8),
  },
  checkoutContainer: {
    width: '100%',
    height: vs(60),
    backgroundColor: '#fff',
    bottom: 0,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: s(20),
  },
  checkoutBtn: {
    backgroundColor: 'orange',
    width: '40%',
    height: vs(40),
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(8),
  },
  checkoutBtnText: {
    fontSize: ms(14),
    color: 'orange',
    fontWeight: '600',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: vs(150),
    borderRadius: ms(10),
    elevation: 3,
  },
  emptyText: {
    fontSize: ms(20),
    fontWeight: '600',
  },
});

export default styles;
