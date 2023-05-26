import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import CircularProgressBase from 'react-native-circular-progress-indicator';
import styles from "../assets/style/styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";

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

const ProfileScreen = ({ navigation }) => {

  const userData = useSelector((state) => state.userDetails.user);

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
          source={require('../assets/images/img1.png')}
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.profileButton}>
          <Text style={styles.profileTag}>Student</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{userData.first_name + ' ' + userData.last_name }</Text>
      <Text style={styles.completedTag}>{userData.email}</Text>
      <View style={styles.rowButtonContainer}>
        <CircleButton
          tag="Log out"
          icon="sign-out"
          onPress={() => navigation.navigate('Login')}
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
            navigation.navigate('Settings');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
