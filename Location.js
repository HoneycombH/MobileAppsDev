import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Contact extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Contact</Text>
                <Button
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Like/Unlike"
                    //onPress={() => }
                />
                <Button
                    title="Add review"
                    onPress={() => navigation.navigate('Review') }
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
        backgroundColor: 'cyan'
    },
    text: {
        color: 'white',
        fontSize: 25
    }
});

export default Contact;
