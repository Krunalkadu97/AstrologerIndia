//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { COLORS } from './../../constants/theme';
import { FontAwesome, Ionicons } from 'react-native-vector-icons'
// create a component
const OrderDetails = ({ route, navigation }) => {
    const [order, setOrder] = useState('');
    const [isPay, setIsPay] = useState(false);
    const [isShip, setIsShip] = useState(false);
    useEffect(() => {
        let { item } = route.params;

        setOrder(item);
    }, [])
    return (
        <ScrollView style={styles.container}>
            <View style={{ padding: 10, marginHorizontal: 10, borderWidth: 0.4, borderColor: COLORS.gray, marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Transaction ID : </Text>
                    <Text style={{ color: COLORS.gray }}># {order.txn_id}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Order Date : </Text>
                    <Text style={{ color: COLORS.gray }}> {order.order_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Order Status : </Text>
                    <Text style={{ color: COLORS.gray }}> {order.order_status === '1' ? 'Pending' : 'Complete'}</Text>
                </View>
            </View>
            <View style={{ padding: 10, marginHorizontal: 15, borderWidth: 0.4, borderColor: COLORS.gray, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                <FontAwesome name='vcard' size={16} color={COLORS.black} />{' '}
                User Details :
                </Text>
                <Text style={{ color: COLORS.gray }}>
                    <FontAwesome name='user' size={15} color={COLORS.bgcolor} />{'  '}
                    {order.first_name}{' '}{order.last_name}
                </Text>
                <Text style={{ color: COLORS.gray }}>
                    <FontAwesome name='mobile' size={15} color={COLORS.bgcolor} />{'  '}
                    {order.mobile}
                </Text>
                <Text style={{ color: COLORS.gray }}>
                    <Ionicons name='mail' size={15} color={COLORS.bgcolor} />{'  '}
                    {order.email}
                </Text>
            </View>
            {
                isPay ?
                    <View style={{ padding: 10, marginHorizontal: 15, borderWidth: 0.4, borderColor: COLORS.gray, marginVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Order Summary :</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Order Date </Text>
                            <Text style={{ color: COLORS.gray }}> {order.order_date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Payment Mode </Text>
                            <Text style={{ color: COLORS.gray }}> {order.payment_mode}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Cart Price </Text>
                            <Text style={{ color: COLORS.gray }}> Rs. {order.item_price}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Total Items </Text>
                            <Text style={{ color: COLORS.gray }}> {order.item_qty}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Delivery Charges </Text>
                            <Text style={{ color: COLORS.gray }}>Rs. {order.delivery_fee}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Total Discount </Text>
                            <Text style={{ color: COLORS.gray }}>Rs. {order.discount}</Text>
                        </View>
                        <View style={{height:1,backgroundColor:COLORS.bgcolor,marginHorizontal:10,marginVertical:2}}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.bgcolor,fontSize:15 }}>Total Billing Amount </Text>
                            <Text style={{ color: COLORS.bgcolor,fontSize:15 }}>Rs. {order.total_price}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsPay(false)}>
                            <Text style={{ fontWeight: 'bold',color: COLORS.primary,fontSize:15,textAlign:'center',paddingTop:10 }}>View less</Text>
                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity onPress={() => setIsPay(true)}
                        style={{
                            padding: 10, marginHorizontal: 15, borderWidth: 0.4,
                            borderColor: COLORS.gray, marginVertical: 5, borderRadius: 10, flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center'
                        }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 16 }}>
                            <FontAwesome name='money' size={18} color={COLORS.black} />{' '}
                            Total Payment</Text>
                            <Text style={{ fontWeight: '500', color: COLORS.gray, fontSize: 14 }}>{order.item_qty} Items</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 13, marginRight: 15 }}>Rs. {order.total_price}</Text>
                            <FontAwesome name='caret-down' size={20} color={COLORS.black} />
                        </View>
                    </TouchableOpacity>
            }
            {
                isShip ? 
                <View style={{ padding: 10, marginHorizontal: 15, borderWidth: 0.4, borderColor: COLORS.gray, marginVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Shipping Details :</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>House Number </Text>
                            <View style={{ width:'80%',padding:10}}>
                                <Text style={{ color: COLORS.gray,width:'100%'}}> {order.address}</Text>
                            </View>
                            
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>City & District </Text>
                            <Text style={{ color: COLORS.gray }}> {order.city},{' '}{order.district},{' '}{order.state}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>pincode & Country </Text>
                            <Text style={{ color: COLORS.gray }}> {order.pincode},{' '}{order.country}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsShip(false)}>
                            <Text style={{ fontWeight: 'bold',color: COLORS.primary,fontSize:15,textAlign:'center',paddingTop:10 }}>View less</Text>
                        </TouchableOpacity>
                </View>:
                <TouchableOpacity onPress={() => setIsShip(true)}
                        style={{
                            padding: 10, marginHorizontal: 15, borderWidth: 0.4,
                            borderColor: COLORS.gray, marginVertical: 5, borderRadius: 10, flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center'
                        }}>
                      
                            <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 16 }}>
                            <FontAwesome name='truck' size={18} color={COLORS.black} />{' '}
                            Shipping Details</Text>
                     
                            <FontAwesome name='caret-down' size={20} color={COLORS.black} />
                        
                    </TouchableOpacity>
            }
            <View style={{
                            padding: 10, marginHorizontal: 15, borderWidth: 0.4,
                            borderColor: COLORS.gray, marginVertical: 5, borderRadius: 10, 
                            justifyContent: 'flex-start', alignItems: 'flex-start'
                        }}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.black, fontSize: 16 }}>
                            <Ionicons name='time' size={18} color={COLORS.black} />{' '}
                            Shipping Slot Selected</Text>
                            <Text style={{ color: COLORS.gray,fontSize:15,paddingVertical:10 }}> {order.time_slot}</Text>
            </View>

            <View>
                <TouchableOpacity style={{height:40,marginHorizontal:40,justifyContent:'center',
                alignItems:'center',backgroundColor:COLORS.bgcolor,borderRadius:15,marginVertical:15}}
                onPress={()=>navigation.navigate('Products')}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.white, fontSize: 16 }}>Back To Shop</Text>
                </TouchableOpacity>
            </View>
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
export default OrderDetails;
