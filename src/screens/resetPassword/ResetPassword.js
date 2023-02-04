import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ResetPassword({ navigation }) {
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
                <View style={{marginTop: 20}}>
                    <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter your Email"
                        placeholderTextColor={'grey'}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonDark}
                    onPress={() => navigation.navigate('Otp', { name: 'reset' })}>
                    <Text style={styles.buttonTextDark}>Verify Email</Text>
                </TouchableOpacity>
                <Text onPress={() => navigation.navigate('Welcome')} style={{ marginBottom: 10, marginTop: 5, textAlign: 'center', color: 'white', textDecorationLine: 'underline' }}>Back to login</Text>
            </ScrollView>
        </View>
    );
}
