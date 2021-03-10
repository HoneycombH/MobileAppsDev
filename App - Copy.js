import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import New_User from './components/New_User';
import Login from './components/Login';
import Update from './components/Update';
import Location from './components/Location';
import Review from './components/Review';





const Stack = createStackNavigator();

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="New_User" component={New_User} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Update" component={Update} />                 
                    <Stack.Screen name="Location" component={Location} />
                    <Stack.Screen name="Review" component={Review} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;

        
        
