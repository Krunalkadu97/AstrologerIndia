//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

// create a component
const ConfirmButton = ({buttonTitle1,buttonTitle2,...rest}) => {
    return (
        <View style={styles.bContainer}>
            <TouchableOpacity style={[styles.bBox,styles.shadow]} {...rest}>
                <Text style={styles.textInner}>{buttonTitle1}</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bBox,styles.shadow]} {...rest}>
                <Text style={styles.textInner}>{buttonTitle2}</Text> 
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        height:100,
        width:'100%',
        alignItems:'center',
        paddingHorizontal:30
    },
    bBox:{
        width:'45%',
        height:40,    
        backgroundColor:'#f7f7f7',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    textInner:{
        fontWeight:'bold',
        fontSize:18
    },
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:6
        },
        shadowOpacity:0.4,
        shadowRadius:3.84,
        elevation:6
    }
});

//make this component available to the app
export default ConfirmButton;
