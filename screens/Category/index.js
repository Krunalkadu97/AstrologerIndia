//import liraries
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Animated, Modal, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5, Entypo, FontAwesome, AntDesign } from 'react-native-vector-icons'
import { useDispatch } from 'react-redux'
import { ADD_CONSULTATION } from '../../ReduxStore/CartItem';
import { COLORS, SIZES, FONTS } from './../../constants/theme';
import { useSelector } from 'react-redux'
import FavAstroIcon from '../../components/AstroFav';
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
//API Credentials

const FilterView = ({ btext, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.fBox}
      {...rest}
    >
      <Text>{btext}</Text>
    </TouchableOpacity>
  )
}
const CategoryDetail = ({ navigation, route }) => {
  const [astrologer, setAstrologer] = useState(null);
  const [callvisible, setCallVisible] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [databa, setDataBa] = useState([]);
  const [allPress, setAllPress] = useState(true);
  const [chatPress, setChatPress] = useState(false);
  const [callPress, setCallPress] = useState(false);
  const [video, setVideo] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [both,setBoth]= useState(false);
  const userId = useSelector(state => state.users);

  const fetchData = (e) => {
    const myHeadersc = new Headers();
    myHeadersc.append("type", "1");


    const formdatac = new FormData();
    formdatac.append("category", e);

    const requestOptionsc = {
      method: 'POST',
      headers: myHeadersc,
      body: formdatac,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_cat_astrologer", requestOptionsc)
    .then((response) => response.json())
    .then((json) => {
      if(json.responce===true){
        setData(json.data);
        setDataBa(json.data);
      }else{
        setData(0);
      setDataBa(0);
      }
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
        if (result.responce === true) {
          setWishCount(result.data.length);
        } else {
          setWishCount(0)
        }
      })
      .catch(error => console.log('error', error));

  }

  React.useEffect(() => {
    let { item } = route.params;
    setAstrologer(item);
    fetchData(item.category);
    getWish();
    const unsubscribe = navigation.addListener('focus', () => {      
      getWish();
    });
    return unsubscribe;
  }, [navigation])


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
        if (result.responce === true) {
          showMessage({
            message:'Added to Favourite List',
            type: "success",
          });
          getWish();
        } else {
          showMessage({
            message:'Astrologer Already in Favourite List',
            type: "warning",
          });
          console.log('error')
        }
      })
      .catch(error => console.log('error', error));
  }
  const dispatch = useDispatch()
  const addConsultation = item => dispatch({ type: ADD_CONSULTATION, payload: item })
  const onAll = () => {
    const newData = databa;
    setData(newData);
    setAllPress(true);
    setCallPress(false);
    setChatPress(false);
    setVideo(false);
    setIsAvailable(false);
    setBoth(false);
  };
  const onChat = () => {
    const newData = databa.filter((item) => {
      return item.status_service === '1';
    });
    setData(newData);
    setAllPress(false);
    setCallPress(false);
    setChatPress(true);
    setVideo(false);
    setIsAvailable(false);
    setBoth(false);
  };
  const onCall = () => {
    const newData = databa.filter((item) => {
      return item.status_service === '3';
    });
    setData(newData);
    setAllPress(false);
    setCallPress(true);
    setChatPress(false);
    setVideo(false);
    setIsAvailable(false);
    setBoth(false);
  };
  const onVideoCall = () => {
    const newData = databa.filter((item) => {
      return item.status_service === '2';
    });
    setData(newData);
    setAllPress(false);
    setCallPress(false);
    setChatPress(false);
    setVideo(true);
    setIsAvailable(false);
    setBoth(false);
  };
  const All_service=()=>{
    const newData = databa.filter((item) => {
      return item.status_service == '4';
    });
    setData(newData);
    setAllPress(false);
    setCallPress(false);
    setChatPress(false); 
    setVideo(false);
    setIsAvailable(false);
    setBoth(true);
  }
  const Available=()=>{
    const newData = databa.filter((item) => {
      return item.status == '1';
    });
    setData(newData);
    setAllPress(false);
    setCallPress(false);
    setChatPress(false); 
    setVideo(false);
    setIsAvailable(true);
    setBoth(false);
  }
  function renderHeader() {
    return (
      <View style={styles.hSty}>

        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }} showsHorizontalScrollIndicator={false}>
          <View style={styles.filBox}>
            <TouchableOpacity style={[styles.fBox, { borderColor: allPress ? COLORS.main : COLORS.gray }]} onPress={onAll}>
              <Text style={{ color: allPress ? COLORS.main : COLORS.gray }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.fBox, { borderColor: chatPress ? COLORS.main : COLORS.gray }]} onPress={onChat}>
              <Text style={{ color: chatPress ? COLORS.main : COLORS.gray }}>On Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.fBox, { borderColor:  callPress ? COLORS.main : COLORS.gray }]} onPress={onCall}>
              <Text style={{ color:   callPress ? COLORS.main : COLORS.gray }}>On Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.fBox, { borderColor:  video ? COLORS.main : COLORS.gray }]} onPress={onVideoCall}>
              <Text style={{ color:  video ? COLORS.main : COLORS.gray }}>On Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.fBox, { borderColor:  both ? COLORS.main : COLORS.gray }]} onPress={All_service}>
              <Text style={{ color:  both ? COLORS.main : COLORS.gray }}>All Media</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.fBox, { borderColor:  isAvailable ? COLORS.main : COLORS.gray }]} onPress={Available}>
              <Text style={{ color:  isAvailable ? COLORS.main : COLORS.gray }}>Available</Text>
            </TouchableOpacity>
            <FilterView btext='Search' onPress={() => navigation.navigate('Search')} />

          </View>
        </ScrollView>
      </View>
    )
  }
  function renderAstrologerList() {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" color="#eb4034" /> :
          <View style={styles.container}>
            {
              data.map((item, index) => (

                <TouchableOpacity
                  key={`astrologer-${index}`}
                  onPress={() => navigation.navigate('Astroyogi', { item })}>

                  <View style={styles.filBox}>
                    <View style={styles.imageContainer}>
                      {
                        item.image == '' ? (
                          <Image
                            source={{ uri: 'https://static.thenounproject.com/png/17241-200.png' }}
                            style={styles.image}
                          />
                        ) : (
                          <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                          />
                        )
                      }
                      <View >
                        {
                          item.status == 1 ? (
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
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#FFAE19',width:60,borderRadius:10}]}
                                onPress={() => { navigation.navigate('Chat')}}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: '#228b22',width:60,borderRadius:10 }]}
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
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:60,borderRadius:10}]}
                                onPress={() => { }}>
                                <Ionicons name='md-chatbubbles' size={18} color={'#fff'} />
                              </TouchableOpacity>                              
                            </View>:
                            <View style={styles.chBox}>                              
                              <TouchableOpacity style={[styles.shadow, styles.circle, { backgroundColor: 'red',width:60,borderRadius:10 }]}
                                onPress={() => {}}>
                                <FontAwesome5 name='phone-alt' size={18} color={'#fff'} />
                              </TouchableOpacity>
                            </View>
                              }
                            </View>
                                }
                            </View>
                            
                          )
                        }
                      </View>
                      <ModalPoup visible={callvisible}>

                        <View style={styles.header}>
                          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Call Options</Text>
                          <TouchableOpacity onPress={() => setCallVisible(false)}>
                            <Entypo name='cross' size={32} color={'#000'} />
                          </TouchableOpacity>
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
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text style={styles.htext}>{item.name}</Text>
                      {item.speciality == '' ? (<Text style={styles.stext}>Not Mention yet</Text>) : (<Text style={{ fontWeight: '900', fontSize: 14, color: 'grey' }}>{item.speciality}</Text>)}
                      {item.experience == '' ? (<Text style={styles.stext}>No experience yet, New</Text>) : (<Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, color: 'grey' }}>{item.experience} of experience</Text>)}
                      {item.charge == '' ? (<Text style={styles.stext}>
                        <FontAwesome name='rupee' color='#000' size={14} />{' '}0.0 /min
                      </Text>) : (<Text style={styles.stext}>
                        <FontAwesome name='rupee' color='#000' size={14} />{' '}{item.charge} /min
                      </Text>)}
                      <View style={styles.like}>

                        {item.rating == '' ? (<Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 10, color: '#000', padding: 10, backgroundColor: '#cfcfcf', borderRadius: 8 }}>New</Text>) : (<Text style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 10, color: '#000', padding: 5, paddingHorizontal: 10, backgroundColor: COLORS.white, borderRadius: 8 }}>
                          <AntDesign name='star' color='#FFAE19' size={14} />{' '}{item.rating}/5
                        </Text>)}

                        <TouchableOpacity onPress={() => { add_fav(item) }} style={{ fontWeight: '600', fontSize: 14, marginVertical: 2, marginHorizontal: 10, color: '#000', padding: 5, backgroundColor: 'rgba(255,255,255,0.58)', borderRadius: 8 }}>
                          <Ionicons name='heart' color={COLORS.bgcolor} size={25} />

                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.seperator} />
                </TouchableOpacity>
              ))
            }
          </View>
        }
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {renderHeader()}
        {renderAstrologerList()}
        <TouchableOpacity style={{
          position: 'absolute', top: 75, right: 10, width: 40, height: 40,
          borderRadius: 20, justifyContent: 'center', alignItems: 'center'
        }}>
          <FavAstroIcon cartCount={wishCount} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 50
  },
  hSty: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center'
  },
  like: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingHorizontal: 20 },
  filBox: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5 },
  bBox: {
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
  htext: {
    ...FONTS.body3 * 1.3,
    fontWeight: 'bold',
    color: COLORS.black
  },
  stext: {
    ...FONTS.body3,
    color: COLORS.gray
  },
  chBox: { flexDirection: 'row', width: '100%', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  fBox: { justifyContent: 'center', alignItems: 'center', borderRadius: 8, height: 30, width: 120, backgroundColor: COLORS.white, borderWidth: 0.6, margin: 5 },
  container: {
    flex: 1,
    padding: 5
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 4
  },
  imageContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1
  },
  circle: {
    width: 40, height: 40,
    borderRadius: 25,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

//make this component available to the app
export default CategoryDetail;
