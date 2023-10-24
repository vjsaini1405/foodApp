import {StyleSheet} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainerStyle: {
    justifyContent: 'flex-start',
    gap: s(5),
  },
  listStyle: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
  },
  listHeading: {
    fontSize: ms(20),
    fontWeight: '700',
    color: 'orange',
  },
  languageBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: ms(10),
    height: vs(50),
    marginVertical: vs(10),
    paddingHorizontal: vs(10),
    borderColor: 'orange',
    gap: s(5),
  },
  languageText: {
    color: 'orange',
    fontSize: ms(14),
    fontWeight: '600',
  },
});

export default styles;
