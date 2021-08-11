//import liraries
import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Image } from 'react-native';
import { COLORS } from './../../constants/theme';
import LinearButton from '../../components/Button/LongButton';
import { useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Loader from '../Loader';
import { useIsFocused } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
// create a component
const OnlineConsultation = ({ navigation }) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [dob, setDob] = useState('');
  const [dot, setDot] = useState('');
  const [place, setPlace] = useState('');
  const [selectCat, setSelectCat] = useState('');
  const [selectastro, setSelectAstro] = useState('Select Astrologer');
  const [category, setCategory] = useState('');
  const [astro, setAstro] = useState('');
  const [fType, setFtype] = useState('');
  const userId = useSelector(state => state.users);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState([]);  
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const fnameInputRef = createRef();
  const lnameInputRef = createRef();


  const getCategory = () => {
    const myHeaders = new Headers();
    myHeaders.append("type", "1");

    const formdata = new FormData();
    formdata.append("id", userId);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_category", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCategory(result)
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }

  const getAstrologer = () => {
    const myHeadersda = new Headers();
    myHeadersda.append("type", "1");

    const formdatada = new FormData();
    formdatada.append("id", "2");

    const requestOptionsds = {
      method: 'POST',
      headers: myHeadersda,
      body: formdatada,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_astrologer", requestOptionsds)
      .then(response => response.json())
      .then(result => setAstro(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    
    getCategory();
    getAstrologer();
    const unsubscribe = navigation.addListener('focus', () => {
      getCategory();
      getAstrologer();
    });
    return unsubscribe;
  }, [isFocused, navigation]);

  
  const onSubmit = () => {
    let name=`${fName} ${lName}`
    const myHeaderss = new Headers();
    myHeaderss.append("type", "1");
    

    const formdatas = new FormData();
    formdatas.append("user_id", userId);
    formdatas.append("name", name);
    formdatas.append("dob", dob);
    formdatas.append("birth_time", dot);
    formdatas.append("birth_place", place);
    formdatas.append("category_id",selectCat.id);
    formdatas.append("astro_id", selectastro.user_id);
    formdatas.append("purpose", fType);
   
    const requestOptionss = {
      method: 'POST',
      headers: myHeaderss,
      body: formdatas,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/Prediction", requestOptionss)
      .then(response => response.json())
      .then(result => 
        {
          console.log(result)
          if(result.response===true){
             navigation.navigate('FileUp',{item:result.data.id})
          }else{
              alert(JSON.stringify(result));
          }
        })
      .catch(error => console.log('error', error));
  }
  
  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <View style={{ flexDirection: 'row', paddingHorizontal: 35, paddingVertical: 20 }}>
        <Text style={{ fontWeight: 'bold', color: '#A2A2A2', fontSize: 20, borderBottomWidth: 3, borderBottomColor: '#FFAE19' }}>Online</Text>
        <Text style={{ fontWeight: 'bold', color: '#FFAE19', fontSize: 20, marginLeft: 5, borderBottomWidth: 3, borderBottomColor: '#A2A2A2' }}>Predictions</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView enabled>
          <View style={[styles.SectionStyle, { justifyContent: 'space-around' }]}>
            <TextInput
              style={[styles.inputStyle, { marginRight: 5 }]}
              onChangeText={(UserName) => setFName(UserName)}
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
          <View style={[styles.SectionStyle, { justifyContent: 'space-around' }]}>
            <TextInput
              style={[styles.inputStyle, { marginRight: 5 }]}
              onChangeText={(UserName) => setDob(UserName)}
              placeholder="Enter Date of Birth"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                fnameInputRef.current && fnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setDot(UserName)}
              placeholder="Enter Birth Time"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lnameInputRef.current && lnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.SectionStyle]}>
            <TextInput
              style={[styles.inputStyle, { marginRight: 5 }]}
              onChangeText={(UserName) => setPlace(UserName)}
              placeholder="Enter Birth Place"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                fnameInputRef.current && fnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.SectionStyle]}>
            {
              category ? <View style={[styles.inputStyle, { justifyContent: 'center' }]}>
                <Picker
                  selectedValue={selectCat}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectCat(itemValue);
                  }

                  }>
                  {
                    category.map((item, index) => (
                      <Picker.Item label={item.category} value={item} key={index} />
                    ))
                  }


                </Picker>
              </View> :
                <Text>No category yet</Text>
            }


          </View>
          <View style={[styles.SectionStyle]}>
            {
              astro ? <View style={[styles.inputStyle, { justifyContent: 'center' }]}>
                {
                  selectCat ?
                    <Picker
                      selectedValue={selectastro}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectAstro(itemValue)
                      }>
                      {
                        astro.filter(e => e.category === selectCat.category).map((item, index) => (
                          <Picker.Item label={item.name} value={item} key={index} />
                        ))
                      }

                    </Picker> :
                    <Picker
                      selectedValue={selectastro}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectAstro(itemValue)
                      }>
                      {
                        astro.filter(e => e).map((item, index) => (
                          <Picker.Item label={item.name} value={item} key={index} />
                        ))
                      }

                    </Picker>
                }

              </View> :
                <Text>Please select Category to load Astrologer List</Text>
            }


          </View>
          <Text style={{ color: COLORS.black, fontSize: 16, marginLeft: 35 }}>Reason of Prediction </Text>
          <Text style={{ color: "#8b9cb5", fontSize: 13, marginLeft: 35 }}>(e.g Kundli making,kundli matching..)</Text>
          <View style={[styles.SectionStyle, { marginTop: 5 }]}>
            <TextInput
              style={[styles.inputStyle, { marginRight: 5 }]}
              onChangeText={(UserName) => setFtype(UserName)}
              placeholder="Prediction For"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              onSubmitEditing={() =>
                fnameInputRef.current && fnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          

          <LinearButton buttonTitle='Continue' onPress={() => { onSubmit() }} />
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
});

//make this component available to the app
export default OnlineConsultation;
