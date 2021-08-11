//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const Consultation = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJ-rnSWyRaIHqpsIrW-SreRrRyMtVeO8JDA&usqp=CAU'}}
                style={{width:'100%',height:300}}
                resizeMode='contain'
            />
            <Text style={{fontWeight:'bold',fontSize:22,color:COLORS.bgcolor,paddingVertical:10,textAlign:'center'}}>No Consultation history yet...!</Text>
            <Text style={{fontWeight:'600',fontSize:16,color:COLORS.gray,paddingVertical:10,textAlign:'center'}}>Let's start your first consultation.</Text>
            <Text style={{fontWeight:'600',fontSize:16,color:COLORS.bgcolor,marginTop:-10,textAlign:'center'}}>@AstrologerIndia</Text>
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
export default Consultation;
