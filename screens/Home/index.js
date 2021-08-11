
// create a component
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,SafeAreaView,ScrollView,Image,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native'
import {FontAwesome5} from 'react-native-vector-icons'
import { useFonts } from 'expo-font';
import HomeButton from '../../components/Button/HomeButton'
import AstroCard from '../../components/HomeCard/AstroCard';
import AstroList from '../../components/HomeCard/DiffCard'
import { COLORS,SIZES,FONTS } from './../../constants/theme';

const shadowButtonStyle ={
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 24,
  };
const myHeaders = new Headers();
  myHeaders.append("type", "1");

const caformdata = new FormData();
caformdata.append("id", "2");

const carequestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: caformdata,
    redirect: 'follow'
  };

const formdata = new FormData();
  formdata.append("id", "1");
const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
const CategoryURL="https://www.srpulses.com/astroger/Api/get_category";
const AstroURL="https://www.srpulses.com/astroger/Api/get_astrologer";

const Home = ({navigation}) => {
    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    const [astro,setAstro] = useState([]);
   
    const fetchCategory=()=>{
        fetch(CategoryURL,carequestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false)
        )
        .finally(setLoading.bind(undefined, false));
    };
    const fetchAstro=()=>{
        fetch(AstroURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setAstro(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    }
    useEffect(()=>{
        fetchCategory();
        fetchAstro();
       
    },[1500])
   
    function renderSearch(){
        return(
            <View style={styles.searchBox}>
                <TouchableOpacity style={styles.sBox}
                onPress={()=>{navigation.navigate('Search')
                }}>
                 <View style={styles.inBox}>
                    <FontAwesome5 name='search' size={20} color={COLORS.slackgray}/>
                    <Text style={styles.sText}>Search For an astrologer</Text>
                 </View>
                </TouchableOpacity>
            </View>
        )
    }

    function renderBanner(){
        return(
            <View style={{flex:1}}>
                <Image
                    source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpDn8leG-1FYEGYbbjtw4qCCeHC0mb6OSA&usqp=CAU"}}
                    resizeMode='cover'
                 style={{width:'100%',height:160}}/>
            </View>
        )
    }

    function renderCategory(){
        const renderItem = ({item}) =>(
            <TouchableOpacity
            style={[styles.CatBox,shadowButtonStyle]}
              onPress={()=>{navigation.navigate('CategoryDetail',{item})}} key={item.id}>
               <Image source={{uri:item.image}} style={{width:60,height:60,borderRadius:30,margin:5}} resizeMode='contain'/>
                <Text style={[styles.cText,{fontSize:12}]}>{item.category}</Text>
              </TouchableOpacity>
        )
        return(
            <View style={{flex:1,marginTop:SIZES.base}}>
            {isLoading ? <ActivityIndicator size="large" color={COLORS.main} />:
                <FlatList
                    data={data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    contentContainerStyle={{paddingHorizontal:5,paddingVertical:10 }}
                />
                
            }
               
            </View>
        )
    }


    function renderAstro(){

        return(
            <View style={styles.Astro}>
                <HomeButton tiText='Currently Available' 
                buttonTitle='View All' 
                onPress={()=>{navigation.navigate('ViewAll')
}}/>
            <View>
            {isLoading ? <ActivityIndicator size="large" color="green" />:
            <FlatList
                data={astro}
                keyExtractor={item => item.user_id}
                renderItem={({item,index})=>(<AstroCard item={item} key={index}/>)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingVertical:18}}
            />
            }
          </View>
               
            </View>
            
        )
    }

    function renderVedic(){

       
        return(
            <View style={styles.Astro}>
                <HomeButton tiText='Vedic Astrologers' buttonTitle='View All' onPress={()=>{navigation.navigate('ViewAll')
               
                }}/>
           <View>
           {isLoading ? <ActivityIndicator size="large" color="orange" />:
            <FlatList
                data={astro}
                keyExtractor={item => item.user_id}
                renderItem={({item,index})=>(<AstroList item={item} key={item.id}/>)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: 18}}
            />
            }
          </View>
    </View>
        )
    }

   

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1}}>
             {renderSearch()}
             {renderBanner()}
             {renderCategory()}
             {renderAstro()}
             {renderVedic()}
             
             </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fcfcfc'
    },
    CatBox:{
        margin:5,
       flex:1,
        height:135,
        alignItems:'center',
        elevation:3,
        backgroundColor:'#fff',
        borderRadius:20,
        alignItems:'center',
        padding:10
       },
       searchBox:{
           flex:1,alignItems:'center',
           elevation:1,height:60,paddingVertical:6,paddingHorizontal:10,
           backgroundColor:'#fff',justifyContent:'center',
           margin:5
        },
        sBox:{
            flex:1,backgroundColor:COLORS.homBtn,
            justifyContent:'center',height:40,width:'100%',
             marginHorizontal:20,borderRadius:25,
             elevation:4
            },
        inBox:{
            flexDirection:'row',
            alignItems:'center',
            paddingLeft:20
        },
        sText:{
            ...FONTS.h4,
            paddingLeft:10,textAlign:'center',
            color:COLORS.lightGray,
            fontFamily:'Bitter_Bold'
        },
        cText:{
            textAlign:'center',
            padding:5,
            fontFamily:'Bitter_Bold'
        },
        Astro:{backgroundColor:COLORS.baCol,flex:1,margin:5,elevation:4},
})
