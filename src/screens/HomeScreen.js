import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../assets/style/styles";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLoader from 'react-native-animated-loader';
import showTimeAgo from "showtimeago";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {

  const post = useSelector((state) => state.allPosts.posts);

  const [liked, setLiked] = useState(false);
  // const [post, setPost] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // const getScreenData = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var raw = "";

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("https://slr.umairabbas.me/getposts", requestOptions)
  //     .then(response => response.json())
  //     .then((response) => {
  //       setPost(response.response);
  //       setLoader(false)
  //     })
  //     .catch(error => console.log('error', error));
  // }

  // useEffect(() => {
  //   getScreenData()
  // }, []);

  return (
    <>
      {/* <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        source={require("../assets/loader/loader.json")}
        speed={1}>
      </AnimatedLoader> */}
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <SimpleLineIcons
            name="bell"
            color="#0B2265"
            size={22}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
          <Text style={{
            'color': '#000',
            'fontWeight': '600',
            'fontSize': 18
          }}>Home</Text>
          <Text></Text>
        </View>
        <ScrollView>
          {post.map((posts, index) => (
            <TouchableOpacity
              style={styles.cardHome}
              onPress={() => {
                navigation.navigate('Comment',{
                  name: posts.message
                });
              }}
            >
              <Text style={{
                'color': '#000',
                'fontWeight': '800',
              }}>{posts.message}</Text>
              <View style={styles.cardInner}>
                <Image
                  source={{uri: posts.anonymous === true ? 'https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png' : posts.profile_picture === null ? 'https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png' : posts.profile_picture}}
                  style={styles.cardInnerImage}
                />
                <Text style={styles.cardTitle}>{posts.anonymous === true ? 'Anonymous' : posts.name} {'\n'}
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
                }}>{posts.answers === 0 ? 'No Answers' : posts.answers}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
