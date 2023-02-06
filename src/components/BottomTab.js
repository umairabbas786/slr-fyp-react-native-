import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import Svg, { Path, G } from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ConnectScreen from "../screens/ConnectScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Connect" component={ConnectScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const CustomTabBar = props => {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        overflow: 'visible',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        elevation: 10,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.jumpTo(props.state.routeNames[0])}
        style={{
          width: '20%',
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 'auto',
          }}>
          <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <G data-name="Mask Group 53" clipPath="url(#a)">
              <G data-name="Group 73">
                <Path
                  data-name="Path 12"
                  d="M21.704 7.877 13.731.657a2.608 2.608 0 0 0-3.462 0l-7.973 7.22a4.275 4.275 0 0 0-1.3 2.9V21.6A2.424 2.424 0 0 0 3.445 24h5.822v-5.546h5.515V24h5.768a2.422 2.422 0 0 0 2.449-2.4V10.773a4.27 4.27 0 0 0-1.295-2.896ZM20.552 21.6h1.153l-.659-11.959-9.12-7.848-7.5 7.085c-3.272 0-.986 12.724-.986 12.725v-10.83a1.966 1.966 0 0 1 .509-1.132l7.973-7.22a.138.138 0 0 1 .147 0l7.973 7.22a1.96 1.96 0 0 1 .509 1.132q.004 10.827.001 10.827Z"
                  fill={props.state.index === 0 ? '#0B2265' : '#D2D2D2'}
                />
              </G>
            </G>
          </Svg>
        </View>
        <Text
          style={styles.bottomTabTag(props.state.index === 0 ? true : false)}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.jumpTo(props.state.routeNames[1])}
        style={{
          width: '20%',
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 'auto',
          }}>
          <FontAwesome name={'users'} color={props.state.index === 1 ? '#0B2265' : '#D2D2D2'} size={24} />
        </View>
        <Text
          style={styles.bottomTabTag(props.state.index === 1 ? true : false)}>
          Connects
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.jumpTo(props.state.routeNames[2])}
        style={{
          width: '20%',
          alignItems: 'center',
          height: '100%',
          borderColor: '#000'
        }}>
        <View
          style={{
            marginTop: 'auto',
          }}>
          <FontAwesome name={'plus'} color={props.state.index === 2 ? '#0B2265' : '#D2D2D2'} size={26} />
          {/* <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <G data-name="Mask Group 57" clipPath="url(#a)">
              <Path
                data-name="Path 144"
                d="M17.195 2A6.726 6.726 0 0 0 12 4.416 6.635 6.635 0 0 0 6.805 2 6.827 6.827 0 0 0 0 8.85c0 6.483 11.24 12.813 11.7 13.057a.544.544 0 0 0 .608 0C12.76 21.663 24 15.425 24 8.85A6.827 6.827 0 0 0 17.195 2Z"
                fill={props.state.index === 2 ? '#0B2265' : '#D2D2D2'}
              />
            </G>
          </Svg> */}
        </View>
        <Text
          style={styles.bottomTabTag(props.state.index === 2 ? true : false)}>
          Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.jumpTo(props.state.routeNames[3])}
        style={{
          width: '20%',
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 'auto',
          }}>
          <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <G data-name="Mask Group 55" clipPath="url(#a)">
              <Path
                data-name="Path 142"
                d="M12.005 0A12.007 12.007 0 0 0 0 12a11.947 11.947 0 0 0 1.355 5.55c.085.16.16.32.245.47a1.58 1.58 0 0 1 .107 1.2 23.491 23.491 0 0 0-.854 2.8c0 .47.139.747.64.747a22.857 22.857 0 0 0 2.689-.779 1.835 1.835 0 0 1 1.153.075c.331.171.63.416.96.566H6.4A12.005 12.005 0 0 0 24 12 12.007 12.007 0 0 0 12.005 0Z"
                fill={props.state.index === 3 ? '#0B2265' : '#D2D2D2'}
              />
            </G>
          </Svg>
        </View>
        <Text
          style={styles.bottomTabTag(props.state.index === 3 ? true : false)}>
          Chat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.jumpTo(props.state.routeNames[4])}
        style={{
          width: '20%',
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 'auto',
          }}>
          <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <G data-name="Mask Group 54" clipPath="url(#a)">
              <G data-name="Group 295">
                <Path
                  data-name="Path 143"
                  d="M9.311 15.923a33.6 33.6 0 0 1 5.407 0 22.017 22.017 0 0 1 2.92.368c2.087.423 3.45 1.114 4.034 2.228a3.088 3.088 0 0 1 0 2.774c-.584 1.114-1.892 1.849-4.055 2.228a20.926 20.926 0 0 1-2.92.379 24.849 24.849 0 0 1-2.737.1h-1.655a7.873 7.873 0 0 0-1.005-.067 19.954 19.954 0 0 1-2.92-.368c-2.087-.4-3.45-1.114-4.034-2.228A3.06 3.06 0 0 1 2 19.934a3.026 3.026 0 0 1 .335-1.415c.574-1.119 1.936-1.838 4.045-2.228a21.321 21.321 0 0 1 2.931-.368ZM12 0a6.665 6.665 0 0 1 6.564 6.762A6.665 6.665 0 0 1 12 13.524a6.665 6.665 0 0 1-6.561-6.762A6.665 6.665 0 0 1 12 0Z"
                  fill={props.state.index === 4 ? '#0B2265' : '#D2D2D2'}
                />
              </G>
            </G>
          </Svg>
        </View>
        <Text
          style={styles.bottomTabTag(props.state.index === 4 ? true : false)}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabTag: index => {
    return {
      fontSize: 10,
      color: index ? '#0B2265' : '#D2D2D2',
      marginBottom: 5,
      fontWeight: '500',
      marginTop: 3,
    };
  },
  bsHeading: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bsHeadingTag: {
    color: 'black',
    fontSize: 20,
  },
  bsButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '45%',
  },
  bsButton: {
    borderRadius: 1000,
    width: 60,
    height: 60,
    backgroundColor: '#D5D5D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bsButtonTag: {
    color: 'black',
    fontSize: 13,
    marginTop: 10,
  },
});