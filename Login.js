import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
            
        }
        
    }
    login = async () => {
        //validation

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((responce) => {
                if (responce.status === 200) {
                    return responce.json()
                    Alert.alert("Yes")
                }
                else if (responce.status === 400) {
                    throw 'Invalid login details';
                    Alert.alert("No")
                }
                else {
                    throw 'Unexpected error';
                    Alert.alert("other")
                }
            })
            .then(async (responceJson) => {
               // console.log(responceJson);
            await AsyncStorage.setItem('@session_token', responceJson.token);
               // await AsyncResource.setItem('@id', Json.stringify(responceJson.id));
               // await AsyncResource.setItem('@info', Json.stringify(responceJson));
            this.props.navigation.navigate("Home");
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, ToastAndroid.SHORT);
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
               

                <View style={styles.buttonContainer}>
                    <Button style={styles.button}
                        title="Submit"
                        onPress={() => this.login()}
                    />
                    <Button style={styles.button}
                        title="New User"
                        onPress={() => navigation.navigate('New_User')}
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
         margin:5
    },
    buttonContainer: {
        padding:'10%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        color: 'pink'
        
    },
    button: {
       backgroundColor: 'pink'
    }
});

export default Login;
