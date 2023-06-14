import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from '../assets/style/styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Header } from '../assets/constants/Header';
import { theme } from '../assets/constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from 'react-native-animated-loader';
import { Image } from 'react-native';
import showTimeAgo from "showtimeago";

function NotificationScreen({ navigation }) {

    const [notifications, setNotifications] = useState([]);
    const [loader, setLoader] = useState(true);

    const getScreenData = async () => {
        const token = await AsyncStorage.getItem('token');
    
        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        var raw = "";
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("https://slr.umairabbas.me/getnotifications", requestOptions)
          .then(response => response.json())
          .then((response) => {
            setNotifications(response.response);
            setLoader(false)
          })
          .catch(error => console.log('error', error));
      }
    
      useEffect(() => {
        getScreenData()
      }, []);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.conversationContainer}>
                <View
                    style={{
                        backgroundColor: '#E4E4E4',
                        height: 45,
                        width: 45,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        overflow: 'visible',
                        shadowOffset: { width: 0, height: 2 },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                    }}>
                    <Icon
                        name="bell-alt"
                        type="fontisto"
                        color={theme.colors.primarydark}
                        size={18}
                    />
                </View>
                <Text style={{ width: '85%', color: 'black', fontWeight: 600, paddingLeft: 5 }}>
                    {item.message} {'\n'}
                    <Text style={{ color: 'grey' }}>{showTimeAgo(item.createdAt)}</Text>
                </Text>
            </TouchableOpacity>
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
        <>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.lottie}
                source={require("../assets/loader/loader.json")}
                speed={1}>
            </AnimatedLoader>
            <View style={styles.profileMainContainer}>
                <Header back={() => navigation.goBack()} tag={'Notifications'} />
                <View style={{ height: 10 }} />
                <FlatList
                    data={notifications}
                    ListEmptyComponent={NoDataFound}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    // ItemSeparatorComponent={() => (
                    //     <View style={styles.conversationSeparator} />
                    // )}
                />
            </View>
        </>
    )
}

export default NotificationScreen
