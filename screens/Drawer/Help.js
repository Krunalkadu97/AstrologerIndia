import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity,Dimensions,TextInput,Image} from 'react-native'
import {MaterialIcons} from 'react-native-vector-icons'
import { useSelector } from 'react-redux'
import LinearButton from '../../components/Button/LongButton'
import { FlatList } from 'react-native';
import { FONTS,SIZES,COLORS} from './../../constants/theme';


const RepllyURL="https://www.srpulses.com/astroger/Api/get_query"
const Help = ({navigation}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [query,setQuery]=useState('');
    const [submit,setSubmit]=useState(false);
    
    const userId = useSelector(state => state.users);
    const onSubmit = () => {
   
        const myHeaders = new Headers();
        myHeaders.append("type", "1");
  
        const formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("mobile", mobile);
        formdata.append("query", query);
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
    
        fetch("https://www.srpulses.com/astroger/Api/query", requestOptions)
        .then((response) => response.json())
        .then(result => {
           if(result.response===true){
            setSubmit(true);
           }else{
               setSubmit(false);
           }})
        .catch(error => console.log('error', error));
        
    }
    
    if(submit){
        return(
            <View style={[styles.container,{justifyContent:'center',alignItems:'center',backgroundColor:COLORS.white}]}>
                <Image
                    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTylL6JiB9JrQMYFPYZH2foysV-D0HJnlWA&usqp=CAU'}}
                    style={{width:'100%',height:250}}
                    resizeMode='contain'
                />
                <Text style={{fontWeight:'bold',color:COLORS.main,fontSize:22}}>Thank your for your support!</Text>
                <Text style={{fontWeight:'500',color:COLORS.gray,fontSize:16}}>We will get back to you shortly..</Text>
                <Text style={{fontWeight:'500',color:COLORS.gray,fontSize:14,marginHorizontal:30}}>View your all pervious query or go to Home Screen.</Text>
                <TouchableOpacity style={{height:40,width:150,justifyContent:'center',alignItems:'center',
                backgroundColor:COLORS.main,borderRadius:15,marginTop:40}}
                onPress={()=>navigation.navigate('Home')}>
                    <Text style={{fontWeight:'bold',color:COLORS.white,fontSize:15}}>Home </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:40,width:150,justifyContent:'center',alignItems:'center',
                backgroundColor:COLORS.gray,borderRadius:15,marginTop:10}}
                onPress={()=>navigation.navigate('query')}>
                    <Text style={{fontWeight:'bold',color:COLORS.white,fontSize:15}}>Manage Query </Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderHeader(){
        return(
            <View style={styles.head}>
            <MaterialIcons name='support-agent' size={60} color={'#fff'}/>
            <Text style={styles.textB}>Help and Support</Text>
            <Text style={[styles.textB,{fontSize:16}]}>You can Reach Us At</Text>
            <Text style={[styles.textB,{fontSize:16,marginTop:-1}]}>info@infocentroidtech.com</Text>
            <Text style={[styles.textB,{fontSize:20,marginTop:-1}]}>OR</Text>
            </View>
        )
    }

    function renderForm(){
        return(
            <View style={[{width:Dimensions.get('screen').width-40,backgroundColor:'#FFAE19',height:450,marginHorizontal:20,borderWidth:2,borderColor:'#f7f7f7',marginTop:-20,borderRadius:20,padding:20,elevation:5}]}>
                <Text style={{fontWeight:'bold',color:'#fff',marginLeft:10}}>Your Name</Text>
                <TextInput
                    value={name}
                    placeholder='Enter Your Name'
                    placeholderTextColor='#fff'
                    style={styles.inputBox}
                    onChangeText={(userName)=>setName(userName)}
                />
                <Text style={{fontWeight:'bold',color:'#fff',marginLeft:10,marginTop:10}}>Email</Text>
                <TextInput
                    value={email}
                    placeholder='Enter Your Email'
                    placeholderTextColor='#fff'
                    style={styles.inputBox}
                    onChangeText={(eml)=>setEmail(eml)}
                />
                <Text style={{fontWeight:'bold',color:'#fff',marginLeft:10,marginTop:10}}>Phone Number</Text>
                <TextInput
                    value={mobile}
                    placeholder='Enter Your Phone Number'
                    placeholderTextColor='#fff'
                    style={styles.inputBox}
                    onChangeText={(mob)=>setMobile(mob)}
                />
                <Text style={{fontWeight:'bold',color:'#fff',marginLeft:10,marginTop:10}}> Your Problem Description</Text>
                <TextInput
                    value={query}
                    placeholder='Enter Your Query'
                    placeholderTextColor='#fff'
                    style={[styles.inputBox,{height:100}]}
                    multiline={true}
                    onChangeText={(qry)=>setQuery(qry)}
                />
            </View>
        )
    }

    const renderButton=()=>{
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={{height:40,justifyContent:'center',alignItems:'center',
                backgroundColor:COLORS.bgcolor,marginHorizontal:60,marginVertical:15,borderRadius:15,elevation:65}}
                onPress={onSubmit}>
                    <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.white}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1}}>
                {renderHeader()}
                {renderForm()} 
                {renderButton()}               
            </ScrollView>
        </SafeAreaView>
    )
}

export default Help

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    sep:{
        height:1,
        backgroundColor:COLORS.gray,
        marginVertical:5
    },
    text:{
        ...FONTS.h2,
        color:COLORS.main,
        fontWeight:'bold',
        textAlign:'center'
    },
    textB:{marginTop:1,marginLeft:20,fontSize:25,fontWeight:'bold',color:'#fff',marginBottom:10},
    head:{
        width:SIZES.width,
        height:SIZES.height*0.3,
        backgroundColor:COLORS.bgcolor,
        padding:20,paddingVertical:10,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        alignItems:'center',
        justifyContent:'center',
        elevation:5},
    inputBox:{
        borderWidth:1,
        borderColor:'#fff',
        marginTop:10,
        height:50,
        borderRadius:20,
        paddingHorizontal:20,
        justifyContent:'center',
        color:COLORS.white,
        fontWeight:'bold',
        ...FONTS.h3
      }
})