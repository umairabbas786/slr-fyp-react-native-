import React, {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import styles from './styles';
// import {useDispatch} from 'react-redux';

export default function Splash({navigation}) {
  const moveImage = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  // const dispatch = useDispatch();
  useEffect(() => {
    handleMoveImage();
    // dispatch(setScreen('authTab'));
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2500);
  });

  const handleMoveImage = () => {
    Animated.timing(moveImage, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.mainContainer}>
      <Animated.Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: 300,
          height: 300,
          transform: [
            {
              translateY: moveImage,
            },
          ],
        }}
        resizeMode={'contain'}
      />
    </View>
  );
}
