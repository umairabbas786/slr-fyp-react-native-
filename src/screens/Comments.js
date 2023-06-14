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
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import showTimeAgo from "showtimeago";


const data = [
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
];

function Comment({ navigation, route }) {

    const flatList = React.useRef(null);
    const [messageFocus, setMessageFocus] = useState(false);
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');

    const userData = useSelector((state) => state.userDetails.user);
    const { id, name } = route.params;

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
        getAllComments()
    }, [comments]);

    const getAllComments = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "post_id": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://slr.umairabbas.me/getcomments", requestOptions);
        const data = await response.json();
        setComments(data.response);
        flatList.current.scrollToEnd({animated: false})
    }

    const handleSendComment = () => {
        const Data = {
            message,
            user_id: userData.id,
            post_id: id,
        };
        setMessage('');
        socket.emit('send-comment', Data, (data) => {
            setComments([...comments, data]);
        });
        socket.on("new-comment", (data) => {
            setComments([...comments, data]);
        })
    };

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    mine: true,
                    backgroundColor: item.user_id === userData.id ? theme.colors.BG : '#ECECEC',
                    alignSelf: item.user_id === userData.id ? 'flex-end' : 'flex-start',
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
                    }}>{item.name}</Text>
                <Text
                    style={{
                        color: item.user_id === userData.id ? 'white' : '#1A1A1A',
                        fontSize: 14,
                        fontWeight: 800
                    }}>
                    {item.message}
                </Text>
                <Text
                    style={{
                        color: item.user_id === userData.id ? 'grey' : '#1A1A1A',
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
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../assets/images/notfound.gif')}
                    style={{ alignSelf: 'center', marginTop: 150 }}
                />
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
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            Comments
                        </Text>
                    </View>
                </View>
            </View>
            <View style={
                {
                    alignSelf: 'center',
                    backgroundColor: '#1A1A1A',
                    padding: 8,
                    borderRadius: 20,
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                <Text>Topic:</Text>
                <Text style={{ color: 'white' }}>{name}</Text>
            </View>
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={comments}
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
                            onPress={handleSendComment}
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

export default Comment
