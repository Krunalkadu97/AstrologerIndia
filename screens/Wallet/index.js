import React,{useState} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,FlatList,Dimensions, ScrollView} from 'react-native'
import {FontAwesome5,Ionicons} from 'react-native-vector-icons'
import { COLORS } from './../../constants/theme';
const Wallet = ({navigation}) => {
    

    const historyData = [
        {
            id:1,
            paid:'Acharya Krunal',
            price:'285',
            time:'20 min',
            from:'UPI',
            details:[
                {
                    pid:1,
                    txid:'PT123456',
                    paid:'Acharya Krunal',
                    price:'285',
                    accno:123456789,
                    utr:123456,
                    cashback:0
                }
            ]
        },
        {
            id:2,
            paid:'Acharya Nikhil',
            price:'355',
            time:'30 min',
            from:'BOI',
            details:[
                {
                    pid:2,
                    txid:'PT654321',
                    paid:'Acharya Nikhil',
                    price:'355',
                    accno:123456789,
                    utr:123456,
                    cashback:50
                }
            ]
        }
    ]
    function renderHeader(){
        return(
            <View style={{margin:5,backgroundColor:'#f5efeb',elevation:5,justifyContent:'space-between',paddingHorizontal:20,padding:10,height:70}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:COLORS.gray}}>Wallet Balance</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <FontAwesome5 name='rupee-sign' size={15} color='#000'/>
                     <Text style={{fontSize:16,color:'#59534f',marginLeft:20}}>0.00</Text></View>
            </View>
        )
    }
     

function renderFooter(){
    return(
        <View style={{padding:20,margin:10,elevation:4,backgroundColor:'#f5efeb',marginTop:20}}>
            <Text style={{fontWeight:'300',fontSize:13,textAlign:'center'}}>Your Recharge pack can be used for multiple Astro</Text>
            <Text style={{fontWeight:'bold',fontSize:18,textAlign:'center',color:COLORS.gray,paddingVertical:4}}>Add Money to wallet</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('AddMoney')}}
            style={{marginHorizontal:10,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',height:40,margin:5,borderRadius:10}}>
                <Text style={{fontWeight:'bold',color:'#eb4034',fontSize:16}}>Proceed To Add Money </Text>
            </TouchableOpacity>
        </View>
    )
}
function renderHistory(){
    const renderItem = ({item}) => (
        <View >            
            <TouchableOpacity onPress={()=>{navigation.navigate('Transaction',{item})}}
            style={{marginHorizontal:10,marginVertical:5,marginTop:-3,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',height:80,borderRadius:10,}}>
               
               <View style={{flexDirection:'row',width:'100%',height:'65%'}}>
                <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                    <Ionicons name='trending-up-outline' size={30} color='#eb4034'/>
                </View>
                <View style={{margin:5,flex:0.6,padding:10,justifyContent:'space-between',paddingVertical:10}}>
                    <Text>Paid to</Text>
                    <Text>{item.paid}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                        <FontAwesome5 name='rupee-sign' size={11} color='#000'/>
                        <Text style={{fontSize:16,color:'#59534f',marginLeft:5}}>{item.price}</Text>
                     </View>
               </View>
               <View style={{width:'100%',height:'35%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,padding:5}}>
                    <Text style={{color:'grey'}}>{item.time} ago</Text>
                    <Text style={{color:'grey',marginRight:5}}>{item.from}</Text>
               </View>
            </TouchableOpacity>
        </View>
    )
    return(
        <View style={{flex:1,padding:5}}>
        <Text style={{fontWeight:'300',fontSize:20,margin:10,marginLeft:20}}>Payment History</Text>
                <FlatList
                    data={historyData}
                    keyExtractor={item=>`${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{justifyContent:'space-between'}}
                    numColumns={1}
                />
        </View>
    )
}

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1}}>
                {renderHeader()}
                {renderFooter()}
                {renderHistory()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Wallet

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        width:30,
        height:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
       backgroundColor:'#f9f9f9',
       elevation:8
    },

})