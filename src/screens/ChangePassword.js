import React, { useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import styles from '../assets/style/styles';
import CustomTab from '../assets/constants/CustomTab';
import { Header } from '../assets/constants/Header';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChangePassword = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState('date');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = () => {
        
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
                        onPress={() => {}}>
                        <Text style={styles.buttonTextDark}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ChangePassword;
