import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import CircularProgressBase from 'react-native-circular-progress-indicator';
import styles from "../assets/style/styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showTimeAgo from "showtimeago";

const Heading = ({ children }) => {
  return <Text style={styles.customHeadingForProfile}>{children}</Text>;
};

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
  const userPosts = useSelector((state) => state.userPosts.post);

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
        {userData.profile_picture === null ?
          <Image
            source={require('../assets/images/img1.png')}
            style={styles.profile}
          />
          : <Image
            source={{ uri: userData.profile_picture }}
            style={styles.profile}
          />}
        <TouchableOpacity activeOpacity={0.7} style={styles.profileButton}>
          <Text style={styles.profileTag}>{userData.user_type}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{userData.first_name + ' ' + userData.last_name}</Text>
      <Text style={styles.completedTag}>{userData.email}</Text>
      <View style={styles.rowDetailsContainer}>
        <View>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>{userPosts.length}</Text>
          <Text style={{ color: 'grey', textAlign: 'center' }}>Posts</Text>
        </View>
        <View>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>0</Text>
          <Text style={{ color: 'grey', textAlign: 'center' }}>Likes</Text>
        </View>
        <View>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>0</Text>
          <Text style={{ color: 'grey', textAlign: 'center' }}>Connects</Text>
        </View>
      </View>
      <View style={styles.rowButtonContainer}>
        <CircleButton
          tag="Log out"
          icon="sign-out"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('token');
              navigation.navigate('Login');
            }
            catch (exception) {
              console.log(exception)
            }
          }}
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
      {userPosts.length > 0 ? userPosts.map((posts, index) => (
        <View style={{ marginHorizontal: 20 }}>
          <Heading>Your Posts</Heading>
          <TouchableOpacity
            style={styles.cardHome}
            onPress={() => {
              navigation.navigate('Message');
            }}
          >
            <Text style={{
              'color': '#000',
              'fontWeight': '800',
            }}>{posts.message}</Text>
            <View style={styles.cardInner}>
              {userData.profile_picture === null ?
                <Image
                  source={require('../assets/images/img1.png')}
                  style={styles.cardInnerImage}
                />
                : <Image
                  source={{ uri: userData.profile_picture }}
                  style={styles.cardInnerImage}
                />}
              <Text style={styles.cardTitle}>{userData.first_name + ' ' + userData.last_name} {'\n'}
                <Text style={{ 'color': 'grey' }}>{showTimeAgo(posts.createdAt)}</Text>
              </Text>
            </View>
            <View style={styles.likeContainer}>
              <FontAwesome
                name="heart"
                color="red"
                size={20}
                onPress={() => {
                  setLiked(true)
                }}
              />
              <Text style={{
                'color': 'grey',
                'fontWeight': '400',
                'fontSize': 16
              }}>No Answer yet</Text>
            </View>
          </TouchableOpacity>
        </View>
      )) : ''}
    </ScrollView>
  );
};

export default ProfileScreen;
