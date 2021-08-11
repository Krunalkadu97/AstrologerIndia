//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const PaymentStatus = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri:'https://previews.123rf.com/images/nexusby/nexusby1906/nexusby190600255/125291629-online-order-purchase-completed-icon.jpg'}}
                style={{width:'100%',height:350}}
            />
            <Text style={{fontSize:23,fontWeight:'bold',padding:20,textAlign:'center',
            color:'green'}}>Your Order Placed Successfully...!</Text>
            <Text style={{fontSize:16,padding:10,textAlign:'center',
            color:COLORS.gray}}>You can manage your order or shop again.</Text>
            <View>
                <TouchableOpacity style={{height:40,marginHorizontal:50,borderRadius:15,
                justifyContent:'center',alignItems:'center',backgroundColor:COLORS.bgcolor,marginVertical:10}}
                onPress={()=>navigation.navigate('Order')}>
                    <Text style={{fontWeight:'bold',color:COLORS.white}}>Manage Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:40,marginHorizontal:50,borderRadius:15,
                justifyContent:'center',alignItems:'center',backgroundColor:COLORS.gray,marginVertical:10}}
                onPress={()=>navigation.navigate('Products')}>
                    <Text style={{fontWeight:'bold',color:COLORS.white}}>Go to Shop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:50,        
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default PaymentStatus;
