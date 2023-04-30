import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../assets/style/styles";
import Entypo from 'react-native-vector-icons/Entypo';
import { Header } from "../assets/constants/Header";


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

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Message');
        }}
        activeOpacity={0.7}
        style={styles.conversationContainer}>
        <View style={styles.conversationImage}>
          <Image
            // source={{
            //   uri: 'https://i.pinimg.com/originals/d7/0a/3a/d70a3a4ded27c9f46b5e1cce8ccf2d89.jpg',
            // }}
            source={item.imgPath}
            style={styles.conversationProfile}
          />
          <View style={styles.conversationTextWrapper}>
            <Text style={styles.conversationName}>Lorem Ipsum</Text>
            <Text style={styles.conversationDesc}>Start new converstaion</Text>
          </View>
        </View>
        {item.tag !== '' ? (
          <View
            style={{
              backgroundColor: '#0B2265',
              borderRadius: 100,
            }}>
            <Text style={styles.conversationFloatText}>{item.tag}</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#0B2265',
              borderRadius: 100,
              height: 10,
              width: 10,
            }}>
            <Text style={styles.conversationFloatText}></Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.profileMainContainer}>
      <Header tag="Chat" navigation={navigation} />
      <Heading>Conversations</Heading>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.conversationSeparator} />
        )}
      />
    </View>
  );
};

export default ChatScreen;
