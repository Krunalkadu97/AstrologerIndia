//import liraries
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const Preview = ({route,navigation}) => {
    const [review,setReview]=useState('');
    
    useEffect(()=>{
        let {review} = route.params;

        setReview(review);
    },[])
    return (
        <ScrollView style={styles.container}>
           {
               review ? <View style={[styles.container,{paddingTop:15}]}>
                    <Text style={{fontWeight:'bold',textAlign:'right',paddingRight:20,fontSize:16}}>Total Review -: {review.length}</Text>
                    {
                        review.map((item,index)=>(
                            <View style={{flex:1,padding:10,borderRadius:5,borderWidth:0.2,borderColor:COLORS.bgcolor,margin:2,marginHorizontal:15}} key={index}>
                                                    <Text style={{fontWeight:'bold'}}>{item.comment} </Text>
                                                    <Text style={{fontWeight:'900',color:COLORS.gray}}> Author : {item.first_name}{' '}{item.last_name}</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                        <Text style={{fontWeight:'900',color:COLORS.bgcolor}}>Rating : {item.rating}/5</Text>
                                                        <Text style={{fontWeight:'900',color:COLORS.gray}}>Date : {item.date}</Text>
                                                    </View>
                                                    
                            </View>
                        ))
                    }
               </View>:<View/>
           }
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default Preview;
