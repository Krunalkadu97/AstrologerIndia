import React from 'react'
import {View,Text,Dimensions,SafeAreaView,ScrollView,StyleSheet,Image} from 'react-native'
const {width,height} =Dimensions.get('window');
import LinearButton from '../../components/Button/LongButton'
import { COLORS } from './../../constants/theme';

const OnBoarding = ({navigation}) =>{
    function renderContent(){
            return(
               <View style={{flex:1,paddingTop:20,backgroundColor:COLORS.white}}>                    
                        <Image
                            source={{uri:'https://pro2-bar-s3-cdn-cf1.myportfolio.com/4d6b2ce61c466e2c613feb002edd2593/9aca781e-779d-4b99-ba64-4c99c0c26c42_rw_1200.gif?h=100f2d95fc784bd74f4c647baefc09f3'}}
                            resizeMode='contain'
                            style={{
                                width:'100%',
                                height:height < 700 ? height *0.45 : height*0.5,
                                marginTop:10
                            }}
                        />
                    <View style={{flex:1,alignItems:'center',paddingVertical:2,paddingHorizontal:20}}>
                        <Text style={{fontWeight:'bold',fontSize:16,textTransform:'uppercase',color:'#eb4034'}}>Astrologer India</Text>
                        <Text style={{fontWeight:'bold',fontSize:20,textTransform:'uppercase',color:'#000',textAlign:'center',paddingVertical:6,marginTop:11}}>Get to know your horoscope by the stars from our specialist</Text>   
                        <Text style={{fontSize:16,fontWeight:'200',color:'#808080',marginTop:4,paddingHorizontal:15}}>Astrology is a pseudoscience that claims to divine information about human affairs and terrestrial events by studying the movements and relative positions of celestial objects.</Text>
                    </View>
                    <LinearButton buttonTitle="Let's Start" onPress={()=>{navigation.navigate('login')
                    }}/>
               </View>
            )
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                    {renderContent()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    }
})
export default OnBoarding;