import React from 'react'

import {View,SafeAreaView,ScrollView,StyleSheet,Text,Dimensions,Image,TouchableOpacity} from 'react-native'
import {Ionicons,FontAwesome5,Fontisto,AntDesign} from 'react-native-vector-icons'

const Transaction = ({route,navigation}) => {
    const [transaction,setTransaction] = React.useState(null);
  
    React.useEffect(()=>{
        let {item} = route.params;

        setTransaction(item)
    })
    function renderTransactionId(){
        return(
            <ScrollView
            snapToAlignment={'center'}>
                {
                    transaction?.details.map((item,index)=>(
                        <View style={{flex:1}}>
                            <View style={{margin:5,backgroundColor:'#f7f7f7',elevation:5,padding:20,justifyContent:'space-between'}}>
                                <Text>Transaction ID:</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                                <Text>{item.txid}</Text>
                                <TouchableOpacity>
                                    <Text>Copy</Text>
                                </TouchableOpacity>
                                </View>
                                
                            </View>
                            <View style={{margin:5,backgroundColor:'#f7f7f7',elevation:5,padding:20,justifyContent:'space-between'}}>
                                <Text>Paid to:</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                                <Ionicons name='trending-up-outline' size={30} color='#eb4034'/>
                                <Text>{item.paid}</Text>
                                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                    <FontAwesome5 name='rupee-sign' size={18} color='#000'/>
                                    <Text style={{fontSize:22,color:'#59534f',marginLeft:20}}>{item.price}</Text>
                                </View>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                                   <TouchableOpacity>
                                     <Text style={{color:'#59534f',margin:5}}>Pay Again</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity>
                                         <Text  style={{color:'#59534f',margin:5}}>Share</Text>
                                   </TouchableOpacity>  
                                    
                                </View>
                            </View>
                            <View style={{margin:5,backgroundColor:'#f7f7f7',elevation:5,padding:20,justifyContent:'space-between'}}>
                                <Text>Debited From</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                                    <Ionicons name='trending-up-outline' size={30} color='#eb4034'/>
                                    <View style={{justifyContent:'space-between'}}>
                                        <Text>Acc.No. - {item.accno}</Text>
                                        <Text>UTR- {item.utr}</Text>
                                    </View>
                                   
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                        <FontAwesome5 name='rupee-sign' size={18} color='#000'/>
                                        <Text style={{fontSize:22,color:'#59534f',marginLeft:20}}>{item.price}</Text>
                                    </View>
                                </View>
                                <Text style={{marginTop:8}}>Cash Back / Wallet - {item.cashback} Rs.</Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        )
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                {renderTransactionId()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Transaction;