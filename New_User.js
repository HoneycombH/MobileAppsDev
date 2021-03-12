import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, ToastAndroid } from 'react-native';

class New_User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }
        addUser = async () => {
            return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then((response) => {
                    if (response.status === 201) {
                        ToastAndroid.show("New User Added", ToastAndroid.SHORT);
                        this.props.navigation.navigate("Login")
                    }
                    else if (response.status === 400) {
                        ToastAndroid.show("Request Error, User may already have an account or email may be invalid", ToastAndroid.SHORT);
                        
                    }
                    else if (response.status === 500) {
                        ToastAndroid.show("Server Error", ToastAndroid.SHORT);
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
                    value={this.state.email}first_name

                />
                <TextInput style={styles.textinput}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput style={styles.textinput}
                    placeholder="First Name"
                    onChangeText={(first_name) => this.setState({ first_name})}
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
                        onPress={() => this.addUser()}
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

export default New_User;
