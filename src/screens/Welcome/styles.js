import {StyleSheet, Dimensions} from 'react-native';
import { theme } from '../../assets/constants/Theme';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: theme.colors.BG,
  },
  mainText: {
    color: theme.colors.BTN,
    fontSize: theme.colors.fontSize,
  }
});

export default styles;
