import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native';
import styles from '../assets/style/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from 'react-native-animated-loader';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const showErrorToast = (error) => {
    ToastAndroid.show(error, ToastAndroid.SHORT);
  };

  const handleSubmit = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    if (email === '') {
      showErrorToast('Email is Required');
    }
    else if (email.match(/@(.*)$/)[1] != 'ucp.edu.pk') {
      showErrorToast('Invalid Email');
    }
    else if (password === '') {
      showErrorToast('Password is Required');
    }
    else {
      setLoader(true);
      fetch("https://slr.umairabbas.me/loginuser", requestOptions)
        .then(response => response.json())
        .then(async (response) => {
          if (response.success === false) {
            setLoader(false);
            showErrorToast(response.error);
            setPassword('');
          } else {
            setLoader(false);
            setEmail('');
            setPassword('');
            await AsyncStorage.setItem('token', response.authtoken);
            navigation.navigate('Main');
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  return (
    <>
      <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        source={require("../assets/loader/loader.json")}
        speed={1}>
      </AnimatedLoader>
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 0.40, alignItems: 'center', marginVertical: 25 }}>
            <Image
              source={require('../assets/images/slr.png')}
              style={{ width: 200, height: 200 }}
              resizeMode={'contain'}
            />
          </View>
          <View style={{ flex: 0.60, marginHorizontal: 20 }}>
            <Text style={{ color: 'white', marginBottom: 20, marginLeft: 5, textAlign: 'left', fontSize: 26 }}>Welcome {"\n"}
              <Text style={{ fontSize: 16, }}>
                Login to your Account
              </Text>
            </Text>
            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor={'grey'}
            />
            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
            <TextInput
              style={styles.inputField}
              secureTextEntry={true}
              placeholder="Enter your Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholderTextColor={'grey'}
            />
            <Text onPress={() => navigation.navigate('ResetPassword')} style={{ color: 'white', textAlign: 'right', marginBottom: 5, marginRight: 5, textDecorationLine: 'underline' }}>Forget Password</Text>
            <TouchableOpacity
              style={styles.buttonDark}
              onPress={handleSubmit}>
              <Text style={styles.buttonTextDark}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLight}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonTextLight}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
