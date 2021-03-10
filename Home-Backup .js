import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Home extends Component {
    render() {

        const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}> Home</Text>
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