import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Loading: true,
            UserFirstName: 'Beans',
            UserLastName:'Toast',
            listData: [],
            LoginStatus:''
        }
    }
        
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.LoggedInChecker();
        });
        
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    
    logOut = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    ToastAndroid.show("Logged out", ToastAndroid.SHORT);
                    this.setState({ LoginStatus: false })

                    this.props.navigation.navigate("Login")

                }
                else if (response.status === 401) {
                    ToastAndroid.show("Not Authorised", ToastAndroid.SHORT);

                }
                else if (response.status === 500) {
                    ToastAndroid.show("Server Error", ToastAndroid.SHORT);
                }
                else {
                    throw "Unexpected Error";
                }
            })
            .then(async () => {
                await AsyncStorage.setItem('@session_token', '');
            })
    }

    LoggedInChecker = async () => {
        const value = await AsyncStorage.getItem("@session_token");
        if (value == null) {
            this.setState({ LoginStatus: false })
        }
        else {
            this.setState({ LoginStatus: true })
            this.getUserInfo()

        }
    };
    
    
    getUserInfo = async () => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id");
        const requestString = ("http://10.0.2.2:3333/api/1.0.0/user/"+ userID);
        return fetch(requestString, {
            method: 'get',
            headers: {
                'X-Authorization': value
            }
        })
            .then((responce) => {
                if (responce.status === 200) {
                    return responce.json()     
                }
                else if (responce.status === 401) {
                    throw 'unauthorized';
                    
                }
                else if (responce.status === 404) {
                    throw 'not found';

                }
                else if (responce.status === 500) {
                    throw 'not found';

                }
                else {
                    throw 'Unexpected error';
                    Alert.alert("other")
                }
            })
            .then(async (responceJson) => {
                await AsyncStorage.setItem('@first_name', (responceJson.first_name).toString());
                await AsyncStorage.setItem('@last_name', (responceJson.last_name).toString());
                this.setState({ UserFirstName: await AsyncStorage.getItem("@first_name")})
                this.setState({ UserLastName: await AsyncStorage.getItem("@last_name") })

            })
    };

    render() {
        const navigation = this.props.navigation;
        
        if (this.state.LoginStatus === true) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}> Home</Text>
                    <Text style={styles.text}>Hello {this.state.UserFirstName} {this.state.UserLastName}</Text>
                    <Button
                        title="Logout"
                        onPress={() => this.logOut()}
                    />

                    <Button
                        title="Update"
                        onPress={() => navigation.navigate('Update')}
                    />
                    <Button
                        title="Location"
                        onPress={() => navigation.navigate('Location')}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}> Home</Text>
                    <Text style={styles.text}>Please Login or Sign Up</Text>
                    <Button
                        title="New user"
                        onPress={() => navigation.navigate('New_User')}
                    />

                    <Button
                        title="Login"
                        onPress={() => navigation.navigate('Login')}
                    />
                   
                </View>
            );
        
            
        }
        }
        

        
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'forestgreen'
    },
    text: {
        color: 'white',
        fontSize: 25,
        padding: '3%'
    }
});

export default Home;

