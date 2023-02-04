import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Otp({ navigation, route }) {

    const [OTP, setOTP] = useState('');
    const { name } = route.params

    return (
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
                    <Text style={{ marginBottom: 10, marginTop: 10, textAlign: 'center', color: 'white' }}>Didn't recieve code? {" "}
                        <Text onPress={() => Alert.alert('resend code')} style={{ color: 'white', textDecorationLine: 'underline' }}>resend</Text>
                    </Text>
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
                        onPress={() => Alert.alert('Verify Otp')}>
                        <Text style={styles.buttonTextDark}>Verify Otp</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}
