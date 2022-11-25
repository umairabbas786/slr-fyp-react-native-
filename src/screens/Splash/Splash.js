import React, {useRef, useEffect} from 'react';
import {View, Text, Image, Animated, Dimensions} from 'react-native';
import {theme} from '../../assets/constants/Theme';
import styles from './styles';

export default function Splash() {
  const moveImage = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  // const dispatch = useDispatch();
  useEffect(() => {
    handleMoveImage();
    // setTimeout(() => {
    //   navigation.navigate('Welcome');
    // }, 2500);
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
