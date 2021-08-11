//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from './../../constants/theme';
import { FontAwesome } from 'react-native-vector-icons'
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
// create a component
const CheckOut = ({ navigation, route }) => {
    const [press, setPress] = useState(false);
    const [user, setUser] = useState('');
    const [order, setorder] = useState('');
    const [addrs, setAddrs] = useState('');
    const [selectedSlot, setSelectedSlot] = useState();
    const userInfo = useSelector(state => state.users);
    const [loading, setLoading] = useState(true);
    const [slot, setSlot] = useState('');

    const getUser = () => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("app_id", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setUser(result.data)
                } else {
                    setUser('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    };
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
    const getDelivery = () => {
        const myHeadersds = new Headers();
        myHeadersds.append("type", "1");

        const requestOptionsds = {
            method: 'GET',
            headers: myHeadersds,                     
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/get_delivery_time_slot", requestOptionsds)
        .then(response => response.json())
        .then(result => {
            if (result.responce === true) {
                setSlot(result.data)
            } else {
                setSlot('')
            }
        })
        .catch(error => console.log('error', error));
    }
    useEffect(() => {
        let { item } = route.params;
        setAddrs(item);
        getUser();
        getOrder();
        getDelivery();
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => setPress(!press)} style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.gray,
                    marginVertical: 10, paddingHorizontal: 10, marginHorizontal: 25
                }}>
                    <Text style={{
                        fontWeight: 'bold', fontSize: 18,
                        paddingVertical: 10, color: COLORS.gray,
                        textTransform: 'capitalize'
                    }}>Address Details</Text>
                    {
                        press ?
                            <FontAwesome name='angle-up' color={'green'} size={25} /> :
                            <FontAwesome name='angle-down' color={COLORS.bgcolor} size={25} />
                    }
                </TouchableOpacity>
                {
                    press ?
                        <View style={{ padding: 10, marginHorizontal: 20, borderWidth: 0.3, borderRadius: 15, paddingLeft: 20, borderColor: COLORS.gray, margin: 10 }}>
                            <Text style={{ fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: COLORS.gray, width: '40%', paddingLeft: 1 }}>Personal Details</Text>
                            {
                                user ? <View>
                                    {
                                        user.map((item, index) => (
                                            <View>
                                                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.first_name}{' '}{item.last_name}</Text>
                                                <Text style={{ color: COLORS.gray, fontWeight: '800' }}>+91 {item.mobile}</Text>
                                                <Text style={{ color: COLORS.gray, fontWeight: '200' }}>{item.email}</Text>
                                            </View>
                                        ))
                                    }
                                </View> : <View />
                            }
                            <View style={styles.sep} />
                            <Text style={{ fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: COLORS.gray, width: '35%', paddingLeft: 1 }}>Address Details</Text>
                            <Text>{addrs.address},{' '}{addrs.address_2},{' '}{addrs.city_id},{' '}{addrs.district_id}</Text>
                            <Text>{addrs.state_id},{' '}{addrs.postcode},{' '}{addrs.country_id}</Text>
                        </View> : <View />

                }


                <Text style={{
                    fontWeight: 'bold', fontSize: 18,
                    paddingVertical: 10, color: COLORS.gray, borderBottomWidth: 1, borderBottomColor: COLORS.bgcolor, marginHorizontal: 30,
                    textTransform: 'capitalize'
                }}>Select Delivery Slot</Text>
                {
                    slot ? <View style={{ height: 40, borderRadius: 5, marginHorizontal: 30, borderWidth: 1, borderColor: COLORS.gray, marginVertical: 10, justifyContent: 'center' }}>
                    <Picker
                        selectedValue={selectedSlot}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedSlot(itemValue)
                        }>
                        {
                            slot.map((item,index)=>(
                                <Picker.Item label={`${item.slote_time},${item.type}`} value={`${item.slote_time},${item.type}`} />
                            ))
                        }
                       
                    </Picker>
                </View>:
                <View style={{ height: 40, borderRadius: 5, marginHorizontal: 30, borderWidth: 1, borderColor: COLORS.gray, marginVertical: 10, justifyContent: 'center' }}>
                    <Text> No Slot Available</Text>
                </View>
                }
                
                <Text style={{
                    fontWeight: 'bold', fontSize: 18,
                    paddingVertical: 10, color: COLORS.gray, borderBottomWidth: 1, borderBottomColor: COLORS.bgcolor, marginHorizontal: 30,
                    textTransform: 'capitalize'
                }}>Order Summary</Text>
                <View style={{
                    padding: 10, marginHorizontal: 20,
                    borderWidth: 0.3, borderRadius: 15, paddingLeft: 20,
                    borderColor: COLORS.gray, margin: 10
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '900', color: COLORS.gray }}>Cart Amount</Text>
                        <Text style={{ fontWeight: '900', color: COLORS.gray }}>Rs.{order.ordertotal}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '900', color: COLORS.gray }}>Cart Quantity</Text>
                        <Text style={{ fontWeight: '900', color: COLORS.black }}>{order.totqty}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '900', color: COLORS.gray }}>Delivery Charges</Text>
                        <Text style={{ fontWeight: '900', color: COLORS.gray }}>Rs.{order.charge}</Text>
                    </View>
                    <View style={styles.sep} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Total Payment</Text>
                        <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Rs.{order.totalprices}</Text>
                    </View>
                    <View >


                    </View>
                </View>

                <View style={{ height: 100, justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        height: 40, marginHorizontal: 30,
                        justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.gray,
                        borderRadius: 15
                    }}
                        onPress={() => navigation.navigate('Payment', { Address: addrs, time: selectedSlot, user: user })}>
                        <LinearGradient
                            style={styles.innerBox}
                            colors={[COLORS.gray, '#dcdcdc']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>Check Out</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.gray,
        marginVertical: 10
    },
    innerBox: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
});

//make this component available to the app
export default CheckOut;
