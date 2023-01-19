import {StyleSheet, Dimensions} from 'react-native';
import { theme } from '../../assets/constants/Theme';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
    backgroundColor: theme.colors.BG,
  },
  mainText: {
    color: theme.colors.BTN,
    fontSize: theme.colors.fontSize,
  },
  inputField: {
    backgroundColor: 'white',
    borderRadius: 15,
    // width: '100%',
    height: 45,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  buttonDark: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  buttonLight: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  buttonTextDark: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextLight: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
