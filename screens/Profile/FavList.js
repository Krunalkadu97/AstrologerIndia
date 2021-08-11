//import liraries
import React, { useEffect, useState,useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, Platform, Animated, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons, Entypo, FontAwesome5, AntDesign, FontAwesome,MaterialIcons} from 'react-native-vector-icons';
import { COLORS,SIZES } from './../../constants/theme';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import FlipCard from 'react-native-flip-card'
import { showMessage } from "react-native-flash-message";
// create a component
const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
  
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

const FavouriteList = ({navigation}) => {
    const [callvisible, setCallVisible] = useState(false);
    const [astro, setAstro] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.users)

    const getAstro = () => {
        const myHeaders = new Headers();
        myHeaders.append("type", "1");
        
        const formdata = new FormData();
        formdata.append("user_id", userId);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/get_wishlist_astro_detail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.responce===true){
                    setAstro(result.data);
                }else{
                    setAstro(0)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
    }
    useEffect(()=>{
        getAstro();
    },[navigation])

    const removeWishlist = (item) => {
        const myHeadersre = new Headers();
        myHeadersre.append("type", "1");
        
        const formdatare = new FormData();
        formdatare.append("wishlist_id", item);
        
        const requestOptionsre = {
          method: 'POST',
          headers: myHeadersre,
          body: formdatare,
          redirect: 'follow'
        };
        
        fetch("https://www.srpulses.com/astroger/Api/remove_wishlist_item", requestOptionsre)
          .then(response => response.json())
          .then(result => {
            if(result.responce===true){
              showMessage({
                message: 'Remove from Favourite List',
                type: "danger",
              });
              getAstro();
            }else{
              showMessage({
                message: 'unable to remove from Favourite List',
                type: "warning",
              });
              console.error('error to delete')
            }
          })
          .catch(error => console.log('error', error));
      }

    const renderItem = ({ item }) => (
        <FlipCard 
    style={[styles.shadow,{
                 margin:5,
                 flex:1,
                 alignItems:'center',
                 maxWidth:SIZES.width*0.5,
                 height:Platform.OS==='android'?SIZES.height*0.28:SIZES.height*0.29,
                 backgroundColor:'#fff',
                 borderRadius:20,
                paddingBottom:20,           
                }]}
    friction={6}
    perspective={1000}
    flipHorizontal={true}
    flipVertical={false}
    flip={false}
    clickable={true}
    onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
  >
    {/* Face Side */}
    <View style={[{
                
                 flex:1,
                 alignItems:'center',
                 maxWidth:SIZES.width*0.5,
                 height:SIZES.height*0.28,
                 backgroundColor:'#fff',
                 borderRadius:20,
                paddingBottom:20, 
                elevation:1             
                }]}>  
                {
                  item.image =='' ?
                  <Image
                  source={{uri:'https://static.thenounproject.com/png/17241-200.png'}}
                  style={{
                     height:140,width:SIZES.width*0.45,borderTopLeftRadius:20,borderTopRightRadius:20
                  }}
                  resizeMode='cover'
                  />:
                  <Image
                  source={{uri:item.image}}
                  style={{
                     height:140,width:SIZES.width*0.45,borderTopLeftRadius:20,borderTopRightRadius:20
                  }}
                  resizeMode='cover'
                  />
                }
                <TouchableOpacity style={{
        width: 40, height: 40,borderRadius:20, backgroundColor:'rgba(255,248,242,0.8)',
        justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 5, right: 5
      }} onPress={() => { removeWishlist(item.id)}}>
<Ionicons name='ios-heart-dislike-circle-outline' color={COLORS.bgcolor} size={35} />
                </TouchableOpacity>
             <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.black,fontFamily:'Bitter_Bold'}}>{item.name}</Text>   
             {item.expertise=='' ? 
             <Text style={{fontWeight:'200',fontSize:14,color:COLORS.gray,textAlign:'left'}}>Astrologer</Text>:
             <Text style={{fontWeight:'200',fontSize:14,color:COLORS.gray,textAlign:'left'}}>{item.expertise}</Text>} 
   
    </View>
    {/* Back Side */}
    <View style={[{
                
                 flex:1,
                 alignItems:'center',
                 maxWidth:SIZES.width*0.5,
                 height:SIZES.height*0.28,
                 backgroundColor:'#fff',
                 borderRadius:20,
                paddingBottom:20, 
                elevation:1             
                }]}>
      <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.black,fontFamily:'Bitter_Bold',paddingTop:15}}>{item.name}</Text>   
             {item.expertise=='' ? 
             <Text style={{fontWeight:'200',fontSize:14,color:COLORS.gray,textAlign:'left'}}>Astrologer</Text>:
             <Text style={{fontWeight:'200',fontSize:14,color:COLORS.gray,textAlign:'left'}}>{item.expertise}</Text>} 
             <View style={{flexDirection:'column'}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',color:COLORS.gray}}>Rating</Text>
                            <Text style={{fontWeight:'600',fontSize:14,marginVertical:2,marginHorizontal:10,color:'#000',padding:8,backgroundColor:'#F5F5F5',borderRadius:8}}>
                                                  {item.rating=='' ? (<Text>Null</Text>):(<Text><AntDesign name='star' color='#FFAE19' size={14}/>{' '}{item.rating}/5</Text>)}
                          </Text>
                          </View>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{fontWeight:'bold',color:COLORS.gray}}>Charges</Text>
                          {item.charge=='' ? (<Text style={{fontWeight:'600',fontSize:14,marginVertical:2,marginHorizontal:5,color:'#000',padding:8,backgroundColor:'#F5F5F5',borderRadius:8}}>
                              <FontAwesome name='rupee' color='#000' size={14}/>{' '}0.0 /min
                          </Text>):(<Text style={{fontWeight:'600',fontSize:14,marginVertical:2,marginHorizontal:5,color:'#000',padding:8,backgroundColor:'#F5F5F5',borderRadius:8}}>
                              <FontAwesome name='rupee' color='#000' size={14}/>{' '}{item.charge} /min
                          </Text>)}
                          </View>
                         
                      </View>
                      {item.status==1?(
                        <View>
                                {
                                  item.status_service === '4' ?
                                  <View style={[styles.chBox,{paddingHorizontal:15}]}>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#FFAE19' }]}
                                onPress={() => { navigation.navigate('Chat')}}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#228b22' }]}
                                onPress={() => setCallVisible(true)}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>:<View>
                              {
                                item.status_service === '1' ? 
                                <View style={styles.chBox}>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#FFAE19',width:100,height:30,borderRadius:10}]}
                                onPress={() => { navigation.navigate('Chat')}}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#228b22',width:100,height:30,borderRadius:10 }]}
                                onPress={() => setCallVisible(true)}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>
                              }
                            </View>
                                }
                            </View>
  ):(
    <View>
                                {
                                  item.status_service === '4' ?
                                  <View style={[styles.chBox,{paddingHorizontal:15}]}>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red' }]}
                                onPress={() => { }}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red' }]}
                                onPress={() => {}}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>:<View>
                              {
                                item.status_service === '1' ? 
                                <View style={styles.chBox}>
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:100,height:30,borderRadius:10}]}
                                onPress={() => { }}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:100,height:30,borderRadius:10 }]}
                                onPress={() => {}}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>
                              }
                            </View>
                                }
                            </View>
  )}
  <ModalPoup visible={callvisible}>
                          <View style={{alignItems: 'center'}}>
  
                          <View style={styles.header}>
                          <Text style={{fontWeight:'bold',marginLeft:10}}>Call Options</Text>
                              <TouchableOpacity onPress={() => setCallVisible(false)}>
                                <Entypo name='cross' size={32} color={'#000'}/>
                              </TouchableOpacity>
                          </View>
                          </View>
                          {
                          item.status_service === '4' ? 
                          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                          <TouchableOpacity
                            style={styles.bBox}
                            onPress={() => {  setCallVisible(false), navigation.navigate('Call') }
                            }>
                            <FontAwesome5 name='video' size={30} color={'#000'} />

                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.bBox}

                            onPress={() => { setCallVisible(false), navigation.navigate('Call') }}
                          >
                            <FontAwesome5 name='phone-alt' size={30} color={'#000'} />

                          </TouchableOpacity>
                        </View>:
                        <View>
                          {
                            item.status_service === '2' ? 
                            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                          <TouchableOpacity
                            style={styles.bBox}
                            onPress={() => { setCallVisible(false), navigation.navigate('Call') }
                            }>
                            <FontAwesome5 name='video' size={30} color={'#000'} />

                          </TouchableOpacity>
                          
                        </View>:
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                          
                          <TouchableOpacity
                            style={styles.bBox}

                            onPress={() => { setCallVisible(false), navigation.navigate('Call') }}
                          >
                            <FontAwesome5 name='phone-alt' size={30} color={'#000'} />

                          </TouchableOpacity>
                        </View>
                          }
                        </View>
                        }
                      </ModalPoup>
                      <TouchableOpacity style={{marginTop:-12}} onPress={()=>navigation.navigate('Astroyogi',{item})}>
                      <Text style={{color:COLORS.primary,fontWeight:'bold'}}>View Details</Text>
                  </TouchableOpacity>
    </View>
    
  </FlipCard>
      )
    return (
        <View style={styles.container}>
        <Loader loading={loading}/>
            {
                astro.length === undefined ? <View style={styles.container}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJ-rnSWyRaIHqpsIrW-SreRrRyMtVeO8JDA&usqp=CAU' }}
                        style={{ width: '100%', height: 300 }}
                        resizeMode='contain'
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.bgcolor, paddingVertical: 10, textAlign: 'center' }}>No Favourite Astrologer yet...!</Text>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: COLORS.gray, paddingVertical: 10, textAlign: 'center', paddingHorizontal: 15 }}>Add your Favourite astrologer. To solve your problem by consultation.</Text>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: COLORS.bgcolor, marginTop: -10, textAlign: 'center' }}>@AstrologerIndia</Text>
                </View> :
                    <View style={styles.container}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'right', paddingVertical: 10, paddingRight: 10 }}>Favourite Astrologer Count : ({astro.length})</Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={astro}
                                keyExtractor={({ id }, index) => id}
                                renderItem={renderItem}
                                numColumns={2}
                            />
                        </View>
                    </View>
            }
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    bBox:{
      backgroundColor: '#f7f7f7',
      elevation: 5,
      margin: 10,
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    circle:{ 
      width: '40%', 
      height: 30, 
      backgroundColor: 'red', 
      elevation: 4, margin: 1, 
      alignItems: 'center', justifyContent: 'center',
       borderRadius: 8 
      },
      chBox:{ 
        flexDirection: 'row', 
        width: '92%', height: 45, 
        justifyContent: 'space-between', 
        marginTop: 5, 
        paddingHorizontal: 10
      }
});

//make this component available to the app
export default FavouriteList;
