import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,Image,Dimensions,FlatList,ScrollView,ActivityIndicator} from 'react-native'
import { COLORS,SIZES } from './../../constants/theme';


const myHeaders = new Headers();
myHeaders.append("type", "1");

const formdata = new FormData();
formdata.append("type", "0");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const formdataS = new FormData();
formdataS.append("type", "2");

const requestStoryOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdataS,
  redirect: 'follow'
};

const AboutusURL="https://www.srpulses.com/astroger/Api/get_about";
const StoryURL="https://www.srpulses.com/astroger/Api/get_about";
const Astro = () => {
    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    const [story,setStory] = useState([]);
    
    const fetchAbout=()=>{
        fetch(AboutusURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false)
        )
        .finally(setLoading.bind(undefined, false));
    };
    const fetchStory=()=>{
        fetch(StoryURL,requestStoryOptions)
        .then((response)=>response.json())
        .then((json) => setStory(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false)
        )
        .finally(setLoading.bind(undefined, false));
    };

    useEffect(()=>{
        fetchAbout();
        fetchStory();
    },[1500])

    
    function renderHeader(){
        return(
            
            <View >
            {isLoading ? <ActivityIndicator size="large" color={COLORS.main} />:
            <View>
            {data?.map((item,index)=>(
                <View style={{padding:10}} key={index}>
                <View style={{flexDirection:'row',paddingHorizontal:20}}>
                    <Text style={{fontWeight:'bold',color:'#A2A2A2',fontSize:20,borderBottomWidth:3,borderBottomColor:'#FFAE19'}}>What is </Text>
                    <Text style={{fontWeight:'bold',color:'#FFAE19',fontSize:20,marginLeft:5,borderBottomWidth:3,borderBottomColor:'#A2A2A2'}}>{item.title}</Text>
                </View>
                <View style={{margin:10}}>
                    <Image
                        source={{uri:item.image}}
                        style={{
                            width:'100%',
                            height:180
                        }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={styles.desBox}>
                        
                            <Text>{item.description}</Text>
                </View>
            </View>  
            ))}
            </View>
                
            }
            </View>
           
        )
    }
 

 function renderStory(){
     const renderItem = ({item}) =>(
         <TouchableOpacity 
         style={styles.sBox}
         >
            <Image source={{uri:item.image}} style={{width:60,height:60,borderRadius:10}}
                resizeMode='contain'
            />
            <Text style={{fontWeight:'bold',textAlign:'center'}}>{item.title}</Text>
            <Text style={{textAlign:'center'}}>{item.description}</Text>
         </TouchableOpacity>
     )
     return(
         <View style={{margin:5,marginBottom:50,width:Dimensions.get('screen').width-30,marginHorizontal:14,backgroundColor:'#FFF6E8',elevation:3,marginBottom:30,padding:10}}>
           {isLoading ? <ActivityIndicator size="large" color={COLORS.main} />: 
           <View>
            <View style={{flexDirection:'row',padding:10}}>
                <Text style={{fontWeight:'bold',fontSize:20,color:'#FFAE19',borderBottomWidth:2,borderBottomColor:'#E53516'}}>OUR</Text>
                <Text style={{fontWeight:'bold',fontSize:20,marginLeft:5,color:'#E53516',borderBottomWidth:2,borderBottomColor:'#FFAE19'}}>STORY</Text>
            </View>
             <FlatList
                 data={story}
                 keyExtractor={item=>`${item.id}`}
                 renderItem={renderItem}
                 numColumns={3}
                 contentContainerStyle={{justifyContent:'space-between'}}
             />
             </View>
             }
         </View>
     )
 }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex:1}}>
           {renderHeader()}
           {renderStory()}
           </ScrollView>
        </SafeAreaView>
    )
}

export default Astro

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    desBox:{
        margin:5,marginHorizontal:10,
        backgroundColor:'#faf9db',
        padding:20,elevation:4,
        flex:1,
        width:Dimensions.get('screen').width-40
    },
    sBox:{
        flex:1,
        maxWidth:SIZES.width*0.28,
        height:130,
        backgroundColor:'#f7f7f7',
        margin:2,
        alignItems:'center',
        paddingVertical:10,
        elevation:2,
        marginBottom:8,
        paddingHorizontal:8,
        borderRadius:5
    }
})