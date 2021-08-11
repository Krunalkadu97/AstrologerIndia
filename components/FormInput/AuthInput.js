//import liraries
import React, { Component } from 'react';
import { View, TextInput, StyleSheet,Dimensions } from 'react-native';
const {width,height} =Dimensions.get('window')
import {Entypo} from 'react-native-vector-icons'
// create a component
const AuthInput = ({placeholderText,iconType,...rest}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <Entypo name={iconType} size={25} color='tomato'/>
            </View>
            <TextInput
                style={styles.input}
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
    inputContainer: {
        borderWidth:1,
        flexDirection:'row',
        height:height/15,
        borderColor:'tomato',
        borderRadius:25,
        marginHorizontal:20,
        marginVertical:20,
        alignItems:'center',
        paddingLeft:20
        
    },
    iconStyle:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',       
        width:40
    },
    input:{
        padding:10,
        flex:1,
        fontSize:16,
        color:'#333',
        justifyContent:'center',
        alignItems:'center'
    },
});

//make this component available to the app
export default AuthInput;
