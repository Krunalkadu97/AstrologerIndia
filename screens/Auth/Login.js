// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView, Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_USER } from '../../ReduxStore/CartItem';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
import { COLORS } from './../../constants/theme';


const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const dispatch = useDispatch()
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword&& userPassword.length >=8) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);

    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append("email_mobile", userEmail);
    formdata.append("password",userPassword);
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);

        // If server response message same as Data Matched
        if (responseJson.responce === true) {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          AsyncStorage.setItem('user_toid', responseJson.data.app_id);
          dispatch({ type: ADD_USER, payload: responseJson.data.app_id })
          navigation.replace('Drawer');
        } else {
          setErrortext(responseJson.error);
          Alert.alert('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{uri:'https://thumbs.dreamstime.com/b/set-mystical-logos-sun-hand-holds-vector-drawings-boho-dihain-astrology-horoscope-black-doodle-illustration-202123987.jpg'}}

            style={styles.logo}
          />
          <Text style={styles.text}>Welcome Back </Text>
          <Text style={styles.textsub}>to Astrologer India</Text>

        </View>
        <View>

          <KeyboardAvoidingView enabled>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <View style={{height:20,justifyContent:'center',alignItems:'flex-end',marginRight:45}}>
              <TouchableOpacity onPress={()=>navigation.navigate('ForgotPass')}>
                <Text style={{color:COLORS.bgcolor,fontWeight:'bold'}}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? {' '}
              <Text style={{ color: COLORS.bgcolor }}>Register</Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.bgcolor,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: COLORS.white,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputStyle: {
    flex: 1,
    color: COLORS.gray,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
  },
  registerTextStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  logo: {
    height: 150,
    width: '100%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: '#051f5f',
  },
  textsub: {
    fontSize: 22,
    marginBottom: 10,
    color: COLORS.gray,
  },
});

