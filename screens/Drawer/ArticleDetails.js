import React,{useState} from 'react'
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,ImageBackground,Dimensions,Platform,Share} from 'react-native'
import {Fontisto,FontAwesome5,MaterialIcons,Ionicons,EvilIcons} from 'react-native-vector-icons';
import {LinearGradient} from 'expo-linear-gradient'
import { COLORS,FONTS,SIZES} from './../../constants/theme';

const {width,height} =Dimensions.get('window');

const onShare = () =>{
    let text= 'hello'
    if(Platform.OS === 'android')
    text=text.concat('https://www.shorturl.at/oGOQR')
    else
    text=text.concat('https://www.shorturl.at/oGOQR')
    Share.share({
        subect:'Astro Talk',
        title:'Astro Talk',
        message:text,
        url:'app://astro_talk',

    },{
        //android
        dialogTitle:'Please Like Share and Subscribe !!!',
        //IOS
        excludedActivityTypes:[]
    })
}

const ArticleDetail =({route,navigation}) =>{

    const [article,setArticle] = useState(null);
    React.useEffect(()=>{
        let {item} = route.params;
        setArticle(item)
    })
    function renderHeaderBar(){
        return(
            <View
            style={styles.gBox}>
                <TouchableOpacity
                style={styles.hBox}
                onPress={()=>navigation.goBack()}>
                     <Ionicons
                        name='arrow-back'
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
                
            </View>
        )
    }
    function renderHeader(){
        return(
            <View>
           
            <ImageBackground
            source={{uri:article?.image}}
            resizeMode='stretch'
            style={styles.hedBox}>
                <View style={{ flex:1 }}>
                    {renderHeaderBar()}
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <LinearGradient
                        start={{x:0,y:0}}
                        end={{x:1,y:1}}
                        colors={['#Fff','#fdfdfd']}
                        style={styles.siBox}>
                                
                                <Text style={{color:COLORS.dark,fontWeight:'bold',...FONTS.h2}}>{article?.title}</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
            
            </View>
        )
    }
    function renderUser(){
        return(
            <View style={{flex:1}}>
                
                        <ScrollView style={{flex:1,backgroundColor:COLORS.white}} showsVerticalScrollIndicator={false}>
                        <View style={styles.imgCon}>
                            <View>
                                <Image
                                    source={{uri:'data:image/png;base64,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'}}
                                    resizeMode='cover'
                                    style={{
                                        width:60,
                                        height:60,
                                        borderRadius:30
                                    }}
                                />
                            </View>
                            <View style={{flex:1,marginLeft:20}}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Auther Name</Text>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <Text>{article?.date} ago</Text>
                                    
                                    <TouchableOpacity
                                    onPress={() => onShare()}>
                                        <FontAwesome5 name='share-alt' size={18} color='#ffa500'/>
                                    </TouchableOpacity>
                                   
                                </View>
                            </View>
                        </View>
                          <View style={{flex:1,marginHorizontal:20,padding:10}}>
                              <Text style={{fontWeight:'400',fontSize:16,color:'grey'}}>{article?.description}</Text>
                          </View>
                        </ScrollView>
                   
            </View>
        )
    }
    return(
        <ScrollView
        contentContainerStyle={{flex:1}}>
            {renderHeader()}    
            {renderUser()}        
        </ScrollView>
    )
}
export default ArticleDetail;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white
    },
    hedBox:{
        width:'100%',
        height:SIZES.height < 700 ? SIZES.height *0.5 : SIZES.height*0.6
    },
    siBox:{
        width:'100%',
        height:150,
        alignItems:'center',
        justifyContent:'flex-end',
        borderTopLeftRadius:80,
        borderTopRightRadius:80,
        paddingHorizontal:20,
        paddingBottom:20
    },
    imgCon:{
        flex:1,flexDirection:'row',
        padding:10,marginHorizontal:20,
        marginTop:25,paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:COLORS.dark,
        paddingBottom:20
    },
    gBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:Platform.OS === 'ios' ? 40 :60,
        paddingHorizontal:20
    },
    hBox:{
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        borderRadius:20,
        backgroundColor:'rgba(0, 0, 0, 0.4)'
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
    categortContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:-186,
        paddingHorizontal:10,
        paddingVertical:8,
        borderRadius:4,
        backgroundColor:'#ff7518',
        marginVertical:12
    }
})