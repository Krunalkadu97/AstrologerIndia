import React,{useEffect,useState} from 'react'
import {View,Text,SafeAreaView,ScrollView,ActivityIndicator} from 'react-native'
import {FontAwesome5} from 'react-native-vector-icons'
import { COLORS } from './../../constants/theme';

const myHeaders = new Headers();
myHeaders.append("type", "1");

const formdata = new FormData();
formdata.append("type", "1");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const PrivacyRL="https://www.srpulses.com/astroger/Api/get_about";

const Privacy = () => {

    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    const fetchAbout=()=>{
        fetch(PrivacyRL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false)
        )
        .finally(setLoading.bind(undefined, false));
    };

    useEffect(()=>{
        fetchAbout();
    },[1500])

    return(
        <SafeAreaView style={{flex:1}}>
        {isLoading ? <ActivityIndicator size="large" color={COLORS.main} />:
             <ScrollView style={{flex:1}}>
             {data?.map((item,index)=>(
                 <View key={index}>
                <View style={{margin:10,padding:10,flexDirection:'row',
                backgroundColor:'#f7f7f7',
                borderRadius:10,
                elevation:1,
                height:60,
                justifyContent:'space-between',
                alignItems:'center'}}>
                    <Text style={{fontWeight:'900',fontSize:20}}>{item.title}</Text>
                    <FontAwesome5 name='info-circle' size={25} color='#000'/>
                </View>
                <View style={{margin:5,padding:10}}>
                    <Text style={{color:COLORS.gray,fontSize:15}}>{item.description}</Text>
                   
                </View>
                </View>
                ))}
            </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Privacy;