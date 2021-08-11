import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';

import {FontAwesome5} from 'react-native-vector-icons' 

const shadowButtonStyle ={
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  };
class Product extends Component {
    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
        {this.props.navigation.navigate('Checkout')}
    }
    render() {
        const { product,navigation } = this.props;
            return (
        <View style={styles.container}>
            <Image source={{ uri:product.image}} style={{width:'50%',height:100}} resizeMode='contain'/>
            <View style={styles.productDes}>
                <Text style={{fontWeight:'bold',fontSize:16}}>{product.itemname}</Text>
               
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:8}}>
                
                <Text style={{fontWeight:'bold',color:'#eb4034',fontSize:13}}>
                    <FontAwesome5 name='rupee-sign' size={11} color='#eb4034'/>
                    &nbsp;{(product.price).toFixed(2)}
                </Text>
                
                <TouchableOpacity onPress={this.addToCart} 
                style={[styles.addBtn,shadowButtonStyle]}>
                   <FontAwesome5 name='shopping-cart' size={20} color={'#228b22'}/>
                </TouchableOpacity>
                
                
                </View>
               
            </View>
        </View>
    );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        margin: 8,
        backgroundColor:'#fff',
        elevation:1,
        borderRadius:10,
        padding:10
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 10,
        margin: 10,
       width:50,
       height:40,
       borderRadius:8,
        backgroundColor:'#fff',
        elevation:3,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: '#000',
        fontSize: 16,
        padding: 10
    }
});

export default Product;
