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
    width: '100%',
    fontSize: 16,
    height: 45,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  customInputField: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '95%',
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
    fontSize: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextLight: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDarkSignup: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    width: '48%',
  },
  buttonLightSignup: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    width: '48%',
  },
  containerSignup: {
    elevation: 2,
    height: 125,
    width: 125,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
    flex: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  uploadBtnContainerSignup: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '30%',
  },
  uploadBtnSignup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
