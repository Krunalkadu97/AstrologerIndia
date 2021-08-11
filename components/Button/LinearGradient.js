//import liraries
import React, { Component } from 'react';
import {  Text, StyleSheet,TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
// create a component
const LinearGradients = ({buttonTitle,...rest}) => {
    return (
        <TouchableOpacity style={[styles.shadow,styles.outerBox]} {...rest}>
            <LinearGradient 
                style={styles.innerBox}
                colors={['#ff4500','#ff7f50']}
                start={{x:0,y:0}}
                end={{x:1,y:1}}>
                            <Text style={styles.bText}>{buttonTitle}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    outerBox:{
        marginTop:20,
        width:'45%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15
    },
    innerBox:{
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15
    },
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    bText:{
        color:'white',
        fontWeight:'bold',
        fontSize:18
    }
});

//make this component available to the app
export default LinearGradients;
