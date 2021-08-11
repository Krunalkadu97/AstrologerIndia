//import liraries
import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Image } from 'react-native';
import { COLORS } from './../../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
// create a component
const UploadFile = ({ route, navigation }) => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState([]);
    const [id, setId] = useState('');
    const [isSuccess,setSuccess]=useState(false);
    const submit = () => {
        const myHeaders = new Headers();
        myHeaders.append("type", "1");
       
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("file[]", file);
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/Prediction_image", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.response===true){
                        setSuccess(true)
                }else{
                    setSuccess(false)
                }
            })
            .catch(error => console.log('error', error));
    }
    
    useEffect(() => {
        let { item } = route.params;
        setId(item);
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

    }, [navigation]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setFile(result.uri)
        }
    };

    const documentSelect = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true,
            copyToCacheDirectory: false
        });
        
        setFile(result.uri);
    }
    if(isSuccess){
        return(
            <View style={styles.container}>
                <Image
                    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8fH8_RFQ08AgVZKLYur9wu2PFUgCwKdP_5EYlDSxyIQD8bc6yTgSkh8kHeVnQ6qBqbo&usqp=CAU'}}
                    style={{width:'100%',height:250}}
                    resizeMode='contain'
                />
                <Text style={{fontWeight:'bold',fontSize:22,marginVertical:10,textAlign:'center',
                color:COLORS.gray,paddingHorizontal:15}}>File Uploaded Successfully..!!!!</Text>
                <Text style={{fontWeight:'200',fontSize:16,marginVertical:10,textAlign:'center',
                color:COLORS.primary,paddingHorizontal:15}}>You can check download your prediction from My prediction page. Located on Profile Page.!!</Text>
                <Text style={{fontWeight:'200',fontSize:16,marginVertical:10,textAlign:'center',
                color:COLORS.gray,paddingHorizontal:15}}>Let's go to Home Page.</Text>
                <View>
                <TouchableOpacity style={{
                    height: 40, backgroundColor: COLORS.bgcolor,
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginHorizontal: 60, marginVertical: 15
                }}
                    onPress={()=>navigation.navigate('Home')}>
                    <Text style={{ color:COLORS.white,fontSize:15,fontWeight:'bold'}}>Home</Text>
                </TouchableOpacity>
            </View>
            </View>  
        )
    }
    return (
        <View style={styles.container}>
            <View style={[styles.SectionStyle]}>
                <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                    onPress={pickImage}>
                    <Text style={{ color: "#8b9cb5" }}>Select Image/Document</Text>
                </TouchableOpacity>

            </View>
            <View style={[styles.SectionStyle]}>
                <TouchableOpacity style={[styles.inputStyle, { justifyContent: 'center', alignItems: 'center' }]}
                    onPress={documentSelect}>
                    <Text style={{ color: "#8b9cb5" }}>Select Document</Text>
                </TouchableOpacity>

            </View>
            {image &&
                <View>
                    <Text style={{ color: "#8b9cb5", textAlign: 'center', paddingVertical: 6 }}>Your Selected Image </Text>
                    <Image source={{ uri: image }} style={{ width: 200, height: 120, alignSelf: 'center' }}
                        resizeMode='contain'
                    />
                </View>}
            <View>
                <TouchableOpacity style={{
                    height: 40, backgroundColor: COLORS.bgcolor,
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginHorizontal: 60, marginVertical: 15
                }}
                    onPress={submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
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
export default UploadFile;
