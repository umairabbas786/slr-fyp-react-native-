import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewPassword({ navigation }) {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loader, setLoader] = useState(false);

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    const handleSubmit = async () => {

        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (password === '') {
            showErrorToast('Password is Required');
        }
        else if (confirmpassword === '') {
            showErrorToast('Confirm Password is Required');
        }
        else if (password.length < 6) {
            showErrorToast('Password Length should be greater than 5');
        }
        else if (password != confirmpassword) {
            showErrorToast('Password does not match');
        }
        else {
            setLoader(true);
            fetch("https://slr.umairabbas.me/resetpassword", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                    } else {
                        setLoader(false);
                        setPassword('');
                        setConfirmPassword('');
                        navigation.navigate('ForgetSuccess')
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
                source={require("../../assets/loader/loader.json")}
                speed={1}>
            </AnimatedLoader>
            <View style={styles.mainContainer}>
                <ScrollView
                    suppressVirtualizationWarning
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 25,
                        paddingBottom: 100,
                        marginHorizontal: 20
                    }}>
                    <Text style={{ color: 'white', marginBottom: 20, marginLeft: 5, textAlign: 'left', fontSize: 26 }}>
                        <FontAwesome name={'chevron-left'} color={'#fff'} size={22} onPress={() => navigation.goBack()} /> {""}
                        New Password {"\n"}
                        <Text style={{ fontSize: 16 }}>
                            Create your new password
                        </Text>
                    </Text>
                    <Image
                        source={require('../../assets/images/reset.png')}
                        style={{
                            width: '100%',
                            height: 200,
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                        resizeMode={'contain'}
                    />
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>New Password</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your New Password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholderTextColor={'grey'}
                            secureTextEntry={true}
                        />
                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Confirm Password</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Confirm Password"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmpassword}
                            placeholderTextColor={'grey'}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonDark}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonTextDark}>Reset Password</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}
