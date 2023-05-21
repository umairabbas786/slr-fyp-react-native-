import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from 'react-native-animated-loader';

export default function Otp({ navigation, route }) {

    const [OTP, setOTP] = useState('');
    const [loader, setLoader] = useState(false);
    const { name } = route.params;

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    const handleSubmit = async () => {

        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "otp": OTP
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (OTP.length < 6) {
            showErrorToast('Otp is Incomplete');
        } else {
            fetch("https://slr.umairabbas.me/verifyotp", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                    } else {
                        setLoader(false);
                        setOTP('');
                        navigation.navigate('RegisterSuccess');
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
                        Verification Code {"\n"}
                        <Text style={{ fontSize: 16 }}>
                            Enter 6 digit code you received on your email
                        </Text>
                    </Text>
                    <Image
                        source={require('../../assets/images/halfphone.png')}
                        style={{
                            width: '100%',
                            height: 250,
                            alignSelf: 'center',
                        }}
                        resizeMode={'contain'}
                    />
                    <View>
                        <View style={styles.inputFieldWrapper}>
                            {[0, 1, 2, 3, 4, 5].map((k, kindex) => {
                                return (
                                    <View style={styles.otpBox}>
                                        <Text style={styles.otp}>{OTP[kindex]}</Text>
                                    </View>
                                );
                            })}
                            <TextInput
                                value={OTP}
                                caretHidden
                                keyboardType="number-pad"
                                onChangeText={newText => {
                                    if (newText.length <= 6) {
                                        setOTP(newText);
                                    }
                                }}
                                style={styles.inputFieldOtp}
                            />
                        </View>
                    </View>
                    {name === 'reset' ? (
                        <TouchableOpacity
                            style={styles.buttonDark}
                            onPress={() => navigation.navigate('NewPassword')}>
                            <Text style={styles.buttonTextDark}>Verify Otp</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.buttonDark}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonTextDark}>Verify Otp</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </>
    );
}
