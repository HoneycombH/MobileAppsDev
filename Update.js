import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Update extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Contact</Text>
                <Button
                    title="Cancel"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Update"
                    //onPress={() => navigation.navigate('About')}
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
        backgroundColor: 'brown'
    },
    text: {
        color: 'white',
        fontSize: 25
    }
});

export default Update;
