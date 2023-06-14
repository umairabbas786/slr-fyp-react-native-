import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import showTimeAgo from "showtimeago";

function Message({ navigation, route }) {

    const flatList = React.useRef(null);
    const [messageFocus, setMessageFocus] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');

    const userData = useSelector((state) => state.userDetails.user);
    const { id, name, profilePicture } = route.params;

    const [socket, setSocket] = useState(null);

    const connectToSocket = async () => {
        const newSocket = await io('https://slr.umairabbas.me');
        newSocket.on('connect', () => {
            console.log('Socket connected');
        });
        setSocket(newSocket);
    };

    useEffect(() => {
        connectToSocket()
    }, []);

    useEffect(() => {
        getAllMessages()
    }, [conversation]);

    const getAllMessages = async () => {
        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "other_id": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://slr.umairabbas.me/getmessages", requestOptions);
        const data = await response.json();
        setConversation(data.response);
        flatList.current.scrollToEnd({animated: false})
    }

    const handleSendMessage = () => {
        const Data = {
            message,
            user_id: userData.id,
            other_id: id,
            sender: userData.id,
        };
        setMessage('');
        socket.emit('send-message', Data, (data) => {
            setConversation([...conversation,data]);
            flatList.current.scrollToIndex({index: conversation.length-1})
        });
        socket.on("new-message", (data) => {
            setConversation([...conversation,data]);
            flatList.current.scrollToIndex({index: conversation.length-1})
        })
    };

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    mine: true,
                    backgroundColor: item.sender === userData.id ? theme.colors.BG : '#ECECEC',
                    alignSelf: item.sender === userData.id ? 'flex-end' : 'flex-start',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: '80%',
                    borderRadius: 15,
                    flex:1
                }}>
                <Text
                    style={{
                        color: item.sender === userData.id ? 'white' : '#1A1A1A',
                        fontSize: 14,
                        fontWeight: 800
                    }}>
                    {item.message}
                </Text>
                <Text
                    style={{
                        color: item.sender === userData.id ? 'grey' : '#1A1A1A',
                        alignSelf: 'flex-end',
                        fontSize: 12,
                        fontWeight: 600
                    }}>
                    {showTimeAgo(item.createdAt)}
                </Text>
            </View>
        );
    };

    const NoDataFound = () => {
        return (
            <View style={
                {
                    alignSelf: 'center',
                    backgroundColor: '#1A1A1A',
                    padding: 8,
                    borderRadius: 20
                }}>
                <Text style={{ color: 'gold' }}><Entypo
                        name="lock"
                        color="gold"
                        size={14}
                    />{' '}messages are end to end encrypted</Text>
            </View>
        )
    }

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
                        source={{ uri: profilePicture }}
                        style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                ref={flatList}
                data={conversation}
                // renderItem={renderItem}
                renderItem={({ item }) => (
                    renderItem({item})
                )}
                ListEmptyComponent={NoDataFound}
                contentContainerStyle={{
                    paddingHorizontal: '5%',
                    paddingTop: 20,
                    paddingBottom: 100,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponent={<View style={{ height: 50 }} />}
            />
            </View>
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                }}>
                <View>
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
                                    conversation.length === 0 ? console.log(conversation.length) : flatList.current.scrollToIndex({index: conversation.length-1})
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
                <View style={{ height: 10 }} />
            </View>
        </View>
    )
}

export default Message
