//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,Linking,ScrollView ,TouchableOpacity,Image,Alert} from 'react-native';
import {Ionicons,FontAwesome} from 'react-native-vector-icons'

import HeaderBar from '../../components/HeaderBar';
import LinearButton from '../../components/Button/LongButton';
import { COLORS } from './../../constants/theme';

// create a component
const Card = ({route,navigation}) => {
    const [amount,setAmount]=useState(null);
    const [show,setShow]=useState(null);
    const [showup,setShowUp]=useState(null);
    const [showne,setShowNe]=useState(null);
    const [token,setToken]=useState(null);
    const [loading,setLoading]=useState(false);
    const [paymentState, setPaymentState] = useState({ Status: '', txnId: '', GOOGLE_PAY: 'GOOGLE_PAY', PHONEPE: 'PHONEPE', PAYTM: 'PAYTM', message: '', });

    React.useEffect(()=>{
        let{amount} = route.params;
        setAmount(amount);
    })

    
    
   
    return (
        <ScrollView style={styles.container}>
            <HeaderBar titleText='Payment' onPress={()=>navigation.goBack()}/>
            <Text style={styles.htext}>Payment Details</Text>
            <View style={{padding:20}}>
                <View style={styles.blo}>
                    <Text>Amount</Text>
                    <Text>Rs. {amount}.00</Text>
                </View>
                <View style={styles.blo}>
                    <Text>GST @ 18%</Text>
                    <Text>Rs. 00.00</Text>
                </View>
                <View style={styles.seperator}/>
                <View style={styles.blo}>
                    <Text>Total Amount</Text>
                    <Text>Rs. {amount}.00</Text>
                </View>
            </View>
            <Text style={styles.htext}>Payment Options Available</Text>
            <View style={{margin:10,padding:10}}>
            <View style={styles.seperator}/>
            <TouchableOpacity style={styles.boxCon} onPress={()=>{setShow(!show);setShowUp(false)}}>
            {
                show ?
                <FontAwesome name='check-circle' color={COLORS.bgcolor} size={20}/>:
                <FontAwesome name='circle-o' color={COLORS.gray} size={20}/>
                }
                <View style={{paddingLeft:12,flex:1}}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.gray}}>Card Payment</Text>
                </View>
                <View style={{width:30}}>
                {
                show ?
                <FontAwesome name='chevron-up' color={COLORS.black} size={18}/>:
                <FontAwesome name='chevron-right' color={COLORS.gray} size={18}/>
                }
                </View>
            </TouchableOpacity>
            {
                show ? (
                    <View style={{padding:10,borderRadius:5,borderWidth:1,margin:10}}>
                        <LinearButton buttonTitle='Card Details' onPress={()=>{}}/>
                        <View style={styles.token}>
                                { token &&
                                <View style={{ display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    <Text style={styles.tokenLabel}>Token: {token?.tokenId}</Text>
                                    <LinearButton
                                    buttonTitle="Make Payment"
                                    onPress={()=>{}}
                                    />      
                                </View>
                                }
                        </View>
                    </View>
                ):null
            }
            <View style={styles.seperator}/>
            <TouchableOpacity style={styles.boxCon} onPress={()=>{setShowUp(!showup);setShow(false)}}>
            {
                showup ?
                <FontAwesome name='check-circle' color={COLORS.bgcolor} size={20}/>:
                <FontAwesome name='circle-o' color={COLORS.gray} size={20}/>
                }
                <View style={{paddingLeft:12,flex:1}}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.gray}}>UPI Payment</Text>
                </View>
                <View style={{width:30}}>
                {
                showup ?
                <FontAwesome name='chevron-up' color={COLORS.black} size={18}/>:
                <FontAwesome name='chevron-right' color={COLORS.gray} size={18}/>
                }
                </View>
            </TouchableOpacity>
            {
                showup ? ( 
                    <View>


                    <View style={{padding:10,borderRadius:5,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                        <TouchableOpacity style={styles.IBox} onPress={() => {}}>
                            <Image
                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEzkTyeVIBLV77hXNWBK5NVT7tKPyEMZMRMaHAtT8S4bfaLVHGMBH3j-m1VYdfB1nPCc&usqp=CAU'}}
                            resizeMode='contain'
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    borderRadius:25,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.IBox} onPress={() => {}}>
                            <Image
                            source={{uri:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202011/Screenshot_2020-11-05_at_5.14._1200x768.png?qbPeEkmH2KWK1YfUw65UmVr8EjYDRPgb&size=770:433'}}
                            resizeMode='center'
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    borderRadius:25,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.IBox} onPress={() => {}}>
                            <Image
                            source={{uri:'https://www.searchpng.com/wp-content/uploads/2018/11/phone-pe.png'}}
                            resizeMode='cover'
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    borderRadius:25,
                                }}
                            />
                        </TouchableOpacity>
                       
                    </View>
                    </View>
                ):null
            }
            <View style={styles.seperator}/>
           
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:35
    },
    seperator:{
        height:1,
        backgroundColor:'gray',
        marginHorizontal:1
    },
    boxCon:{
        flexDirection:'row',
        paddingVertical:4,
        alignItems:'center',
        paddingHorizontal:18,
        paddingBottom:15
    },
    circle:{
        width:16,
        height:16,
        borderRadius:8,
        backgroundColor:'green'
    },
    IBox:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth:1
    },
    blo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    paddingVertical:6
},
htext:{
    fontSize:18,fontWeight:'bold',
    color:COLORS.gray,paddingVertical:8,
    paddingLeft:15,backgroundColor:COLORS.msgBg,
    textAlign:'center',margin:10,marginBottom:15
}
});

//make this component available to the app
export default Card;
