import React, { useRef } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, Platform, Animated, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons, Entypo, FontAwesome5, AntDesign, FontAwesome } from 'react-native-vector-icons';
import { COLORS, SIZES } from './../../constants/theme';
import FlipCard from 'react-native-flip-card'
import {useSelector} from 'react-redux'
import FavAstroIcon from '../../components/AstroFav';
import { showMessage } from "react-native-flash-message";
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
//API data fetch object
const myHeaders = new Headers();
myHeaders.append("type", "1");
const formdata = new FormData();
formdata.append("id", "1");
const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const caformdata = new FormData();
caformdata.append("id", "2");

const carequestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: caformdata,
  redirect: 'follow'
};
const CategoryURL = "https://www.srpulses.com/astroger/Api/get_category";
const AstroURL = "https://www.srpulses.com/astroger/Api/get_astrologer";

const ViewAll = ({ navigation }) => {
  const [callvisible, setCallVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [databa, setDataBa] = React.useState([]);
  const [astro, setAstro] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [allPress, setAllPress] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [wishCount,setWishCount]=React.useState(0); 
  const flipcard = useRef();
  const userId=useSelector(state=>state.users);
  const fetchCategory = () => {
    fetch(CategoryURL, carequestOptions)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)
      )
      .finally(setLoading.bind(undefined, false));
  };
  const getAstro = () => {
    fetch(AstroURL, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setAstro(json);
        setDataBa(json);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }

  const getWish = () => {
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
              setWishCount(result.data.length);
            }else{
              setWishCount(0)
            }
        })
        .catch(error => console.log('error', error));
        
  }

  React.useEffect(() => {
    fetchCategory();
    getAstro();
    getWish();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategory();
      getAstro();
      getWish();
  });
  return unsubscribe;
  }, [])

  const onAll = () => {
    const newData = databa;
    setAstro(newData);
    setSelectedCategory(null);
    setAllPress(true);
  };

  function onSelectCategory(category) {
    //filter restaurant
    let newData = databa.filter(a => a.category == category.category)

    setAstro(newData)
    setSelectedCategory(category)
    setAllPress(false);
  }

  const add_fav = (e) => {
    const myHeadersf = new Headers();
    myHeadersf.append("type", "1");
    
    const formdataf = new FormData();
    formdataf.append("user_id", userId);
    formdataf.append("astroger_id", e.user_id);
    formdataf.append("type", "1");

    const requestOptionsf = {
      method: 'POST',
      headers: myHeadersf,
      body: formdataf,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/add_astro_wishlist", requestOptionsf)
      .then(response => response.json())
      .then(result => {
        if(result.responce===true){
          showMessage({
            message: 'Added to Favourite List',
            type: "success",
          });
          getWish();
        }else{
          showMessage({
            message: 'Already in Favourite List',
            type: "warning",
          });
        
        }
      })
      .catch(error => console.log('error', error));
  }

  function renderHeader() {
    return (
      <View>

        <View style={styles.filterBox}>
          <TouchableOpacity style={[styles.fBox, { borderColor: allPress ? COLORS.main : COLORS.gray }]} onPress={onAll}>
            <Text style={{ color: allPress ? COLORS.main : COLORS.gray }}>All</Text>
          </TouchableOpacity>
          <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (

              <TouchableOpacity style={[styles.fBox, { borderColor: (selectedCategory?.category == item.category) ? COLORS.main : COLORS.gray }]} key={index} onPress={() => onSelectCategory(item)}>
                <Text style={{ color: (selectedCategory?.category == item.category) ? COLORS.main : COLORS.gray }}>{item.category}</Text>
              </TouchableOpacity>

            )
            }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

    )
  }

  function renderList() {
    const renderItem = ({ item }) => (
      <FlipCard
        style={[styles.shadow, {
          margin: 5,
          flex: 1,
          alignItems: 'center',
          maxWidth: SIZES.width * 0.5,
          height: Platform.OS === 'android' ? SIZES.height * 0.27 : SIZES.height * 0.29,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingBottom: 20,
        }]}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
      >
        {/* Face Side */}
        <View style={[{
          margin: 5,
          flex: 1,
          alignItems: 'center',
          maxWidth: SIZES.width * 0.5,
          height: SIZES.height * 0.27,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingBottom: 20,
        }]}>
          {
            item.image == '' ?
              <Image
                source={{ uri: 'https://static.thenounproject.com/png/17241-200.png' }}
                style={{
                  height: 140, width: SIZES.width * 0.45, borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}
                resizeMode='cover'
              /> :
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 140, width: SIZES.width * 0.45, borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}
                resizeMode='cover'
              />
          }
          <TouchableOpacity style={{
            width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,248,242,0.8)',
            justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 5, right: 5, elevation: 5
          }} onPress={() => { add_fav(item) }}>
            <Ionicons name='heart' color={COLORS.bgcolor} size={25} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, fontFamily: 'Bitter_Bold' }}>{item.name}</Text>
          {item.expertise == '' ?
            <Text style={{ fontWeight: '200', fontSize: 14, color: COLORS.gray, textAlign: 'left' }}>Astrologer</Text> :
            <Text style={{ fontWeight: '200', fontSize: 14, color: COLORS.gray, textAlign: 'left' }}>{item.expertise}</Text>}

        </View>
        {/* Back Side */}
        <View style={[{
          margin: 5,
          flex: 1,
          alignItems: 'center',
          maxWidth: SIZES.width * 0.5,
          height: SIZES.height * 0.27,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingBottom: 20,
        }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, fontFamily: 'Bitter_Bold', paddingTop: 15 }}>{item.name}</Text>
          {item.expertise == '' ?
            <Text style={{ fontWeight: '200', fontSize: 14, color: COLORS.gray, textAlign: 'left' }}>Astrologer</Text> :
            <Text style={{ fontWeight: '200', fontSize: 14, color: COLORS.gray, textAlign: 'left' }}>{item.expertise}</Text>}
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Rating</Text>
              <Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 10, color: '#000', padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
                {item.rating == '' ? (<Text>Null</Text>) : (<Text><AntDesign name='star' color='#FFAE19' size={14} />{' '}{item.rating}/5</Text>)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.gray }}>Charges</Text>
              {item.charge == '' ? (<Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 5, color: '#000', padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
                <FontAwesome name='rupee' color='#000' size={14} />{' '}0.0 /min
              </Text>) : (<Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 5, color: '#000', padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
                <FontAwesome name='rupee' color='#000' size={14} />{' '}{item.charge} /min
              </Text>)}
            </View>

          </View>
          {item.status == 1 ? (
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
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#FFAE19',width:100,height:35,borderRadius:10}]}
                                onPress={() => { navigation.navigate('Chat')}}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#228b22',width:100,height:35,borderRadius:10 }]}
                                onPress={() => setCallVisible(true)}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>
                              }
                            </View>
                                }
                            </View>
          ) : (
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
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:100,height:35,borderRadius:10}]}
                                onPress={() => { }}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:100,height:35,borderRadius:10 }]}
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
            <View style={{ alignItems: 'center' }}>

              <View style={styles.header}>
                <Text style={{ fontWeight: 'bold', marginLeft: 40 }}>Call Options</Text>
                <TouchableOpacity onPress={() => setCallVisible(false)}>
                  <Entypo name='cross' size={32} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
            {
                          item.status_service === '4' ? 
                          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                          <TouchableOpacity
                            style={styles.bBox}
                            onPress={() => { addConsultation(item), setCallVisible(false), navigation.navigate('Call') }
                            }>
                            <FontAwesome5 name='video' size={30} color={'#000'} />

                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.bBox}

                            onPress={() => { addConsultation(item), setCallVisible(false), navigation.navigate('Call') }}
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
                            onPress={() => { addConsultation(item), setCallVisible(false), navigation.navigate('Call') }
                            }>
                            <FontAwesome5 name='video' size={30} color={'#000'} />

                          </TouchableOpacity>
                          
                        </View>:
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                          
                          <TouchableOpacity
                            style={styles.bBox}

                            onPress={() => { addConsultation(item), setCallVisible(false), navigation.navigate('Call') }}
                          >
                            <FontAwesome5 name='phone-alt' size={30} color={'#000'} />

                          </TouchableOpacity>
                        </View>
                          }
                        </View>
                        }
          </ModalPoup>
          <TouchableOpacity style={{position:'absolute',top:-4,right:2,width:30,height:30,
          justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Astroyogi',{item})}>
                      <FontAwesome name='list-alt' color={COLORS.bgcolor} size={25} />
          </TouchableOpacity>
        </View>

      </FlipCard>
    )
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        {isLoading ? <ActivityIndicator size="large" color="#eb4034" /> :
          <FlatList
            data={astro}
            keyExtractor={item => item.user_id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 10 }}
          />

        }
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView style={{ flex: 1 }}>
        {renderList()}
      </ScrollView>
      <TouchableOpacity style={{width:40,height:40,borderRadius:20,paddingLeft:10,paddingTop:9,
      justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.24)',position:'absolute',
      top:35,right:1}}>
          <FavAstroIcon cartCount={wishCount}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ViewAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBox: {
    flexDirection: 'row',
  },
  fBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 30,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderWidth: 0.6, margin: 5
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5
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
})