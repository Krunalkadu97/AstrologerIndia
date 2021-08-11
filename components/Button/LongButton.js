//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
const {width,height} =Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient'
// create a component
const LinearButton = ({buttonTitle,...rest}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.outerBox,styles.shadow]} {...rest}>
                <LinearGradient 
                style={styles.innerBox}
                colors={['#ff4500','#ff7f50']}
                start={{x:0,y:0}}
                end={{x:1,y:1}}>
                            <Text style={styles.bText}>{buttonTitle}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingVertical:20,
        paddingHorizontal:10
    },
    outerBox:{
        marginTop:20,
        width:'70%',
        height:35,
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
        fontSize:16,
        paddingHorizontal:20
    }

});

//make this component available to the app
export default LinearButton;
