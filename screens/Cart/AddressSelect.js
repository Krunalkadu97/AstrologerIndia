//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from './../../constants/theme';
import { FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import Loader from '../Loader';
// create a component
const SelectAddress = ({ navigation }) => {
    const [aSelect, setASelect] = useState(false);
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [ship,setShip]= useState('');
  
    const userInfo = useSelector(state => state.users);

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

    const getAddress = () => {
        const myHeadersm = new Headers();
        myHeadersm.append("type", "1");

        const formdatam = new FormData();
        formdatam.append("user_id", userInfo);

        const requestOptionsm = {
            method: 'POST',
            headers: myHeadersm,
            body: formdatam,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/get_address", requestOptionsm)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setAddress(result.data)
                } else {
                    setAddress('')
                }
            })
            .catch(error => console.log('error', error));
    }

    const removeAdd = (e) => {
        const myHeadersre = new Headers();
        myHeadersre.append("type", "1");
       
        const formdatare = new FormData();
        formdatare.append("address_id", e);

        const requestOptionsre = {
            method: 'POST',
            headers: myHeadersre,
            body: formdatare,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/remove_shiping_addres", requestOptionsre)
            .then(response => response.json())
            .then(result => {
                if(result.responce){
                    getAddress();
                }else{
                    console.log('error')
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getUser();
        getAddress();
        const unsubscribe = navigation.addListener('focus', () => {
            getUser();
            getAddress();
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.pCon}>
                <View style={styles.lC}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.bgcolor, fontSize: 16, paddingLeft: 10 }}>Personal Information</Text>
                </View>
                {

                    user === '' || undefined ? <View /> : <View>
                        {
                            user.map((item, index) => (
                                <View style={{ padding: 10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5 }} key={index}>
                                    <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.first_name}{' '}{item.last_name}</Text>
                                    <Text style={{ color: COLORS.gray, fontWeight: '800' }}>+91 {item.mobile}</Text>
                                    <Text style={{ color: COLORS.gray, fontWeight: '200' }}>{item.email}</Text>
                                </View>
                            ))
                        }
                    </View>
                }

            </View>
            <View style={styles.sep} />
            <View style={[styles.pCon, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }]}>
                <Text style={{ color: COLORS.gray, fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' }}>Select Address</Text>
                <TouchableOpacity style={{
                    height: 30, borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={() => navigation.navigate('Addad')}>
                    <LinearGradient
                        style={[styles.innerBox, { paddingHorizontal: 15 }]}
                        colors={[COLORS.bgcolor, COLORS.gray]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 2 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>ADD</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.sep} />
            {
                address?<View>
                {
                address.map((item, index) => (
                    <View style={{ marginHorizontal: 10, marginVertical: 2, marginTop: 10, borderRadius: 10, backgroundColor: COLORS.white, elevation: 2, padding: 10 }}
                        key={index}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() =>{
                                setASelect(!aSelect);
                                setShip(item);
                            } }>
                            <View style={{ flex: 1, padding: 5 }}>
                                <Text>{item.address},{' '}{item.address_2},{' '}{item.city_id},{' '}{item.district_id}</Text>
                                <Text>{item.state_id},{' '}{item.postcode},{' '}{item.country_id}</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        aSelect ? <FontAwesome name='check-circle' color={'green'} size={20} /> :
                                            <FontAwesome name='circle-o' color={COLORS.gray} size={20} />
                                    }
                                </View>


                            </View>
                        </TouchableOpacity>
                        <View style={styles.sep} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 10 }}>
                            <TouchableOpacity onPress={()=>navigation.navigate('AddEd',{item})}>
                                <FontAwesome name='pencil-square' color={COLORS.gray} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 10 }}
                                onPress={() => removeAdd(item.id)}>
                                <MaterialCommunityIcons name='delete-circle' color={COLORS.bgcolor} size={25} />
                            </TouchableOpacity>

                        </View>
                    </View>
                ))
            }
                </View>:<View/>
            }
            


            {
                aSelect ?
                    <View style={{ width: '100%', height: 100, position: 'absolute', bottom: 0, justifyContent: 'center' }}>
                        <TouchableOpacity style={{
                            height: 40, marginHorizontal: 30,
                            justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.gray,
                            borderRadius: 15
                        }}
                            onPress={() => navigation.navigate('Checkout',{item:ship})}>
                            <LinearGradient
                                style={styles.innerBox}
                                colors={[COLORS.gray, '#dcdcdc']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 2 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>Continue</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    : <View />
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    pCon: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 10
    },
    lC: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sep: {
        height: 1,
        backgroundColor: COLORS.gray
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
export default SelectAddress;
