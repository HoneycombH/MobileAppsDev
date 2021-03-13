import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Review extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Contact</Text>
                <Button
                    title="Cancel"
                    onPress={() => navigation.navigate('Location')}
                />
                <Button
                    title="Submit"
                //onPress={() => navigation.navigate('')}
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

export default Review;

