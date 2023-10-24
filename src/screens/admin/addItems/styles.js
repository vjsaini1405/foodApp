import {StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
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
    fontWeight: '700',
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
