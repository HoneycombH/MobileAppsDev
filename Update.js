import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native';

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
    render() {
        const navigation = this.props.navigation;

        return (
            <ScrollView>
                <TextInput style={styles.textinput}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email} first_name

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
                        onPress={() => this.getData()}
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
