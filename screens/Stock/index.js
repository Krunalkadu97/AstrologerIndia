import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,FlatList,ActivityIndicator} from 'react-native'
import HomeButton from  '../../components/Button/HomeButton'


const myHeaders = new Headers();
myHeaders.append("type", "1");
const formdata = new FormData();
formdata.append("id", "2");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const CategoryURL='https://www.srpulses.com/astroger/Api/get_stockmarket';
const StockMarket =({navigation}) =>{
    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    const fetchUpdates=()=>{
        fetch(CategoryURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    }
    useEffect(()=>{
        fetchUpdates();
    },[])

    function renderHeader(){
        const renderItem = ({item}) =>(
            <TouchableOpacity style={[styles.shadow,styles.newsContainer]} onPress={()=>navigation.navigate('UpdateDetail',{item})}
            key={item.id}>
                
                    <Image
                        source={{uri:item.image}}
                        resizeMode='cover'
                        style={styles.image}
                    />
                    <View style={styles.heading}>
                        <Text style={styles.titleText}>{item.title}</Text>
                    </View>
               
                <View style={styles.details}>
                    <Text style={{fontWeight:'600',fontSize:16,color:'grey'}} numberOfLines={2}>{item.description}</Text>
                </View>
               
            </TouchableOpacity>
        )
        return(
            <View style={styles.container}>
                <HomeButton tiText='Stock Market Updates' buttonTitle='Ask Astro' onPress={()=>navigation.navigate('ViewAll')}/>
                
                <View style={{flex:1,marginVertical:10}}>
                {isLoading ? <ActivityIndicator size="large" color="#eb4034" />:
                <FlatList
                    data={data}
                    keyExtractor={item=>`${item.id}`}
                    renderItem={renderItem}
                    numColumns={1}
                    contentContainerStyle={{paddingHorizontal:5,paddingVertical:10 }}
                />
                }
                </View>
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
             {renderHeader()}
            </ScrollView>
        </SafeAreaView>
    )
}
export default StockMarket;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    newsContainer:{
        flex:1,
        justifyContent:'space-between',
        marginVertical:8,
        marginHorizontal:10,
        borderRadius:20,
        backgroundColor:'#fff'
    },
    image:{
        width:'100%',
        height:150,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    heading:{
        position:'absolute',
        flex:1,
        width:'100%',
        padding:10,
        top:110,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    titleText:{
        fontWeight:'bold',
        fontSize:16,
        color:'#fff'
    },
    details:{
       flex:1,
       padding:10
    }
})
