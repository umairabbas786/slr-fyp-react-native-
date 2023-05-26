import {StyleSheet, Dimensions} from 'react-native';
import { theme } from '../../assets/constants/Theme';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  //animation
  lottie: {
    flex: 1,
    margin: 120,
    marginRight: 0,
    marginLeft: 140
  },
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
  selectedField: {
    backgroundColor: theme.colors.BG,
  },
  selectedFieldText: {
    color: '#fff'
  },
  dropdownStyle: {
    borderRadius: 15,
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center'
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
    color: 'black',
  },
  //chat screen
  customHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingLeft: '5%',
    marginBottom: 10,
    paddingTop: 15
  },
  matchedWrapper: {
    paddingVertical: 15,
    backgroundColor: '#ECECEC',
  },
  matchedContainerStyle: {
    paddingHorizontal: '5%',
  },
  conversationSeparator: {
    backgroundColor: '#D2D2D2',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  bottomHiddenWrapper: {
    backgroundColor: 'white',
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 110,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: '2.5%',
  },
  matchedContainer: {
    alignItems: 'center',
    paddingBottom: 9,
  },
  matchedImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#0B2265',
  },
  matchedHeart: {
    position: 'absolute',
    bottom: 0,
  },
  conversationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
  conversationImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationProfile: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0B2265',
  },
  conversationTextWrapper: {
    marginLeft: 10,
  },
  conversationName: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  conversationDesc: {
    color: '#1A1A1A',
    fontWeight: 'normal',
    fontSize: 12,
  },
  conversationFloatText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  conversationDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#0B2265',
  },
  bottomCont: {
    width: '100%',
    alignItems: 'center',
    height: 45,
    justifyContent: 'space-between',
    alignSelf: 'center',
    // position: 'absolute',
  },
  messageInputCont: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 40,
    marginBottom: 5,
  },
  inputCont: {
    backgroundColor: '#EAEEF1',
    padding: 7,
    borderRadius: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  //home screen
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardHome: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: '5%',
    height: 'auto',
    paddingVertical: '5%',
    fontSize: 18,
  },
  cardInner: {
    paddingTop: 10,
    flexDirection: 'row',

  },
  cardTitle: {
    color: 'black',
    fontWeight: 700,
    paddingLeft: 10
  },
  cardInnerImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0B2265',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    marginTop: 5,
  },
});

export default styles;
