import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const Horoscope = ({route,navigation}) => {
    const [data,setData]=useState([]);
    const [na,setNa]=useState([]);
    const [isLoading,setLoading]=useState(true);
    useEffect(() => {
        let {item} = route.params;
        setNa(item)
        const name =item.name;
        const URL = `https://aztro.sameerkumar.website/?sign=${name}&day=today`;
        fetch(URL, {
            method: 'POST'
        }).then(response => response.json())
        .then(json => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false)
        )
        .finally(setLoading.bind(undefined, false));
      }, [])
    return (
        <ScrollView style={{flex:1}}>
        {isLoading ? <ActivityIndicator size="large" color={COLORS.main} />:
        <View style={styles.container}>
            <View  style={{width:140,height:140,borderRadius:70,borderWidth:2,borderColor:'gray',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                <Image
                    source={{uri:na.img}}
                    resizeMode='contain'
                    style={{width:100,height:100,borderRadius:50}}
                />
            </View>
                     
            <Text style={[styles.mtext,{textAlign:'center'}]}>Today's Horoscope for Moon Sign : {na.name}{' '}{na.symbol}</Text>
            <View style={[styles.bCon,{paddingHorizontal:25}]}>
                <Text style={[styles.mtext,{fontSize:16,color:COLORS.bgcolor,textTransform:'capitalize'}]}>Today:{' '} </Text>
                <Text style={styles.btext}>{data.current_date} </Text>
            </View>
            <View style={{flex:1,margin:6,backgroundColor:'#fff',borderRadius:10}}>
                <Text style={[styles.btext,{padding:14,color:'black',fontWeight:'800'}]}>{data.description} </Text>
                <View style={[{paddingHorizontal:10,marginTop:-15}]}>
                    <View>
                        <Text style={[styles.mtext,{fontSize:16,color:COLORS.gray,textTransform:'capitalize'}]}>Lucky Number{' '} </Text>
                        <Text style={[styles.btext,{textAlign:'left',marginTop:-8,marginBottom:5}]}>{data.lucky_number} </Text>
                    </View>
                    <View style={[{marginTop:-15}]}>
                        <Text style={[styles.mtext,{fontSize:16,color:COLORS.gray,textTransform:'capitalize'}]}>Compatibility{' '} </Text>
                        <Text style={[styles.btext,{textAlign:'left',marginTop:-8}]}>{data.compatibility} </Text>
                    </View>
                </View>
            </View>
            <View style={{flex:1,margin:10,backgroundColor:'#fff',borderRadius:10,borderWidth:1,borderColor:COLORS.gray}}>
            <Text style={[styles.mtext,{textAlign:'center',textTransform:'capitalize',fontFamily:'Bitter_Bold'}]}>Today's Auspicious</Text>
            <View style={styles.bCon}>
                <Text style={[styles.mtext,{fontSize:16,textTransform:'capitalize'}]}>Lucky Time:{' '} </Text>
                <Text style={styles.btext}>{data.lucky_time} </Text>
            </View>
            <View style={styles.bCon}>
                <Text style={[styles.mtext,{fontSize:16,textTransform:'capitalize'}]}>Color:{' '} </Text>
                    <Text style={styles.btext}>{data.color} </Text>
                      </View>
            </View>
            
        </View>
        }
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    padding:15,
    backgroundColor:'#fcfcfc'
    },
    mtext:{
        fontSize:18,fontWeight:'bold',
        color:COLORS.gray,paddingVertical:10,
        textTransform:'uppercase'
    },
    btext:{fontSize:14,
        fontWeight:'200',color:'gray',
        textTransform:'capitalize'},
    bCon:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}
});
//make this component available to the app
export default Horoscope;

