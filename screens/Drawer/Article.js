import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,FlatList,Dimensions,ActivityIndicator} from 'react-native'
import {Entypo,FontAwesome,MaterialIcons,Ionicons} from 'react-native-vector-icons';
const {width,height} =Dimensions.get('window');

const myHeaders = new Headers();
myHeaders.append("type", "1");
myHeaders.append("Cookie", "ci_session=0ba8948a17b7df2be7f1d67fbbdeb4dd841fd32b");

const formdata = new FormData();
formdata.append("id", "2");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const CategoryURL='https://www.srpulses.com/astroger/Api/get_articles';
const Article =({navigation}) =>{
    const [isLoading,setLoading]=useState(true);
    const [data,setData] = useState([]);

    const getArticle=()=>{
        fetch(CategoryURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    }
    useEffect(()=>{
        getArticle();
    },[])
    function renderHeader(){
        const renderItem = ({item}) =>(
            <TouchableOpacity style={{flex:1}}
            onPress={()=>navigation.navigate('ArticleDetail',{item})}
            key={item.id}>
                <View style={[styles.shadow,{flex:1,marginHorizontal:15,height:height*0.3,borderRadius:20}]}>
                    <Image
                        source={{uri:item.image}}
                        resizeMode='cover'
                        style={[StyleSheet.absoluteFillObject,{borderRadius:20}]}
                    />
                </View>
                <View style={{flex:1,marginHorizontal:20,marginVertical:10}}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>{item.title}</Text>
                    <View  style={{flex:1,marginVertical:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:2,borderBottomColor:'grey',paddingVertical:12,paddingHorizontal:6}}>
                        
                        <Text style={{fontWeight:'bold',fontSize:14,color:'grey'}}>{item.date} ago</Text>
                        <TouchableOpacity>
                            <MaterialIcons name='tag-faces' size={25} color='#ff4500'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return(
            <View style={styles.container}>
                <View style={{flex:1,height:height*0.35,paddingHorizontal:10,backgroundColor:'#ffefd5'}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <TouchableOpacity
                        onPress={()=>navigation.goBack()}>
                            <Ionicons name='chevron-back-circle-outline' size={35} color='black'/>
                        </TouchableOpacity>
                        <Text style={{fontWeight:'bold',fontSize:18,textTransform:'uppercase'}}>Article</Text>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('Notification')}>
                            <Entypo name='dots-three-horizontal' size={35} color='black'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,marginTop:-20}}>
                        <Text style={{fontWeight:'200',color:'tomato',fontSize:16}}>Hello ,</Text>
                        <Text style={{fontWeight:'bold',color:'#f94d00',fontSize:22}}>Infocentroid </Text>
                    </View>
                    
                </View>
                <View style={{flex:1,backgroundColor:'#fff',padding:10,marginTop:-45,borderTopLeftRadius:40,borderTopRightRadius:40}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                        <Text style={{fontWeight:'bold',color:'black',fontSize:18,paddingLeft:10}}>Last Article</Text>
                        
                    </View>
                </View>
                <View style={{flex:1,marginVertical:5}}>
                { isLoading ? <ActivityIndicator size="large" color="#eb4034" />:
                    <FlatList
                        data={data}
                        keyExtractor={item=>`${item.id}`}
                        renderItem={renderItem}
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
export default Article;
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
    }
})