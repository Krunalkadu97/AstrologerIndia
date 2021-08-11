import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,SafeAreaView,ScrollView,TouchableOpacity,Image,ActivityIndicator} from 'react-native'



const myHeaders = new Headers();
myHeaders.append("type", "1");
myHeaders.append("Cookie", "ci_session=e9c2f08502f83d99ffbad136c7ee51b182a0d89a");

const formdata = new FormData();
formdata.append("id", "2");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const UpdatesURL='https://www.srpulses.com/astroger/Api/get_weekly';
const Update = ({navigation}) => {
    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch(UpdatesURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    })

    function renderNews(){
        const renderItem = ({item}) => (
            <TouchableOpacity
            onPress={()=>navigation.navigate('UpdateDetail',{item})}
            style={{justifyContent:'space-between',flexDirection:'row',paddingHorizontal:20,marginVertical:5,backgroundColor:'#fcf2eb',padding:10,borderRadius:10,elevation:5,marginHorizontal:10}}>
             <View style={{ width:100,
                        height:100,
                        borderRadius:50,
                        elevation:5,
                        backgroundColor:'#f5efeb',
                        justifyContent:'center',
                        alignItems:'center'}}>
                <Image
                    source={{uri:item.image}}
                    style={{
                        width:90,
                        height:90,
                        borderRadius:45
                    }}
                    resizeMode='cover'
                />
             </View>
             <View style={{flex:1,paddingHorizontal:10,marginLeft:10,marginTop:5,maxHeight:100}}>
                        <Text style={{fontWeight:'bold',lineHeight:24}}>{item.title}</Text>
                        <Text style={{color:'#7a7a78',lineHeight:20}} numberOfLines={2}>{item.description}</Text>
            </View>
            </TouchableOpacity>
        )
        return(
            <View style={{flex:1,marginTop:10}}>
            {isLoading ? <ActivityIndicator size="large" color="#eb4034" />:
                <FlatList
                    numColumns={1}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderItem}
                    contentContainerStyle={{justifyContent:'space-between',marginHorizontal:5}}
                />
            }
            </View>
        )
    }
    

    return(
        <SafeAreaView style={styles.container}>
          
            {renderNews()}
        </SafeAreaView>
    )
}

export default Update

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})