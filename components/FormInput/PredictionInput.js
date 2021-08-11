//import liraries
import { Inter_500Medium } from '@expo-google-fonts/inter';
import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

// create a component
const PredictionInput = ({labelValue,inputTitle,placeholderText,width,...rest}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>{inputTitle}</Text>
            <TextInput
                value={labelValue}
                style={[styles.input,styles.shadow]}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor='#666'
                
                {...rest}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical:10
    },
    textTitle:{
        fontWeight:'bold',
        paddingVertical:10,
        marginLeft:10,
        fontSize:18
    },
    input:{
        height:45,
        flex:1,
        fontSize:16,
        color:COLORS.gray,
        backgroundColor:COLORS.white,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        borderRadius:10,
        marginRight:10,
        fontSize:18,
        fontWeight:'bold'
    },
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:6
        },
        shadowOpacity:0.35,
        shadowRadius:3.85,
        elevation:15
    }
});

//make this component available to the app
export default PredictionInput;
