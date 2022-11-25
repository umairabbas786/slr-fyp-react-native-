import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const theme = {
  colors: {
    BG: '#194787',
    grayFont: '#424C51',
    primarydark: '#111945',
    BTN: '#EB2227',
    btnSize: 25,
    fontSize: 20 
  },
  size: {
    headerWidth: width / 1.1,
  },
  fontFamily: {
    rock: 'ROCK',
    rockBold: 'rockb',
  },
};