//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { COLORS } from './../../constants/theme';
import { FontAwesome, Ionicons, MaterialIcons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux'
// create a component
const AddressAdd = ({ navigation }) => {
    const [hno, setHNo] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [district, setDistrict] = useState('');
    const [pin, setPin] = useState('');
    const userInfo = useSelector(state => state.users);

    const onSubmit = () => {
        const myHeaders = new Headers();
        myHeaders.append("type", "1");
        
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("address", hno);
        formdata.append("postcode", pin);
        formdata.append("address_2", location);
        formdata.append("city_id", city);
        formdata.append("state_id", states);
        formdata.append("district_id", district);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/add_shiping_addres", requestOptions)
            .then(response => response.json())
            .then(result =>{
                if(result.responce===true){
                    navigation.navigate('selectAdd')
                }else{
                    alert('Error while submiting Address')
                }
            })
            .catch(error => console.log('error', error));
        
    }
    return (
        <View style={styles.container}>
            <Text style={{
                color: COLORS.bgcolor, fontWeight: 'bold',
                fontSize: 18, paddingVertical: 10, textAlign: 'center'
            }}>Add User Details Below</Text>
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.InCon}>
                        <FontAwesome name='building' size={25} color={COLORS.gray} />
                        <TextInput
                            placeholder='Building Number/Apartment'
                            placeholderTextColor={COLORS.gray}
                            style={styles.textIn}
                            onChangeText={(e) => setHNo(e)}
                        />
                    </View>
                    <View style={styles.InCon}>
                        <Ionicons name='locate' size={25} color={COLORS.gray} />
                        <TextInput
                            placeholder='Location/Landmark '
                            placeholderTextColor={COLORS.gray}
                            style={styles.textIn}
                            onChangeText={(e) => setLocation(e)}
                        />
                    </View>
                    <View style={styles.InCon}>
                        <MaterialIcons name='location-city' size={25} color={COLORS.gray} />
                        <TextInput
                            placeholder='City'
                            placeholderTextColor={COLORS.gray}
                            style={styles.textIn}
                            onChangeText={(e) => setCity(e)}
                        />
                    </View>
                    <View style={styles.InCon}>
                        <Ionicons name='location' size={25} color={COLORS.gray} />
                        <TextInput
                            placeholder='District'
                            placeholderTextColor={COLORS.gray}
                            style={styles.textIn}
                            onChangeText={(e) => setDistrict(e)}
                        />
                    </View>
                    <View style={styles.InCon}>
                        <Ionicons name='location' size={25} color={COLORS.gray} />
                        <TextInput
                            placeholder='State'
                            placeholderTextColor={COLORS.gray}
                            style={styles.textIn}
                            onChangeText={(e) => setStates(e)}
                        />
                    </View>

                    <View style={[styles.InCon, { paddingLeft: 18 }]}>
                        <FontAwesome name='map-pin' size={20} color={COLORS.gray} />
                        <TextInput
                            placeholder='Pin code'
                            placeholderTextColor={COLORS.gray}
                            style={[styles.textIn, { paddingLeft: 15 }]}
                            onChangeText={(e) => setPin(e)}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{ width: '100%', height: 100, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            height: 40, borderRadius: 15, backgroundColor: COLORS.bgcolor, marginHorizontal: 50,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={onSubmit}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.white, fontSize: 18 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
    InCon: {
        height: 40,
        marginHorizontal: 25,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10
    },
    textIn: {
        height: '100%',
        flex: 1,
        color: COLORS.gray,
        fontSize: 16,
        paddingLeft: 10
    }
});

//make this component available to the app
export default AddressAdd;
