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
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

function Settings({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [incognitonabled, setIncognitoEnabled] = useState(false);

  return (
      <View style={styles.ProfileMainContainer}>
          <Header back={() => navigation.goBack()} tag="Settings" />

          <ScrollView style={{ marginHorizontal: 10 }}>
              <View style={{ height: 15 }} />
              <Text style={styles.texted}>
                  Streamline your app experience with our comprehensive notification management system, effortlessly handling incoming and outgoing alerts with ease.
              </Text>
              <CustomTab
                  type={'switch'}
                  title="Notification"
                  isEnabled={isEnabled}
                  setIsEnabled={setIsEnabled}
              />
              <View style={{ height: 15 }} />

              <Text style={styles.texted}>
                  Change your account password to make your account more secure.
              </Text>
              <CustomTab
                  type={'arrowOnly'}
                  title="Change Password"
                  onPress={() => {
                      navigation.navigate('ChangePassword');
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
                  color={theme.colors.primarydark}
                  txtColor="white"
                  children="Delete account"
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

              <View style={{ height: 50 }} />
          </ScrollView>
      </View>
  )
}

export default Settings
