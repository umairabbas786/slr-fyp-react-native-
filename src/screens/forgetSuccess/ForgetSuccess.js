import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';

export default function ForgetSuccess({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <ScrollView
                suppressVirtualizationWarning
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex:1,
                    justifyContent: 'center',
                    marginHorizontal: 20
                }}>
                <Image
                    source={require('../../assets/images/check.png')}
                    style={{
                        width: '100%',
                        height: 150,
                        alignSelf: 'center',
                        marginBottom: 10
                    }}
                    resizeMode={'contain'}
                />
                <Text style={{ color: 'white', marginBottom: 20, fontWeight: '400', textAlign: 'center', fontSize: 16 }}>your password have been updated!</Text>
                <TouchableOpacity
                    style={styles.buttonDark}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextDark}>Return To Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
