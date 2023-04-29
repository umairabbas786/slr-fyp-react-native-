import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircularProgressBase from 'react-native-circular-progress-indicator';
import styles from "../assets/style/styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CircleButton = ({ tag, bold, icon, onPress }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.profileIconContainer(bold)}>
        <FontAwesome name={icon} color="#0B2265" size={bold ? 35 : 30} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.profileIconTag(bold)}>
        {tag}
      </Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.profileMainContainerStyle}
      showsVerticalScrollIndicator={false}
      style={styles.profileMainContainer}>
      <View style={styles.profileWrapper}>
        <CircularProgressBase
          activeStrokeWidth={6}
          inActiveStrokeWidth={3}
          inActiveStrokeOpacity={0.2}
          value={100}
          radius={75}
          activeStrokeColor={'#0B2265'}
          inActiveStrokeColor={'#D2D2D2'}
          rotation={180}
        />
        <Image
          style={styles.profile}
          source={{
            uri: 'https://i.pinimg.com/originals/d7/0a/3a/d70a3a4ded27c9f46b5e1cce8ccf2d89.jpg',
          }}
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.profileButton}>
          <Text style={styles.profileTag}>View Profile</Text>
          <AntDesign name="checkcircle" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>User Name</Text>
      <Text style={styles.completedTag}>Email Address</Text>
      <View style={styles.rowButtonContainer}>
        <CircleButton
          tag="Preferences"
          icon="sliders"
          onPress={() => navigation.navigate('MyPrefrences')}
        />
        <CircleButton
          bold
          tag="Edit Profile"
          icon="pencil"
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
        />
        <CircleButton
          tag="Settings"
          icon="gear"
          onPress={() => {
            navigation.navigate('Setting');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
