import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash/Splash';
import Otp from './src/screens/Opt/Otp';
import ResetPassword from './src/screens/resetPassword/ResetPassword';
import NewPassword from './src/screens/newPassword/NewPassword';
import ForgetSuccess from './src/screens/forgetSuccess/ForgetSuccess';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainScreen from './src/screens/MainScreen';
import Settings from './src/screens/Settings';
import EditProfile from './src/screens/EditProfile';
import Message from './src/screens/Message';
import NotificationScreen from './src/screens/NotificationScreen';
import RegisterSuccess from './src/screens/RegisterSuccess';
import ChangePassword from './src/screens/ChangePassword';
import ChatScreen from './src/screens/ChatScreen';
import Comment from './src/screens/Comments';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="ForgetSuccess" component={ForgetSuccess} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default App;
