import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const {height} = Dimensions.get('window');

const PostScreen = () => {

  const userData = useSelector((state) => state.userDetails.user);

  const position = useRef(new Animated.Value(2.5)).current;
  const [text, setText] = useState('');
  const [mode, setMode] = useState('Open');

  const moveIt = () => {
    if (mode === 'Anonymous') {
      setMode('Open');
      Animated.timing(position, {
        toValue: 2.5,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setMode('Anonymous');
      Animated.timing(position, {
        toValue: 112,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: '5%',
          height: 50,
          backgroundColor: '#0B2265',
          borderRadius: 20,
          marginTop: 5,
          marginBottom: 20,
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          New Post
        </Text>
      </View>
      <ScrollView>
        <TextInput
          value={text}
          onChangeText={newText => {
            if (newText.length <= 15) {
              setText(newText);
            }
          }}
          multiline
          placeholder="Write Here...."
          keyboardType="default"
          placeholderTextColor={'grey'}
          style={{
            paddingHorizontal: 20,
            textAlign: 'left',
            marginBottom: 20,
            textAlignVertical: 'top',
            fontSize: 16,
            color: 'black',
            borderRadius: 10,
            borderColor: '#0B2265',
            borderWidth: 1,
            height: 200,
            marginHorizontal: 10
          }}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 'auto',
          marginBottom: 80,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '500',
            width: 40,
          }}>
          {1500 - text.length}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            moveIt();
          }}
          style={{
            width: 150,
            height: 40,
            backgroundColor: mode === 'Anonymous' ? '#000' : '#0B2265',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              height: 35,
              width: 35,
              borderRadius: 100,
              overflow: 'hidden',
              transform: [
                {
                  translateX: position,
                },
              ],
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
              }}
              source={{
                uri:
                  mode === 'Anonymous'
                    ? 'https://img.freepik.com/free-vector/flower-background-desktop-wallpaper-cute-vector_53876-136877.jpg'
                    : 'https://w.forfun.com/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg',
              }}
            />
          </Animated.View>
          <Text
            numberOfLines={1}
            style={{
              width: 90,
              fontSize: 14,
              color: mode === 'Anonymous' ? 'white' : 'transparent',
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            Anonymous
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: 90,
              fontSize: 14,
              color: mode === 'Anonymous' ? 'transparent' : '#fff',
              marginRight: 10,
              fontWeight: 'bold',
              position: 'absolute',
              right: 0,
            }}>
            {userData.first_name + ' ' + userData.last_name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B2265',
            borderRadius: 100,
          }}>
          <Ionicons name={'send'} color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostScreen;
