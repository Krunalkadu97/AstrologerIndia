//import liraries
import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { COLORS } from './../../constants/theme';

// create a component
const EditProfile = ({ route, navigation }) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [id, setId] = useState('');
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const fnameInputRef = createRef();
  const lnameInputRef = createRef();
  const addressInputRef = createRef();
  const phoneInputRef = createRef();
  useEffect(() => {
    let { item } = route.params;
    setFName(item.first_name);
    setLName(item.last_name);
    setEmail(item.email);
    setPhone(item.mobile);
    setCity(item.address);
    setId(item.app_id);
  }, [])
  const handleSubmitButton = () => {
    
    const myHeaders = new Headers();


    const formdata = new FormData();
    formdata.append("app_id", id);
    formdata.append("first_name",fName);
    formdata.append("last_name", lName);
    formdata.append("email", email);
    formdata.append("mobile", phone);
    formdata.append("address", city);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/updateprofile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.response){
          navigation.navigate('Profile');
        }else{
          setErrortext('Error during update profile information.')
        }
      })
      .catch(error => console.log('error', error));
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'data:image/png;base64,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' }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center'
        }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.bgcolor, textAlign: 'center', textTransform: 'uppercase' }}>Astrologer India</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.gray, textAlign: 'center' }}>Edit your Information here</Text>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView enabled>
          <View style={[styles.SectionStyle, { justifyContent: 'space-around' }]}>
            <TextInput
              style={[styles.inputStyle, { marginRight: 5 }]}
              onChangeText={(UserName) => setFName(UserName)}
              value={fName}
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={fnameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                fnameInputRef.current && fnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setLName(UserName)}
              value={lName}
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              ref={lnameInputRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lnameInputRef.current && lnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setEmail(UserPassword)
              }
              placeholder="Enter Email"
              value={email}
              placeholderTextColor="#8b9cb5"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setPhone(UserAge)}
              value={phone}
              placeholder="Enter Phone Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={phoneInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                phoneInputRef.current &&
                phoneInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setCity(UserAge)}
              value={city}
              placeholder="Enter City"
              placeholderTextColor="#8b9cb5"
              ref={addressInputRef}
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
            <Text style={styles.buttonTextStyle}>UPDATE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.gray,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.gray,
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
export default EditProfile;
