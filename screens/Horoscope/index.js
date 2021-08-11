//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Zodiaclist } from '../../data/Zodiac';
// create a component
const ZodiacSign = ({navigation}) => {
    const renderItem=({item})=>(
        
        <TouchableOpacity style={{flex:1,margin:1,elevation:25,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',paddingVertical:15}}
        onPress={()=>navigation.navigate('Horoscope',{item})} key={item.id}>
            <Image
                style={{width:100,
                height:100,borderRadius:60}}
                source={{uri:item.img}}
                resizeMode='contain'
            />
            <Text style={{fontSize:14,fontWeight:'bold',color:'gray',paddingVertical:6,textTransform:'capitalize'}}>{item.name}{' '}{item.symbol}</Text>
        </TouchableOpacity>
    )
    return (
        <ScrollView>
            <View style={styles.container}>
                <FlatList
                    data={Zodiaclist}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:10
    },
});

export default ZodiacSign;
