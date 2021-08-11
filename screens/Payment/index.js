//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons'
import { useSelector } from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import LinearButton from '../../components/Button/LongButton';
import { COLORS } from './../../constants/theme';

// create a component
const Payment = ({ route, navigation }) => {
    const [address, setAddress] = useState('');
    const [slot, setSlot] = useState('');
    const [users, setUsers] = useState('');
    const [order, setorder] = useState('');
    const [show, setShow] = useState(null);
    const [showup, setShowUp] = useState(null);
    const userInfo = useSelector(state => state.users);
    const per = users[0];
    const add=`${address.address},${address.address_2}`
    
    const getOrder = () => {
        const myHeaderso = new Headers();
        myHeaderso.append("type", "1");


        const formdatao = new FormData();
        formdatao.append("user_id", userInfo);
        formdatao.append("coupon", "0");
        formdatao.append("coupon_id", "0");
        formdatao.append("coupon_name", "");

        const requestOptionso = {
            method: 'POST',
            headers: myHeaderso,
            body: formdatao,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/get_order_amount", requestOptionso)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setorder(result.data)
                } else {
                    setorder('')
                }
            })
            .catch(error => console.log('error', error));
    }

    React.useEffect(() => {
        let { Address, time, user } = route.params;
        setAddress(Address);
        setSlot(time);
        setUsers(user);
        getOrder();
    }, [navigation])

    const placeOrder = (type) => {
        if (type === 'Cash On Delivery') {
            const myHeadersp = new Headers();
            myHeadersp.append("type", "1");
           
            const formdatap = new FormData();
            formdatap.append("user_id", userInfo);
            formdatap.append("fname", per.first_name);
            formdatap.append("lname", per.last_name);
            formdatap.append("telephone", per.mobile);
            formdatap.append("email", per.email);
            formdatap.append("address1", add);
            formdatap.append("city_id", address.city_id);
            formdatap.append("district",address.district_id);
            formdatap.append("state_id", address.state_id);
            formdatap.append("postcode", address.postcode);
            formdatap.append("payment_group", "Cash On Delivery");
            formdatap.append("coupon", "0");
            formdatap.append("total_price", order.totalprices);
            formdatap.append("time_slot", slot);
            formdatap.append("coupon_id", "0");
            formdatap.append("coupon_name", "");
            formdatap.append("shipping", order.charge);

            const requestOptionsp = {
                method: 'POST',
                headers: myHeadersp,
                body: formdatap,
                redirect: 'follow'
            };

            fetch("https://www.srpulses.com/astroger/Api/placed_order", requestOptionsp)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                    navigation.replace('OrderP');
                    
                } else {
                    alert(responseJson.massage);                    
                }
            })
            .catch(error => console.log('error', error));           

           
        } else {
            const myHeadersp = new Headers();
            myHeadersp.append("type", "1");
           
            const formdatap = new FormData();
            formdatap.append("user_id", userInfo);
            formdatap.append("fname", per.first_name);
            formdatap.append("lname", per.last_name);
            formdatap.append("telephone", per.mobile);
            formdatap.append("email", per.email);
            formdatap.append("address1", add);
            formdatap.append("city_id", address.city_id);
            formdatap.append("district",address.district_id);
            formdatap.append("state_id", address.state_id);
            formdatap.append("postcode", address.postcode);
            formdatap.append("payment_group", "Online ");
            formdatap.append("coupon", "0");
            formdatap.append("total_price", order.totalprices);
            formdatap.append("time_slot", slot);
            formdatap.append("coupon_id", "0");
            formdatap.append("coupon_name", "");
            formdatap.append("shipping", order.charge);

            const requestOptionsp = {
                method: 'POST',
                headers: myHeadersp,
                body: formdatap,
                redirect: 'follow'
            };

            fetch("https://www.srpulses.com/astroger/Api/placed_order", requestOptionsp)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                    navigation.replace('OrderP');
                    
                } else {
                    alert(responseJson.massage);                    
                }
            })
            .catch(error => console.log('error', error)); 
        }

    }


    return (
        <ScrollView style={styles.container}>
            <HeaderBar titleText='Payment' onPress={() => navigation.goBack()} />
            <Text style={styles.htext}>Payment Details</Text>
            <View style={{ padding: 20 }}>
                <View style={styles.blo}>
                    <Text>Cart Total</Text>
                    <Text>Rs. {order.ordertotal}</Text>
                </View>
                <View style={styles.blo}>
                    <Text>Delivery Charge</Text>
                    <Text>Rs. {order.charge}</Text>
                </View>
                <View style={styles.seperator} />
                <View style={styles.blo}>
                    <Text>Total Amount</Text>
                    <Text>Rs. {order.totalprices}</Text>
                </View>
            </View>
            <Text style={styles.htext}>Payment Options Available</Text>
            <View style={{ margin: 10, padding: 10 }}>
                <View style={styles.seperator} />
                <TouchableOpacity style={styles.boxCon} onPress={() => { setShow(!show); setShowUp(false) }}>
                    {
                        show ?
                            <FontAwesome name='check-circle' color={COLORS.bgcolor} size={20} /> :
                            <FontAwesome name='circle-o' color={COLORS.gray} size={20} />
                    }
                    <View style={{ paddingLeft: 12, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.gray }}>Cash on Delivery </Text>
                    </View>
                    <View style={{ width: 30 }}>
                        {
                            show ?
                                <FontAwesome name='chevron-up' color={COLORS.black} size={18} /> :
                                <FontAwesome name='chevron-right' color={COLORS.gray} size={18} />
                        }
                    </View>
                </TouchableOpacity>
                {
                    show ? (
                        <View style={{ padding: 10, borderRadius: 5, borderWidth: 1, margin: 10 }}>
                            <LinearButton buttonTitle='Pay' onPress={() => placeOrder('Cash On Delivery')} />
                            
                        </View>
                    ) : null
                }
                <View style={styles.seperator} />
                <TouchableOpacity style={styles.boxCon} onPress={() => { setShowUp(!showup); setShow(false) }}>
                    {
                        showup ?
                            <FontAwesome name='check-circle' color={COLORS.bgcolor} size={20} /> :
                            <FontAwesome name='circle-o' color={COLORS.gray} size={20} />
                    }
                    <View style={{ paddingLeft: 12, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.gray }}>UPI Payment</Text>
                    </View>
                    <View style={{ width: 30 }}>
                        {
                            showup ?
                                <FontAwesome name='chevron-up' color={COLORS.black} size={18} /> :
                                <FontAwesome name='chevron-right' color={COLORS.gray} size={18} />
                        }
                    </View>
                </TouchableOpacity>
                {
                    showup ? (
                        <View>


                            <View style={{ padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <TouchableOpacity style={styles.IBox} onPress={() => placeOrder('Online')}>
                                    <Image
                                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEzkTyeVIBLV77hXNWBK5NVT7tKPyEMZMRMaHAtT8S4bfaLVHGMBH3j-m1VYdfB1nPCc&usqp=CAU' }}
                                        resizeMode='contain'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 25,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IBox} onPress={() => placeOrder('Online')}>
                                    <Image
                                        source={{ uri: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202011/Screenshot_2020-11-05_at_5.14._1200x768.png?qbPeEkmH2KWK1YfUw65UmVr8EjYDRPgb&size=770:433' }}
                                        resizeMode='center'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 25,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IBox} onPress={() => placeOrder('Online')}>
                                    <Image
                                        source={{ uri: 'https://www.searchpng.com/wp-content/uploads/2018/11/phone-pe.png' }}
                                        resizeMode='cover'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 25,
                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ) : null
                }
                <View style={styles.seperator} />

            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 35
    },
    seperator: {
        height: 1,
        backgroundColor: 'gray',
        marginHorizontal: 1
    },
    boxCon: {
        flexDirection: 'row',
        paddingVertical: 4,
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingBottom: 15
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'green'
    },
    IBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1
    },
    blo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    htext: {
        fontSize: 18, fontWeight: 'bold',
        color: COLORS.gray, paddingVertical: 8,
        paddingLeft: 15, backgroundColor: COLORS.msgBg,
        textAlign: 'center', margin: 10, marginBottom: 15
    }
});

//make this component available to the app
export default Payment;

