import { View, Text } from "react-native";
import React, { useState } from "react";
import styles from "../assets/style/styles";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {

  const [liked, setLiked] = useState(false);

  return (
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
        <View style={styles.cardHome}>
          <Text style={{
            'color': '#000',
            'fontWeight': '800',
          }}>What is difference between Programmer and Software Engineer?</Text>
          <View style={styles.cardInner}>
            <Image
              source={require('../assets/images/img1.png')}
              style={styles.cardInnerImage}
            />
            <Text style={styles.cardTitle}>Umair Abbas {'\n'}
              <Text style={{ 'color': 'grey' }}>20 mins ago</Text>
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
        </View>
        <View style={styles.cardHome}>
          <Text style={{
            'color': '#000',
            'fontWeight': '800',
          }}>What is difference between Programmer and Software Engineer?</Text>
          <View style={styles.cardInner}>
            <Image
              source={require('../assets/images/img1.png')}
              style={styles.cardInnerImage}
            />
            <Text style={styles.cardTitle}>Umair Abbas {'\n'}
              <Text style={{ 'color': 'grey' }}>20 mins ago</Text>
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
        </View>
        <View style={styles.cardHome}>
          <Text style={{
            'color': '#000',
            'fontWeight': '800',
          }}>What is difference between Programmer and Software Engineer?</Text>
          <View style={styles.cardInner}>
            <Image
              source={require('../assets/images/img1.png')}
              style={styles.cardInnerImage}
            />
            <Text style={styles.cardTitle}>Umair Abbas {'\n'}
              <Text style={{ 'color': 'grey' }}>20 mins ago</Text>
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
        </View>
        <View style={styles.cardHome}>
          <Text style={{
            'color': '#000',
            'fontWeight': '800',
          }}>What is difference between Programmer and Software Engineer?</Text>
          <View style={styles.cardInner}>
            <Image
              source={require('../assets/images/img1.png')}
              style={styles.cardInnerImage}
            />
            <Text style={styles.cardTitle}>Umair Abbas {'\n'}
              <Text style={{ 'color': 'grey' }}>20 mins ago</Text>
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
        </View>
        <View style={styles.cardHome}>
          <Text style={{
            'color': '#000',
            'fontWeight': '800',
          }}>What is difference between Programmer and Software Engineer?</Text>
          <View style={styles.cardInner}>
            <Image
              source={require('../assets/images/img1.png')}
              style={styles.cardInnerImage}
            />
            <Text style={styles.cardTitle}>Umair Abbas {'\n'}
              <Text style={{ 'color': 'grey' }}>20 mins ago</Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
