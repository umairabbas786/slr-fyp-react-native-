import { View, Text, Image, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../assets/style/styles";
import { Header } from "../assets/constants/Header";
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native-gesture-handler";


const Heading = ({ children }) => {
  return <Text style={styles.customHeading}>{children}</Text>;
};

const data = [
  { imgPath: require('../assets/images/img1.png'), tag: 'Date' },
  { imgPath: require('../assets/images/img1.png'), tag: 'Date' },
  { imgPath: require('../assets/images/img1.png'), tag: 'Date' },
  { imgPath: require('../assets/images/img1.png'), tag: 'Date' },
];

const ChatScreen = ({ navigation }) => {

  const [loader, setLoader] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getScreenData = async () => {
    setLoader(true)
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

    fetch("https://slr.umairabbas.me/getconversations", requestOptions)
      .then(response => response.json())
      .then((response) => {
        setConversations(response.response);
        setLoader(false)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getScreenData()
  }, []);

  const showErrorToast = (error) => {
    ToastAndroid.show(error, ToastAndroid.SHORT);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.blocked === false ?
            navigation.navigate('Message', 
            { 
              id: item.user_id,
              name: item.name,
              profilePicture: item.profile_picture === null ? "https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png" : item.profile_picture 
            }) : showErrorToast('User Blocked You')
        }}
        activeOpacity={0.7}
        style={styles.conversationContainer}>
        <View style={styles.conversationImage}>
          <Image
            source={{ uri: item.profile_picture === null ? "https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png" : item.profile_picture }}
            style={styles.conversationProfile}
          />
          <View style={styles.conversationTextWrapper}>
            <Text style={styles.conversationName}>{item.name}</Text>
            <Text style={styles.conversationDesc}>{item.last_message === '' ? 'Start new converstaion' : item.last_message}</Text>
          </View>
        </View>
        {item.last_message_at !== '' ? (
          <View
            style={{
              backgroundColor: '#0B2265',
              borderRadius: 100,
            }}>
            <Text style={styles.conversationFloatText}>{item.last_message_at}</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#0B2265',
              borderRadius: 100,
            }}>
            <Text style={styles.conversationFloatText}>Start Chat</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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
        <Header tag="Chat" navigation={navigation} />
        <Heading>Conversations</Heading>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getScreenData} />}
          data={conversations}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.conversationSeparator} />
          )}
        />
      </View>
    </>
  );
};

export default ChatScreen;
