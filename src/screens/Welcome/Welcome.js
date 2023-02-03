import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 0.40, alignItems: 'center', marginVertical: 25 }}>
          <Image
            source={require('../../assets/images/slr.png')}
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
            placeholderTextColor={'grey'}
          />
          <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry={true}
            placeholder="Enter your Password"
            placeholderTextColor={'grey'}
          />
          <Text onPress={() => Alert.alert('forget password')} style={{ color: 'white', textAlign: 'right', marginBottom: 5, marginRight: 5, textDecorationLine: 'underline' }}>Forget Password</Text>
          <TouchableOpacity
            style={styles.buttonDark}
            onPress={() => Alert.alert('Login')}>
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
  );
}
