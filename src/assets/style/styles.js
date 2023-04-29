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
  buttonProfileDark: {
    marginTop: 10,
    backgroundColor: theme.colors.BG,
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
  buttonDarkProfileSignup: {
    marginTop: 10,
    backgroundColor: theme.colors.BG,
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
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    marginTop: 20
  },
  otpBox: {
    borderBottomWidth: 0.8,
    borderColor: 'white',
    height: 50,
    width: 40,
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-end',
  },
  otp: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
  },
  inputFieldOtp: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
  },

  //profile screen
  profileIconContainer: bold => {
    return {
      width: bold ? (width / 100) * 25 : (width / 100) * 18,
      height: bold ? (width / 100) * 25 : (width / 100) * 18,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      elevation: 15,
      shadowColor: '#0B2265',
    };
  },
  profileIconTag: bold => {
    return {
      color: '#1A1A1A',
      fontSize: bold ? 16 : 12,
      fontWeight: 'bold',
      marginTop: 5,
      width: bold ? (width / 100) * 30 : (width / 100) * 20,
      textAlign: 'center',
    };
  },
  profileMainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileMainContainerStyle: {
    paddingBottom: 100,
    paddingTop: 100,
  },
  profileWrapper: {
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  profile: {
    position: 'absolute',
    width: 133,
    height: 133,
    resizeMode: 'cover',
    borderRadius: 100,
    elevation: 10,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 160,
    height: 35,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#0B2265',
    bottom: 0,
    paddingHorizontal: 20,
  },
  profileTag: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profileName: {
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 28,
  },
  completedTag: {
    color: '#1A1A1A',
    fontSize: 12,
    textAlign: 'center',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    marginTop: 25,
  },
  texted: {
    fontSize: 17,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 14,
  },
});

export default styles;
