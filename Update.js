import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }
    

    
    updateUser = async () => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id");

        if (this.state.first_name != "") {
            this.updateVariable(JSON.stringify({"first_name" : this.state.first_name,}));
        }
        if (this.state.last_name != "") {
            this.updateVariable(JSON.stringify({ "last_name": this.state.last_name, }));
        }
        if (this.state.email != "") {
            this.updateVariable(JSON.stringify({ "email": this.state.email, }));
        }
        if (this.state.password != "") {
            this.updateVariable(JSON.stringify({ "password": this.state.password, }));
        }
    }
        updateVariable = async (bodytext) => {
            const value = await AsyncStorage.getItem("@session_token");
            const userID = await AsyncStorage.getItem("@user_id");
        const requestString = ("http://10.0.2.2:3333/api/1.0.0/user/" + userID);
        return fetch(requestString, {
            method: 'patch',
            headers: {
                'X-Authorization': value,
                'Content-Type': 'application/json'
            },

            body:  bodytext 
        })
            .then((response) => {
                if (response.status === 200) {
                    ToastAndroid.show("Updated", ToastAndroid.SHORT);
                    this.props.navigation.navigate("Home")
                }
                else if (response.status === 400) {
                    ToastAndroid.show("bad request", ToastAndroid.SHORT);

                }
                else if (response.status === 401) {
                    ToastAndroid.show("unauthorized", ToastAndroid.SHORT);
                }
                else if (response.status === 403) {
                    ToastAndroid.show("forbiden", ToastAndroid.SHORT);
                }
                else if (response.status === 404) {
                    ToastAndroid.show("not Found", ToastAndroid.SHORT);
                }
                else if (response.status === 500) {
                    ToastAndroid.show("server error", ToastAndroid.SHORT);
                }
                else {
                    throw "Unexpected Error";
                }
            })     
    }




    render() {
        const navigation = this.props.navigation;

        return (
            <ScrollView>
                <TextInput style={styles.textinput}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}

                />
                <TextInput style={styles.textinput}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput style={styles.textinput}
                    placeholder="First Name"
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}

                />
                <TextInput style={styles.textinput}
                    placeholder="Last Name"
                    onChangeText={(last_name) => this.setState({ last_name })}
                    value={this.state.last_name}

                />


                <View style={styles.buttonContainer}>
                    <Button style={styles.button}
                        title="Submit"
                        onPress={() => this.updateUser()}
                    />
                    <Button style={styles.button}
                        title="Login"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    text: {
        color: 'white',
        fontSize: 25
    },
    textinput: {
        padding: 4,
        borderWidth: 0.5,
        margin: 5
    },
    buttonContainer: {
        padding: '10%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        color: 'pink'

    },
    button: {
        backgroundColor: 'pink'
    }
});

export default Update;
