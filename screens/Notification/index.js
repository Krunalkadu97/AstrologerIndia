//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const Notification = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri:'https://previews.123rf.com/images/lkeskinen/lkeskinen1707/lkeskinen170702649/81521226-cartoon-image-of-notification-icon-bell-symbol.jpg'}}
                style={{width:200,height:300,marginTop:-90}}
                resizeMode='contain'
            />
            <Text style={{fontWeight:'bold',color:COLORS.gray,fontSize:16,fontFamily:'Bitter_Bold',textTransform:'uppercase'}}>Sorry you don't have Notification yet !!!!</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default Notification;
