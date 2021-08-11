//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet ,TextInput} from 'react-native';
import {FontAwesome} from 'react-native-vector-icons'

import HeaderBar from '../../components/HeaderBar';
import LinearButton from '../../components/Button/LongButton';
import { COLORS } from './../../constants/theme';
// create a component
const AddMonney = ({navigation}) => {
    const [amount,setAmount]=useState();
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Add Money' onPress={()=>navigation.goBack()}/>
            <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.gray,paddingVertical:8,paddingLeft:15}}>Add Money to Walley</Text>
            <Text style={{fontSize:14,fontWeight:'bold',color:COLORS.bgcolor,paddingVertical:8,paddingLeft:15,backgroundColor:'#f5efeb',margin:10}}>Add min Rs. 500 to win Flat Cahsback.Rs.50 T&C</Text>
            <View style={{
                flexDirection:'row',
                margin:10,
                borderBottomColor:COLORS.gray,
                        borderBottomWidth:1,
                        height:40,
                        alignItems:'center',
                        marginHorizontal:20
            }}>
            <View style={{
                width:40,
                height:'100%',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <FontAwesome name='rupee' color='blue' size={15}/>
            </View>
                <TextInput
                    labelValue={amount}
                    onChangeText={(userAmount)=>setAmount(userAmount)}
                    placeholder='Enter Amount'
                    placeholderTextColor={COLORS.gray}
                    numeric 
                    keyboardType={'numeric'}
                    style={{
                        fontSize:16,
                        fontWeight:'bold',
                        height:'100%',
                        width:'100%'
                    }}
                />
              
            </View>
            <View style={{
                position:'absolute',
                bottom:20,
                flex:1,
                width:'100%'
            }}>
                <LinearButton buttonTitle='Pay' onPress={()=>navigation.navigate('Card',{amount})}/>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:35
    },
});

//make this component available to the app
export default AddMonney;
