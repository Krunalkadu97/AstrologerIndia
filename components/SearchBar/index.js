//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import {Ionicons} from 'react-native-vector-icons'

// create a component
const SearchBar = ({term,onTermChange,onTermSubmit}) => {
    return (
        <View style={styles.SearchBox}>
                <View style={styles.iconBox}> 
                    <Ionicons name='search' color='gray' size={25}/>
                </View>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Serach Products'
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onTermSubmit}
                    style={{
                        flex:1,
                        height:'100%',
                        fontSize:18
                    }}
                />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    SearchBox:{
        flexDirection:'row',
        backgroundColor:'white',
        height:50,
        borderWidth:1,
        borderColor:'black',
        marginHorizontal:10,
        borderRadius:5
    },
    iconBox:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
});

//make this component available to the app
export default SearchBar;
