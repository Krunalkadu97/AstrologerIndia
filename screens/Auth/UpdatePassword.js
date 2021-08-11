//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from './../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
// create a component
const TextO = ({ ...rest }) => {
    return (
        <View style={styles.otpCon}>
            <TextInput
                style={styles.input}
                numberOfLines={1}
                maxLength={1}
                returnKeyType="next"
                keyboardType="numeric"
                {...rest}
            />
        </View>
    );
}
const UpdatePassword = ({navigation}) => {
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [otp5, setOtp5] = useState('');
    const [otp6, setOtp6] = useState('');
    const [valid, setValid] = useState(false);
    const [errors, setError] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [passError, setPassError] = useState('');
    const [id, setId] = useState('');
 
    let cont = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

    
    const validate = () => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("otp", cont);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/check_otp", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setId(result.data.app_id)
                    setValid(true)
                } else {
                    setError(result.error)
                }
            })
            .catch(error => console.log('error', error));
    }
    const resetPass = () => {
        if (password !== password1) {
            alert('Password not matching!')
            return;
        }
        const myHeadersf = new Headers();


        const formdataf = new FormData();
        formdataf.append("app_id", id);
        formdataf.append("password",password);

        const requestOptionsf = {
            method: 'POST',
            headers: myHeadersf,
            body: formdataf,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/update_password", requestOptionsf)
            .then(response => response.json())
            .then(result => {
                if(result.response===true){
                    navigation.navigate('login')
                }else{
                    setPassError(result.error)
                }
            })
            .catch(error => console.log('error', error));
    }
    if (valid === true) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://stories.freepiklabs.com/storage/19513/forgot-password-amico-1951.png' }}
                    style={{ height: 200, width: 200 }}
                    resizeMode='contain'
                />
                <Text style={{ color: COLORS.gray, fontWeight: 'bold', textAlign: 'center', fontSize: 20, textTransform: 'uppercase' }}>Reset your password</Text>
                <View style={{ width: '100%', height: 50, marginVertical: 10 }}>
                    <TextInput
                        placeholder='Enter new Password'
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={true}
                        style={{
                            height: 40,
                            marginHorizontal: 30,
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: COLORS.gray,
                            paddingLeft: 15,
                            fontSize: 14,
                            color: COLORS.gray
                        }}
                    />
                </View>
                <View style={{ width: '100%', height: 50, marginVertical: 10 }}>
                    <TextInput
                        placeholder='Confirm Password'
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(e) => setPassword1(e)}
                        secureTextEntry={true}
                        style={{
                            height: 40,
                            marginHorizontal: 30,
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: COLORS.gray,
                            paddingLeft: 15,
                            fontSize: 14,
                            color: COLORS.gray
                        }}
                    />
                </View>
                <View style={{ height: 80, width: '100%' }}>
                    <TouchableOpacity style={{
                        height: 40, marginHorizontal: 60, marginVertical: 15, backgroundColor: COLORS.bgcolor,
                        justifyContent: 'center', alignItems: 'center', borderRadius: 15
                    }}
                        onPress={resetPass}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.white, textTransform: 'uppercase', letterSpacing: 2 }}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.bgcolor, textAlign: 'center' }}>{passError}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuckAtDO6skSzw6BokB-sHe00v1NEHT9YF2h1H--CD3CSv6_7qIdqpxguJYxOvgnhJClM&usqp=CAU' }}
                style={{ height: 200, width: 200 }}
                resizeMode='contain'
            />
            <Text style={{ fontSize: 16, color: COLORS.primary, marginTop: 10, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>Enter your otp</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <TextO onChangeText={(UserAge) => setOtp1(UserAge)} />
                <TextO onChangeText={(UserAge) => setOtp2(UserAge)} />
                <TextO onChangeText={(UserAge) => setOtp3(UserAge)} />
                <TextO onChangeText={(UserAge) => setOtp4(UserAge)} />
                <TextO onChangeText={(UserAge) => setOtp5(UserAge)} />
                <TextO onChangeText={(UserAge) => setOtp6(UserAge)} />
            </View>
            <View style={{ height: 80, width: '100%' }}>
                <TouchableOpacity style={{
                    height: 40, marginHorizontal: 60, marginVertical: 15, backgroundColor: COLORS.bgcolor,
                    justifyContent: 'center', alignItems: 'center', borderRadius: 15
                }}
                    onPress={validate}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.white, textTransform: 'uppercase', letterSpacing: 2 }}>Verify</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.bgcolor, textAlign: 'center' }}>{errors}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    otpCon: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginHorizontal: 5
    },
    input: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        textAlign: 'center'
    },
});

//make this component available to the app
export default UpdatePassword;
