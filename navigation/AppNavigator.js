import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import Home from '../components/Home';
import Donations from '../components/Donations';
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Donations') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2ec4b6',
                tabBarInactiveTintColor: 'gray',
                headerStyle: [{ backgroundColor: '#2ec4b6' }],
                headerTitleStyle: [{ color: 'white' }],
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Donations" component={Donations} />
        </Tab.Navigator>
    );
}