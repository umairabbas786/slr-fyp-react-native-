import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../assets/style/styles';

export default function Welcome() {
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex:0.40 }}>
        <Image
          source={require('../../assets/images/slr.png')}
          style={{ width: 200, height: 200, marginTop: 30 }}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
}
