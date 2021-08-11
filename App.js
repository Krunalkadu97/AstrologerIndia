import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux'
import store from './ReduxStore/store'
import * as Font from 'expo-font'
import {ForgotPassword, Login,OnBoarding,SignUp,SplashScreen, UpdatePassword} from './screens/Auth'
import DrawerNavigatorRoutes from './navigation/DrawerNavigationRoute';
import FlashMessage from "react-native-flash-message";
const Stack = createStackNavigator();

const Auth = () => {
  
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
    <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPass"
        component={UpdatePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fonts = {
    Bitter_Bold:require('./assets/fonts/Bitter/static/Bitter-Bold.ttf'),
      RobotoMono_Italic:require('./assets/fonts/Roboto_Mono/static/RobotoMono-Italic.ttf'),
      RobotoSlab_Bold:require('./assets/fonts/static/RobotoSlab-Bold.ttf')
  };
  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(fonts);
        setLoaded(true);
      } catch (err) {
        setError(err);
      }

    })();
  }), [fonts];

  if (error) return <View><Text>{error.message}</Text></View>;
  if (!loaded) return null;
  return (
    <StoreProvider store={store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{headerShown: false}}
      />
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigatorRoutes}
        // Hiding header for Navigation Drawer
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  <FlashMessage position="top" />
  </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
