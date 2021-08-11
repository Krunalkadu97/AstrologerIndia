//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Platform,ScrollView} from 'react-native';
import {FontAwesome5 } from 'react-native-vector-icons'
import {useNavigation} from '@react-navigation/native'
import { FONTS ,COLORS,SIZES} from './../../constants/theme';
// create a component
const AstroCard = (props,{...rest}) => {
    const {item} = props;
    const navigation =useNavigation();
    if(item.status==1)
    return (
        
        <TouchableOpacity style={[styles.cardBoady,styles.shadow]} {...rest}
        onPress={()=>navigation.navigate('Astroyogi',{item})}>
            {
                item.image =='' ? (
                    <Image
                source={{uri:'https://static.thenounproject.com/png/17241-200.png'}}
                style={styles.image}
            />
                ):(
                    <Image
                source={{uri:item.image}}
                style={styles.image}
            />
                )
            }
            
            <Text style={{fontSize:SIZES.h3,fontWeight:'bold',fontFamily:'RobotoSlab_Bold',width:'100%',paddingHorizontal:5,textAlign:'center'}} numberOfLines={2}>{item.name}</Text>
            {item.rating == '' ?(
                <Text style={{fontSize:SIZES.font,fontWeight:'700',color:COLORS.gray,fontFamily:'RobotoMono_Italic'}}>Rs. 0.0 /mint</Text>
            ):(
                <Text style={{fontSize:SIZES.font,fontWeight:'700',color:COLORS.gray,fontFamily:'RobotoMono_Italic'}}>Rs. { item.charge} /mint</Text>
            ) }
            {item.rating == '' ? (
                <Text style={[styles.ratingBox,{textAlign:'center',fontWeight:'bold',color:COLORS.main,fontFamily:'Bitter_Bold'}]}>New</Text>
            ):(
                <View style={styles.ratingBox}>
                <Text>{item.rating}{'  '}</Text>
                <FontAwesome5 name='star-half-alt' color={COLORS.main} size={SIZES.h3}/>
                </View>
            )}
        </TouchableOpacity>
       
    );
    return (
        <View/>
           
    )
};

// define your styles
const styles = StyleSheet.create({
    cardBoady: {
        width: SIZES.width/3.2,
        margin:2,
        alignItems:'center',
        elevation:3,
        paddingVertical:SIZES.base,
        backgroundColor:COLORS.homBtn,
        borderWidth:0.1
    },
    image:{
        width:80,
        height:80,
        borderRadius:40
    },
    ratingBox:{
        width:'80%',
        padding:10,
        height:36,
        borderRadius:18,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5,
        elevation:4,
        backgroundColor:COLORS.white
    },
    shadow:{
        shadowColor:COLORS.dark,
        shadowOffset:{
            width:0,
            height:5
        },
        shadowOpacity:0.4,
        shadowRadius:3.84,
        elevation:10
    }
});

//make this component available to the app
export default AstroCard;
