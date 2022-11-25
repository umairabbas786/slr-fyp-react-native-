import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { theme } from '../../assets/constants/Theme';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.BG,
  },
  mainText: {
    color: theme.colors.BTN,
    fontSize: theme.colors.fontSize,
  }
});

export default styles;
