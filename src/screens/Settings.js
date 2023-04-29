import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    Switch,
    ScrollView,
    Linking,
} from 'react-native';
import styles from '../assets/style/styles';
import CustomTab from '../assets/constants/CustomTab';
import { Header } from '../assets/constants/Header';
import { CustomButton } from '../assets/constants/CustomButton';
import { theme } from '../assets/constants/Theme';

const { width, height } = Dimensions.get('window');

function Settings({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [incognitonabled, setIncognitoEnabled] = useState(false);

  return (
      <View style={styles.ProfileMainContainer}>
          <Header back={() => navigation.goBack()} tag="Settings" />

          <ScrollView style={{ marginHorizontal: 10 }}>
              <View style={{ height: 15 }} />
              <CustomTab
                  type={'switch'}
                  title="Incognito mode"
                  isEnabled={incognitonabled}
                  setIsEnabled={setIncognitoEnabled}
              />
              <View style={{ height: 15 }} />
              <Text style={styles.texted}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                  sed diam voluptua.
              </Text>
              <CustomTab
                  type={'switch'}
                  title="Notification"
                  isEnabled={isEnabled}
                  setIsEnabled={setIsEnabled}
              />
              <View style={{ height: 15 }} />

              <Text style={styles.texted}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                  sed diam voluptua.
              </Text>
              <CustomTab
                  type={'arrowOnly'}
                  title="Security & Privacy"
                  onPress={() => {
                      navigation.navigate('SecurityPrivacy');
                  }}
              />
              <CustomTab
                  type={'arrowOnly'}
                  title="Contact Us"
                  onPress={() => {
                      Linking.openURL('mailto:support@slr.com')
                  }}
              />
              <CustomButton
                  children="Log Out"
                  color={theme.colors.primarydark}
                  txtColor="white"
                  onPress={() => {
                      navigation.navigate('Login');
                  }}
              />
              <CustomButton children="Delete account" />

              <View style={{ height: 50 }} />
          </ScrollView>
      </View>
  )
}

export default Settings
