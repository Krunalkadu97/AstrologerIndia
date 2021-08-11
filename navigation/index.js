//import liraries
import React,{useEffect,useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {TouchableOpacity,View,StyleSheet} from 'react-native'
import {Ionicons,FontAwesome5,Entypo,MaterialCommunityIcons,FontAwesome} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';
import {AddMonney, AddressAdd, AddressEdit, Article, ArticleDetail, Ask, Astro, AstroRating, Astroyogi, Calling, Card, Cart, CategoryDetail, Chat, CheckOut, Consultation, EditProfile, FavouriteList, Help, Home,Horoscope,Notification,OnlineConsultation,Order,OrderDetails,Payment,PaymentStatus,PDetails,Preview,Privacy,ProductRating,Products,Profile, Query, Search, SelectAddress, StockMarket, Transaction, Update, UpdateDetails, UploadFile, ViewAll, Wallet, ZodiacSign} from '../screens'
import { COLORS } from './../constants/theme';
import Wishlist from './../screens/Cart/Wishilst';


const Stack =createStackNavigator();
const BotTab  = createBottomTabNavigator();
const HRight=({...rest})=>{
    return(
        <View style={{flexDirection:'row',marginRight:15,justifyContent:'space-between'}}>
                               
                                <TouchableOpacity
                                {...rest}
                                style={{marginLeft:12}}>
                                    <FontAwesome5 name='bell' size={24} color={COLORS.main}/>
                                </TouchableOpacity>
                               
        </View>
    )
}
// create a component
const Router = () => {
    const navigation=useNavigation();
    return (
        <Stack.Navigator>
         <Stack.Screen name='HomeScreen' component={Bottom}
                options={{
                    headerLeft:()=>{
                        return(
                            <Ionicons.Button name='menu' size={28} color={COLORS.main}
                                onPress={()=>{navigation.openDrawer();}}
                            style={{backgroundColor:COLORS.white}}></Ionicons.Button>                           
                        )
                    },
                    headerRight:()=>{
                        return(
                            <HRight onPress={()=>{navigation.navigate('Notification')}}/>
                             )
                    },
                    headerTintColor:COLORS.main,
                    title:'ASTROLOGERS INDIA',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Notification' component={Notification}
                options={{                   
                    title:'Notification',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='EditProfile' component={EditProfile}
                options={{                   
                    title:'Profile Update',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='UpdateDetail' component={UpdateDetails}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Horoscope' component={Horoscope}
                options={{                   
                    title:'HoroScope Details',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Privacy' component={Privacy}
                options={{                   
                    title:'HoroScope Details',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
             <Stack.Screen name='About' component={Astro}
                options={{                   
                    title:'About Astrologer India',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Update' component={Update}
                options={{                   
                    title:'Weekly Updates',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Article' component={Article}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='ArticleDetail' component={ArticleDetail}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Ask' component={Ask}
               options={{                   
                    title:'What can Ask ?',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
             <Stack.Screen name='Help' component={Help}
               options={{                   
                    title:'Help and Support',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='PDetails' component={PDetails}
               options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Wallet' component={Wallet}
               options={{                   
                    title:'Wallet',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Transaction' component={Transaction}
               options={{                   
                    title:'Transaction Details',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='AddMoney' component={AddMonney}
               options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Card' component={Card}
               options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Payment' component={Payment}
               options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='OrderP' component={PaymentStatus}
               options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Search' component={Search}
                options={{                   
                    title:'Astrologer Search',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='CategoryDetail' component={CategoryDetail}
                options={{                   
                    title:'Astrologer Search',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
             <Stack.Screen name='Call' component={Calling}
                options={{                   
                    title:'Calling',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Chat' component={Chat}
                options={{                   
                    title:'Astro Chat',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Astroyogi' component={Astroyogi}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='ViewAll' component={ViewAll}
                options={{                   
                    title:'Astrologer Available',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Consult' component={Consultation}
                options={{                   
                    title:'My Consultation',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Fav' component={FavouriteList}
                options={{                   
                    title:'Favourite Astrologer',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Order' component={Order}
                options={{                   
                    title:'My Order',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='selectAdd' component={SelectAddress}
                options={{                   
                    title:'Select Check out Address',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Addad' component={AddressAdd}
                options={{                   
                    title:'Add Address',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='AddEd' component={AddressEdit}
                options={{                   
                    title:'Edit Address',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Checkout' component={CheckOut}
                options={{                   
                    title:'Check Out',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Wishlist' component={Wishlist}
                options={{                   
                    title:'Wishlist',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='Odetails' component={OrderDetails}
                options={{                   
                    title:'Order Details',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='VReview' component={Preview}
                options={{                   
                    title:'All Review',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='prating' component={ProductRating}
                options={{                   
                    title:'Product Rating',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='arating' component={AstroRating}
                options={{                   
                    title:'Astrologer Rating',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='query' component={Query}
                options={{                   
                    title:'Query',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
            <Stack.Screen name='FileUp' component={UploadFile}
                options={{                   
                    title:'File Upload',
                    headerTitleStyle:{fontSize:16,fontFamily:'Bitter_Bold'}
                }}
            />
        </Stack.Navigator>
    );
};
const Bottom = () =>{
    
    return(
        <BotTab.Navigator tabBarOptions={{
            activeTintColor:'#eb4034',
            style:{justifyContent:'center',alignItems:'center'}
        }}>
            <BotTab.Screen name='Home' component={Home}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome5 name="home" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        )
                        
                }}
            />
            <BotTab.Screen name='OnlineConsultation' component={OnlineConsultation}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <Ionicons name="library" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        )
                        
                }}
            />
            <BotTab.Screen name='StockM' component={StockMarket}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome name="bitcoin" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        )
                        
                }}
            />
            <BotTab.Screen name='Products' component={Products}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome5 name="shopping-bag" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        )
                        
                }}
            />
            <BotTab.Screen name='Zodiac' component={ZodiacSign}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome5 name="hand-sparkles" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        ),
                        }}
            />
            <BotTab.Screen name='Profile' component={Profile}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome5 name="user-circle" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        ),
                        }}
            />
            <BotTab.Screen name='Cart' component={Cart}
                options={{
                          title:'',
                    tabBarIcon:({color})=>(
                        <FontAwesome5 name="shopping-cart" size={25} color={color} style={{justifyContent:'center',alignItems:'center'}}/>
                        ),
                       
                        }}
            />
        </BotTab.Navigator>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Router;
