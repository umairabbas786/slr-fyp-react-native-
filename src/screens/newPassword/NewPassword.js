import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function NewPassword({ navigation }) {
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
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                    />
                    <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Confirm Password</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Confirm Password"
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonDark}
                    onPress={() => navigation.navigate('ForgetSuccess')}>
                    <Text style={styles.buttonTextDark}>Reset Password</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
  );
}
