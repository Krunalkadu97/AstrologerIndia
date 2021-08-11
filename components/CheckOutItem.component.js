import React, { Component } from 'react';

import {
	View,
	Text,
	FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons'
import CartItems  from './CartItem.component';
import CustomerForm from './CustomerForm.component';

class CheckoutItems extends Component {  
  render() {
  	const { cartItems, navigation, cartTotal } = this.props;
    return (
      <View style={styles.container}>
            <ScrollView style={{flex:1}}>
            		<View style={styles.annouc}>
            			<Text style={styles.anncText}>Please confirm your order and checkout your cart.</Text>
            		</View>
            		<View style={styles.ckitems}>
            		<FlatList 
                  data={cartItems}
            			renderItem={({item, index}) => <CartItems item={item} index={index} />}
            			keyExtractor={(item) => item.id}
            			ItemSeparatorComponent= {()=> <View style={{height:0.3, backgroundColor:'#34495e90',marginBottom:2}}/> }
            		/>
                          		
            		</View>
                <View style={{
                    padding:10,
                    justifyContent:'space-between',
                    alignItems:'center',
                    flexDirection:'row',
                    backgroundColor:'tomato',
                    marginHorizontal:40,
                    marginTop:5,
                    paddingHorizontal:20,
                    marginTop:-15,
                    elevation:5
                  }}>
                  <Text style={{color:'#fff',fontWeight:'bold',paddingRight:40}}>Total:</Text>
                  <Text style={styles.text}> <FontAwesome5 name='rupee-sign' size={11} color='#000'/> {(cartTotal).toFixed(2)}</Text>	
                  </View>    
                <View>
                  <TouchableOpacity
                  style={{
                    padding:10,
                    justifyContent:'center',
                    alignItems:'center',
                    margin:10,
                    borderRadius:10,
                    width:Dimensions.get('screen').width*0.5,
                    height:40,
                    backgroundColor:'#fff',
                    elevation:2,
                    marginTop:15,
                    marginHorizontal:Dimensions.get('screen').width*0.22
                  }}
                  onPress={()=>navigation.navigate('Products')}>
                    <Text>Continue Shopping</Text>
                  </TouchableOpacity>
                </View>
            		<View style={styles.custForm}>
                  <ScrollView>
            			 <CustomerForm navigation={navigation}/>
                  </ScrollView> 
            		</View>
          </ScrollView>	
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#f2f2f2'
  },
  custForm: {
    flex: 1
  },
  ckitems: {
    flex:1,
    backgroundColor:'#fff',
    marginHorizontal:10,
    borderRadius:10,
    padding:10
  },
    annouc:{
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#fff',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10,
      elevation:1
    },
    text: {
      textAlign: 'center',
      color: '#fff'
    },
    anncText:{
        textAlign: 'center',
        color: '#000'  
    }
});

export default CheckoutItems;