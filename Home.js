import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Loading: true,
            listData: [],
            LoginStatus: "Logged in"
        }
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.LoggedInChecker();
        });
        this.getData();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
            'headers': {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                else if (response.status === 401) {
                    ToastAndroid.show("No Account Logged in", ToastAndroid.SHORT);
                    //this.props.navigation.navigate("Login") bounces to login screen
                    this.setState({ LoginStatus: ("Not logged in") })
                }
                else {
                    throw "Unexpected Error";
                }
            })
            .then((responseJson) => {
                this.setState({
                    Loading: false,
                    listData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, ToastAndroid.SHORT);
            })
    }

    LoggedInChecker = async () => {
        const value = await AsyncStorage.getItem("@session_token");
        if (value == null) {
            //this.props.navigation.navigate('Login') bounces you to login screen
            this.setState({ LoginStatus: ("Not logged in") })
        }
    };
    render() {

        const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}> Home</Text>
                <Text style={styles.text}>{this.state.LoginStatus}</Text>
                <Button
                    title="New user"
                    onPress={() => navigation.navigate('New_User')}
                />

                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
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
        );
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
        fontSize: 25
    }
});

export default Home;

