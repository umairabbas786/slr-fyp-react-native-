import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash/Splash';
import Otp from './src/screens/Opt/Otp';
import ResetPassword from './src/screens/resetPassword/ResetPassword';
import NewPassword from './src/screens/newPassword/NewPassword';
import ForgetSuccess from './src/screens/forgetSuccess/ForgetSuccess';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="ForgetSuccess" component={ForgetSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;