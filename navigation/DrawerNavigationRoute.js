// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens


import CustomSidebarMenu from './CustomSidebarMenu';
import Router from './index'
import { COLORS } from './../constants/theme';


const Drawer = createDrawerNavigator();


const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: COLORS.white,
        color: COLORS.white,
        itemStyle: {marginVertical: 5, color: COLORS.white},
        labelStyle: {
          color: COLORS.white,
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: ''}}
        component={Router}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;