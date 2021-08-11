//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native'
// create a component
const ProductList = (props) => {
    const {item} = props;
    const navigation =useNavigation();
    return (
        <View style={styles.container}>
            <Text>hi</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default ProductList;
