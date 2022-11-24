import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function Splash() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Splash Screen</Text>
    </View>
  )
}
