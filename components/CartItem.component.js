import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import {Entypo,FontAwesome5} from 'react-native-vector-icons'

import { removeItem } from '../redux/actions/cartActions';

class CartItems extends Component {

    state = {
        activeRowKey: null
    }

    render() {
      
        const { item, index } = this.props;
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    
                    <View style={styles.productDes}>
                    <View style={{width:'30%'}}>
                    <Image
                        source={{uri:item.image}}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:10,
                        }}
                        resizeMode='contain'
                    />
                    </View>
                    
                    <View style={{width:'60%'}}>
                    <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>
                        <FontAwesome5 name='rupee-sign' size={11} color='#000'/>
                        &nbsp;
                         {(item.price).toFixed(2)}
                        </Text>
                    </View>
                        
                        <TouchableOpacity
                        onPress={() => { this.props.removeItem({index: this.props.index, item: this.props.item})}}
                        style={{marginLeft:-20}}>
                            <Entypo name='cross' size={14} color={'#000'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
    );
    }

}

const styles = StyleSheet.create({
    container:{
       width:Dimensions.get('screen').width,
        elevation:2,
        backgroundColor:'#fff',
        borderRadius:5
    },
    productDes: {
        flexDirection: 'row',       
        alignItems: 'center',       
       borderRadius:20,
       paddingHorizontal:20,
       width:'98%',
       margin:5
    },
    text: {
        fontSize: 12,
        padding: 6,
        textAlign:'center'
    }
});

export default connect(null,{removeItem})(CartItems);
