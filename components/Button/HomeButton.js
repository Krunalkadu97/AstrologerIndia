//import liraries
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet ,View} from 'react-native';
import { COLORS,SIZES,FONTS } from './../../constants/theme';
// create a component
const HomeButton = ({tiText,buttonTitle,...rest}) => {
    return (
        <View style={styles.bcontainer}>
            <View>
                <Text style={styles.titletext}>{tiText}</Text>
            </View>
            <TouchableOpacity style={[styles.shadow,styles.button]} {...rest}>
                <Text style={styles.text}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    bcontainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingVertical:SIZES.base
    },
    button:{
        padding:SIZES.base,
        width:100,
        height:40,
        borderRadius:10,
        backgroundColor:COLORS.homBtn,
        elevation:5,
        justifyContent:'center',
        alignItems:'center'
    },
    titletext:{
        fontSize:18,
        fontWeight:'bold',
        color:COLORS.dark,
        fontFamily:'Bitter_Bold'
    },
    text:{
        color:COLORS.main,
        fontWeight:'bold',
        fontFamily:'RobotoMono_Italic'
    },
    shadow:{
        shadowColor:COLORS.dark,
        shadowOffset:{
            width:0,
            height:5
        },
        shadowOpacity:0.4,
        shadowRadius:3.84,
        elevation:SIZES.base
    }
});

//make this component available to the app
export default HomeButton;
