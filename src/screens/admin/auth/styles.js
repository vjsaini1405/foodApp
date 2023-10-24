import { StyleSheet} from 'react-native';
import { vs, s, ms} from 'react-native-size-matters'

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: s(20),
      paddingTop: vs(50),
      alignItems: 'center',
      backgroundColor: 'orange',
    },
    container: {
      marginVertical: vs(50),
    },
    buttonStyle: {
      marginTop: vs(30),
    },
    userNavigationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: vs(8),
    },
    clickTextbtn: {
      textDecorationLine: 'underline',
      textDecorationColor: 'white',
      color: 'white',
    },
  });

  export default styles;