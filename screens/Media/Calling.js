//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const Calling = () => {
    return (
        <View style={styles.container}>
            <Text>Calling</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default Calling;
