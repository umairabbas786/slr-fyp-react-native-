import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { Icon } from 'react-native-elements';
import styles from '../assets/style/styles';
import { theme } from '../assets/constants/Theme';

const data = [
    {
        date: 'Yesterday',
        conversation: [
            {
                msg: 'Yeah. Right! As if that would happen!',
                mine: false,
            },
            {
                msg: 'Anywho, gotta roll. Gnight!',
                mine: true,
            },
            {
                msg: 'Goodnight!',
                mine: false,
            },
        ],
    },
    {
        date: 'Today',
        conversation: [
            {
                msg: 'Wassup!!!!!!',
                mine: true,
            },
            {
                msg: 'So what did I miss yesterday?',
                mine: true,
            },
            {
                msg: 'So, while you were gone, a lot has happened. Let me give you a brief idea.',
                mine: false,
            },
            {
                msg: 'Natalie from HR cam to our floor looking for Steven. Remember the mistake he had made last week? It was definitely related to this!!!',
                mine: false,
            },
        ],
    },
];

function Message({ navigation }) {

    const [messageFocus, setMessageFocus] = useState(false);
    const [message, setMessage] = useState('');

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    mine: true,
                    backgroundColor: item.mine ? theme.colors.BG : '#ECECEC',
                    alignSelf: item.mine ? 'flex-end' : 'flex-start',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: '80%',
                    borderRadius: 15,
                }}>
                <Text
                    style={{
                        color: item.mine ? 'white' : '#1A1A1A',
                        fontSize: 14,
                    }}>
                    {item.msg}
                </Text>
            </View>
        );
    };

    const subRenderItem = ({ item, index }) => {
        return (
            <View>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 13,
                        textAlign: 'center',
                        marginVertical: 15,
                    }}>
                    {item.date}
                </Text>
                <FlatList
                    data={item.conversation}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            </View>
        );
    };

  return (
      <View style={styles.profileMainContainer}>
          <View
              style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                  height: 50,
                  backgroundColor: '#0B2265',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Entypo
                      name="chevron-left"
                      color="white"
                      size={24}
                      style={{
                          marginRight: 5,
                      }}
                      onPress={() => {
                          navigation.goBack();
                      }}
                  />
                  <Image
                      source={require('../assets/images/img1.png')}
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                  <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                          Cesar Jordan
                      </Text>
                      <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 10 }}>
                          Typing something....
                      </Text>
                  </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="video" color={'white'} size={18} />
                  <Feather
                      name="phone"
                      color={'white'}
                      size={18}
                      style={{ marginLeft: 10 }}
                  />
                  <Entypo
                      name="dots-three-horizontal"
                      color={'white'}
                      size={18}
                      style={{ marginLeft: 10 }}
                  />
              </View>
          </View>
          <FlatList
              data={data}
              renderItem={subRenderItem}
              contentContainerStyle={{
                  paddingHorizontal: '5%',
                  paddingTop: 20,
                  paddingBottom: 100,
              }}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
          <View
              style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
              }}>
              <View
                  style={[
                      styles.bottomCont,
                      {
                          // height: emoji ? height / 4 : height / 1.3,
                          // top: emoji ? height / 1.6 : height / 1.22,
                      },
                  ]}>
                  <View
                      style={{
                          width: '90%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          alignSelf: 'center',
                          height: 40,
                          marginBottom: 5,
                      }}>
                      <View
                          style={{
                              backgroundColor: '#EAEEF1',
                              padding: 7,
                              borderRadius: 100,
                              width: '85%',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                              alignItems: 'center',
                              height: 40,
                          }}>
                          <TextInput
                              style={{ width: '90%', padding: 0, color: 'black' }}
                              placeholder="Send a Chat"
                              onFocus={() => {
                                  setMessageFocus(true);
                              }}
                              placeholderTextColor={'black'}
                              onChangeText={val => {
                                  setMessage(val);
                              }}
                              value={message}
                          />
                          <Entypo name="attachment" color={'#646B75'} size={18} />
                      </View>    
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        data[1].conversation.push({
                            msg: message,
                            mine: true,
                        });
                        console.log(data);
                        setMessage('');
                    }}
                    style={{
                        backgroundColor: theme.colors.primarydark,
                        padding: 10,
                        borderRadius: 100,
                    }}>
                    <Icon
                        name="send"
                        type="font-awesome"
                        color={'white'}
                        size={16}
                    />
                </TouchableOpacity>
                  </View>
              </View>
          </View>
      </View>
  )
}

export default Message
