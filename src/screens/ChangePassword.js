import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';

import styles from '../assets/style/styles';
import AnimatedLoader from 'react-native-animated-loader';
import { Header } from '../assets/constants/Header';
import { TextInput } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ navigation }) => {

    const [loader, setLoader] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    const handleSubmit = async () => {

        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "current_pass": currentPass,
            "password": newPass,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (currentPass === '') {
            showErrorToast('Please Enter Your Current Password');
        }
        else if (newPass === '') {
            showErrorToast('Please Enter New Password');
        }
        else if (newPass.length <= 5) {
            showErrorToast('Please Enter Strong Password');
        }
        else if (newPass !== confirmPass) {
            showErrorToast('Passwords should be same');
        }
        else {
            setLoader(true);
            fetch("https://slr.umairabbas.me/updatepassword", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                    } else {
                        setLoader(false);
                        setCurrentPass('');
                        setNewPass('');
                        setConfirmPass('');
                        Popup.show({
                            type: 'success',
                            title: response.success,
                            textBody: response.message,
                            timing: 3000,
                            buttonEnabled: false,
                            buttonText: 'Close',
                            onCloseComplete: () => navigation.navigate('Profile'),
                        })
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    const Heading = ({ children, right }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: '5%',
                    marginTop: 10,
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>
                    {children}
                </Text>
                {right && right()}
            </View>
        );
    };
    return (
        <>
            <Root>
                <AnimatedLoader
                    visible={loader}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    source={require("../assets/loader/loader.json")}
                    speed={1}>
                </AnimatedLoader>
                <View style={styles.ProfileMainContainer}>
                    <Header back={() => navigation.goBack()} tag="Security & Privacy" />
                    <ScrollView style={{ marginHorizontal: 10 }}>
                        <Heading>Change Password</Heading>
                        <Text style={styles.texted}>
                            Enter the Strong Password to make your account more secure.
                        </Text>

                        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Current Password</Text>
                            <TextInput
                                style={styles.inputField}
                                secureTextEntry={true}
                                placeholder="Enter your Current Password"
                                onChangeText={(text) => setCurrentPass(text)}
                                value={currentPass}
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>New Password</Text>
                            <TextInput
                                style={styles.inputField}
                                secureTextEntry={true}
                                placeholder="Enter your New Password"
                                onChangeText={(text) => setNewPass(text)}
                                value={newPass}
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Confirm Password</Text>
                            <TextInput
                                style={styles.inputField}
                                secureTextEntry={true}
                                placeholder="Enter your Confirm Password"
                                onChangeText={(text) => setConfirmPass(text)}
                                value={confirmPass}
                                placeholderTextColor={'grey'}
                            />
                            <TouchableOpacity
                                style={styles.buttonProfileDark}
                                onPress={handleSubmit}>
                                <Text style={styles.buttonTextDark}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Root>
        </>
    );
};

export default ChangePassword;
