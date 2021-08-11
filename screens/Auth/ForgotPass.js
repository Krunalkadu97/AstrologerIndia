//import liraries
import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { COLORS } from './../../constants/theme';
import { MaterialCommunityIcons } from 'react-native-vector-icons'
// create a component
const ForgotPassword = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [errortext, setErrortext] = useState('');
    const [isValid, setIsValid] = useState(false);
    const emailInputRef = createRef();

    const submit = () => {
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        const myHeaders = new Headers();
        
        const formdata = new FormData();
        formdata.append("email", userEmail);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://www.srpulses.com/astroger/Api/forgotpassword", requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                  setIsValid(true)         
                } else {
                  setErrortext(responseJson.massage);
                }
              })
              .catch((error) => {                
                console.error(error);
              });
    }
    if (isValid===true) {
        return(
            <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
        }}>
        <View>
          <Image
            source={{uri:'https://media.istockphoto.com/vectors/astrology-icon-trendy-astrology-logo-concept-on-white-background-from-vector-id1124741599'}}
            style={{width:200,height:250,alignSelf:'center'}}
          />
        </View>
        <Text style={styles.successTextStyle}>
        Password Sent Successfully On Your Register Email!
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ResetPass')}>
          <Text style={styles.buttonTextStyle}>Verify Otp and Reset Password</Text>
        </TouchableOpacity>
      </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name='lock-reset' size={100} color={COLORS.black} />
                <Text style={{
                    fontWeight: 'bold', fontSize: 20, color: COLORS.bgcolor,
                    marginVertical: 8, textTransform: 'uppercase', letterSpacing: 2
                }}>Astrologer India</Text>
            </View>
            <View style={styles.TextStyle}>
                <TextInput
                    placeholder='Enter your Email address'
                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                    placeholderTextColor={COLORS.gray}
                    style={styles.textInput}
                    keyboardType="email-address"
                    ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        emailInputRef.current &&
                        emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <MaterialCommunityIcons name='email' size={22} color={COLORS.bgcolor} />
            </View>
            <Text style={{fontWeight:'bold',fontSize:14,color:COLORS.bgcolor,marginVertical:10,textAlign:'center'}}>{errortext}</Text>
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={submit}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.white }}>Send Otp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    TextStyle: {
        flexDirection: 'row',
        height: 40,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.bgcolor,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingRight: 15
    },
    textInput: {
        flex: 1,
        color: COLORS.gray,
        height: '100%'
    },
    button: {
        height: 40,
        marginHorizontal: 25,
        backgroundColor: COLORS.bgcolor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 15
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.primary,
        marginHorizontal:50,
        marginTop:15,
        elevation:6
    },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
      successTextStyle: {
        color: COLORS.gray,
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
      },
      buttonStyle: {
        backgroundColor: COLORS.bgcolor,
        borderWidth: 0,
        color: COLORS.white,
        borderColor: COLORS.gray,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
});

//make this component available to the app
export default ForgotPassword;
