//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet ,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Platform,Share} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
const {width,height} =Dimensions.get('window');
import {Fontisto,FontAwesome5,MaterialIcons,Ionicons,EvilIcons} from 'react-native-vector-icons';
import { COLORS } from './../../constants/theme';
// create a component

const UpdateDetails = ({route,navigation}) => {
    const [data,setData] = useState(null);
    React.useEffect(()=>{
        let {item} = route.params;
        setData(item)
    })
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
    function renderHeaderBar(){
        return(
            <View
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginTop:Platform.OS === 'ios' ? 40 :60,
                paddingHorizontal:20
            }}>
                <TouchableOpacity
                style={styles.box}
                onPress={()=>navigation.goBack()}>
                     <Ionicons
                        name='arrow-back'
                        size={30}
                        color='tomato'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.box}
                onPress={onShare}>
                    <FontAwesome5 
                        name='share-alt' 
                        size={26} 
                        color='tomato'/>
                     
                </TouchableOpacity>
            </View>
        )
    }
    function renderHeader(){
        return(
            <ImageBackground
            source={{uri:data?.image}}
            resizeMode='stretch'
            style={{
                width:'100%',
                height:height < 700 ? height *0.4 : height*0.45
            }}>
               <View style={{flex:1}}>
               {renderHeaderBar()}
               </View>
            </ImageBackground>
        )
    }
    function renderBody(){
        return(
            <View style={{flex:1,margin:10}}> 
                <Text style={styles.hTitle}>{data?.title}</Text>
                <View style={styles.fHed}>
                    <Text style={{fontWeight:'bold'}}>Author : Abcd</Text>
                    <Text style={{fontWeight:'bold'}}>Date : 01/05/2021</Text>
                </View>
                <Text style={styles.sTitle}>
                    {data?.description}
                </Text>
                <View style={{flex:1,justifyContent:'flex-end',paddingVertical:20}}>
                    <Text style={{bottom:15,textAlign:'center',fontWeight:'bold',fontSize:18,color:'tomato'}}>Thank you for  reading</Text>
                </View>
                
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderBody()}
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    box:{
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        borderRadius:20,
        backgroundColor:'rgba(255, 255, 255, 0.7)'
    },
    hTitle:{
        fontWeight:'bold',
        fontSize:22,
        color:'black',
        padding:10,
        lineHeight:22
    },
    fHed:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:15,
        paddingVertical:10
    },
    sTitle:{
        fontWeight:'800',
        fontSize:16,
        color:COLORS.gray,
        padding:10,
        lineHeight:20
    }
});

//make this component available to the app
export default UpdateDetails;
