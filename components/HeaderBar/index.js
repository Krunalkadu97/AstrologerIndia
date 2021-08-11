//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity ,Dimensions} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import { COLORS } from './../../constants/theme';
const {width,height} =Dimensions.get('window');
// create a component
const HeaderBar = ({titleText,iconType,...rest}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}> 
                <TouchableOpacity style={styles.buttonContainer} {...rest}>
                    <Ionicons name='chevron-back' color='tomato' size={25}/>
                </TouchableOpacity>
                <Text style={{fontSize:16,marginHorizontal:20,fontWeight:'bold',color:COLORS.gray}}>{titleText}</Text>
            </View>
            <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:'transparent'}]}>
                <Ionicons name={iconType} color='tomato' size={30}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        
        flexDirection:'row',
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
        width:'100%',
        paddingHorizontal:10
    },
    buttonContainer:{
        width:50,
        height:30,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.16)',
        marginRight:10
    }
});

//make this component available to the app
export default HeaderBar;
