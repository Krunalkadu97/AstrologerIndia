// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  ScrollView,Alert,ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Loader from '../Loader';

import { FontAwesome,MaterialIcons } from 'react-native-vector-icons'
import { COLORS } from './../../constants/theme';

                               
                            
const SignUp = (props) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const navigation=useNavigation();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  
  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please fill First Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    
    const formdata = new FormData();
    formdata.append("first_name", userFirstName);
    formdata.append("last_name",userLastName);
    formdata.append("email", userEmail);
    formdata.append("mobile", userContact);
    formdata.append("password", userPassword);
    formdata.append("address", userCity);
    
       
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

      fetch("https://www.srpulses.com/astroger/Api/appuser", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        
        // If server response message same as Data Matched
        if (responseJson.response === true) {
          setIsRegistraionSuccess(true)         
        } else {
          setErrortext(responseJson.error);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess===true) {
    return (
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
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('login')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white,paddingTop:60}}>
      <Loader loading={loading} />
      <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Register Now</Text>
                </View>
     
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        
        <KeyboardAvoidingView enabled>
          <View style={[styles.SectionStyle,{justifyContent:'space-around'}]}>
            <TextInput
              style={[styles.inputStyle,{marginRight:5}]}
              onChangeText={(UserName) => setUserFirstName(UserName)}
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserLastName(UserName)}
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
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
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserContact(UserAge)}
              placeholder="Enter Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserCity(UserAge)}
              placeholder="Enter Your City"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={{marginTop:10}}>
                        <Pressable style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                        onPress={()=>navigation.navigate('login')}>
                            <Text style={{color:COLORS.gray,fontWeight:'bold' ,fontSize:18}}>Already have any account </Text>
                            <Text style={{color:COLORS.bgcolor,fontWeight:'bold' ,fontSize:19,borderBottomWidth:2,borderBottomColor:'#eb4034'}}> Sign In</Text>
                        </Pressable>
                </View>       
      </ScrollView>
    </View>
  );
};
export default SignUp;

const styles = StyleSheet.create({
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
  inputStyle: {
    flex: 1,
    color: COLORS.gray,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
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
});
 
