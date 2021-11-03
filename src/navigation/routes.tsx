import ForgetPassword from '../views/public/forgetPassword';
import Home from '../views/private/home';
import Login from '../views/public/login';
import Otp from '../views/public/otp';
import React from 'react';
import Register from '../views/public/register';
import Settings from '../views/private/settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const PrivateNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Settings"
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home Screen'
                }}
                name={'Home'}
                component={Home}
            ></Tab.Screen>
            <Tab.Screen
                name={'Settings'}
                component={Settings}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

const PublicNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={"Login"}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="Otp"
                component={Otp}
            />
        </Stack.Navigator>
    )
}

export default PublicNavigator;