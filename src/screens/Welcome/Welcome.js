import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

export default function Welcome() {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/images/slr.png')}
        style={{width: 200, height: 200, marginTop: 30}}
        resizeMode={'contain'}
      />
    </View>
  );
}
