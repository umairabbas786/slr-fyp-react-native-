import React, { useState } from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon } from 'react-native-elements';
import styles from '../assets/style/styles';
import { theme } from '../assets/constants/Theme';
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';


const data = [
    {
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

function Message({ navigation, route }) {

    const flatList = React.useRef(null);

    const socket = io.connect("https://slr.umairabbas.me");
    const [messageFocus, setMessageFocus] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');

    const userData = useSelector((state) => state.userDetails.user);
    const { id,name,profilePicture } = route.params;

    const handleSendMessage = () => {
        const Data = {
            message,
            user_id: userData.id,
            other_id: id,
            sender: userData.id,
        };
        socket.on('connection', () => {
            console.log('Connected to Socket.IO server');
      
            // Send an event to the server
            socket.emit('send-message', Data , (err) => {
                console.log(error)
            });
          });
        socket.on("send-message", Data);
        setMessage('');
        socket.on('new-message', message => {
            console.log('message........');
            console.log(message);
            // setData([...data, message]);
            // scroll the list to the bottom after each new message
            // flatListRef.current.scrollToEnd();
        });
        // flatList.current.scrollToEnd();
    };

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
                        color: 'grey',
                        paddingBottom: 1,
                        fontSize: 14,
                        fontWeight: 600,
                    }}>umair abbas.</Text>
                <Text
                    style={{
                        color: item.mine ? 'white' : '#1A1A1A',
                        fontSize: 14,
                        fontWeight: 800
                    }}>
                    {item.msg}
                </Text>
            </View>
        );
    };

    const subRenderItem = ({ item, index }) => {
        return (
            <View>
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
                        source={{uri: profilePicture}}
                        style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
            <FlatList
                ref={flatList}
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
                                width: '88%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                height: 40,
                            }}>
                            <TextInput
                                style={{ width: '90%', padding: 0, color: 'black' }}
                                placeholder="Send a Chat"
                                onPressIn={() => {
                                    flatList.current.scrollToEnd();
                                }}
                                onFocus={() => {
                                    setMessageFocus(true);
                                }}
                                placeholderTextColor={'black'}
                                onChangeText={val => {
                                    setMessage(val);
                                }}
                                value={message}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleSendMessage}
                            disabled={message === '' ? true : false}
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
