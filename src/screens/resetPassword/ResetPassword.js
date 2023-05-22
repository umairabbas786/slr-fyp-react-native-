import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from 'react-native-animated-loader';

export default function ResetPassword({ navigation }) {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    const handleSubmit = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email
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
        } else {
            setLoader(true);
            fetch("https://slr.umairabbas.me/verifyemail", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                    } else {
                        setLoader(false);
                        setEmail('');
                        await AsyncStorage.setItem('token', response.token);
                        navigation.navigate('Otp', { name: 'reset' });
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
                        Forgot Password {"\n"}
                        <Text style={{ fontSize: 16 }}>
                            Reset your password here
                        </Text>
                    </Text>
                    <Image
                        source={require('../../assets/images/forgot.png')}
                        style={{
                            width: '100%',
                            height: 200,
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                        resizeMode={'contain'}
                    />
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your Email"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholderTextColor={'grey'}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonDark}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonTextDark}>Verify Email</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Login')} style={{ marginBottom: 10, marginTop: 5, textAlign: 'center', color: 'white', textDecorationLine: 'underline' }}>Back to login</Text>
                </ScrollView>
            </View>
        </>
    );
}
