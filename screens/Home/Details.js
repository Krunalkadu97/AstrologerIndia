//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions, Share, Modal, Animated } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import { Fontisto, FontAwesome5, MaterialIcons, Ionicons, EvilIcons, Entypo } from 'react-native-vector-icons';
import { useDispatch } from 'react-redux'
import { ADD_CONSULTATION } from '../../ReduxStore/CartItem';
import { SIZES, COLORS } from '../../constants/theme';
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux'
import { showMessage } from "react-native-flash-message";
import FavAstroIcon from '../../components/AstroFav';

// create a component

const TimeModalPoup = ({ visible, children }) => {
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
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
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
const Astroyogi = ({ route, navigation }) => {
  const [wishCount, setWishCount] = useState(0);
  const [deShow, setDeShow] = useState(false);
  const [reShow, setReShow] = useState(false);
  const [loShow, setLoShow] = useState(false);
  const [laShow, setLaShow] = useState(false);
  const [tiShow, setTiShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const [astroyogis, setAstroyogi] = React.useState(null);
  const [review, setReview] = useState('');
  const [pRev, setRev] = useState('');
  const [like, setLike] = useState('');
  const userId = useSelector(state => state.users);
  const [ratmsg, setRatMsg] = useState('');
  const [status, setStatus] = useState('');
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

  const getReview = (e) => {
    const myHeadersrev = new Headers();
    myHeadersrev.append("type", "1");

    const formdatarev = new FormData();
    formdatarev.append("astroger_id", e);

    const requestOptionsrev = {
      method: 'POST',
      headers: myHeadersrev,
      body: formdatarev,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_reviews_astro", requestOptionsrev)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setReview(result.data);
          setRev(result.rating);
          setLike(result.like);
        } else {
          setReview(0);
          setRev(0);
          setLike(0);
        }
      })
      .catch(error => console.log('error', error));
  }

  React.useEffect(() => {
    let { item } = route.params;
    console.log(item.status_service)
    setStatus(item.status_service);
    setAstroyogi(item);
    getReview(item.user_id);
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
            message: 'Astrologer Added to Favourite List',
            type: "success",
          });
          getWish();
        } else {
          showMessage({
            message: 'Astrologer Already in Favourite List',
            type: "success",
          });
          console.log('error')
        }
      })
      .catch(error => console.log('error', error));
  }
  const callOptions = () => {
     if (status === "4" ) {
      return (
        <View>
          {
          astroyogis?.status === '1'?
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'space-between',width: '100%', paddingVertical: 8, paddingHorizontal: 10 }}>
      <TouchableOpacity
            style={[styles.btnCont,{backgroundColor:'#FFAE19'}]}
            onPress={() => { navigation.navigate('Chat') }}>
            <Ionicons name='md-chatbubbles' size={25} color={'#fff'} />
          </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCont,{backgroundColor:'#228b22'}]}
          onPress={() => setCallVisible(true)}>
          <FontAwesome5 name='phone-alt' size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>:
      <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'space-between',width: '100%', paddingVertical: 8, paddingHorizontal: 10 }}>
      <TouchableOpacity
            style={styles.btnCont}
            onPress={() => { }}>
            <Ionicons name='md-chatbubbles' size={25} color={'#fff'} />
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCont}
          onPress={() => {}}>
          <FontAwesome5 name='phone-alt' size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
          }
        </View>
      )
    }
    else if (status === '1') {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%', paddingVertical: 8, paddingHorizontal: 10 }}>
         {
          astroyogis?.status === '1' ?<TouchableOpacity
            style={[styles.btnCont,{backgroundColor:'#FFAE19'}]}
            onPress={() => { navigation.navigate('Chat') }}>
            <Ionicons name='md-chatbubbles' size={25} color={'#fff'} />
          </TouchableOpacity>:
          <TouchableOpacity
            style={styles.btnCont}
            onPress={() => {}}>
            <Ionicons name='md-chatbubbles' size={25} color={'#fff'} />
          </TouchableOpacity>
         } 
        </View>


      )
    }
    else if (status === "2" || "3") {
      return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',paddingVertical: 8, paddingHorizontal: 10 }}>
        {
          astroyogis?.status === '1' ?<TouchableOpacity
          style={[styles.btnCont,{backgroundColor:'#228b22'}]}
          onPress={() => setCallVisible(true)}>
          <FontAwesome5 name='phone-alt' size={25} color={'#fff'} />
        </TouchableOpacity>:
        <TouchableOpacity
          style={styles.btnCont}
          onPress={() => {}}>
          <FontAwesome5 name='phone-alt' size={25} color={'#fff'} />
        </TouchableOpacity>
        }
      </View>)
    }
    else{
      <View/>
    }
  }
  const checkReview = (e) => {

    const myHeadersrev = new Headers();

    const formdatarev = new FormData();
    formdatarev.append("user_id", userInfo);
    formdatarev.append("product_id", e.id);

    const requestOptionsrev = {
      method: 'POST',
      headers: myHeadersrev,
      body: formdatarev,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/review_porduct_check", requestOptionsrev)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.responce === true) {
          navigation.navigate('arating', { astroyogis })
        } else {
          setRatMsg('You will be eligible to rate this product once you buy it.');
        }
      })
      .catch(error => console.log('error', error));
  }


  const dispatch = useDispatch()
  const addConsultation = item => dispatch({ type: ADD_CONSULTATION, payload: item })

  function renderBody() {
    return (
      <View style={styles.container}>
        <HeaderBar titleText={astroyogis?.name} onPress={() => navigation.goBack()} />
        <TouchableOpacity style={{ position: 'absolute', top: 26, right: 20 }}>
          <FavAstroIcon cartCount={wishCount} />
        </TouchableOpacity>
        <View style={styles.Body}>
          <View style={[styles.shadowB, styles.imgC, { marginHorizontal: 10 }]}>
            {
              astroyogis?.image === '' ?
                <View>
                  <Image
                    source={{ uri: 'https://static.thenounproject.com/png/17241-200.png' }}
                    resizeMode='contain'
                    style={styles.img}
                  />
                </View> : <Image
                  source={{ uri: astroyogis?.image }}
                  resizeMode='contain'
                  style={styles.img}
                />
            }

          </View>
          <View style={{ padding: 15 }}>
            <Text style={styles.hText}>Acharya {' '}{astroyogis?.name}</Text>
            {astroyogis?.expertise == '' ? (<Text style={styles.sText}>Astrologer</Text>) : (<Text style={styles.sText}>{astroyogis?.expertise}</Text>)}
            {
              astroyogis?.status === '1'?<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:8}}>
                  <View style={{width:16,height:16,borderRadius:8,marginRight:10,backgroundColor:'green'}}/>
                  <Text style={{fontWeight:'bold',color:'green'}}>Available</Text>
              </View>:
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:8}}>
              <View style={{width:16,height:16,borderRadius:8,marginRight:10,backgroundColor:'red'}}/>
                  <Text style={{fontWeight:'bold',color:'red'}}>Busy</Text>
              </View>
            }
          </View>

          <View style={styles.boCont}>

            <View style={[styles.shadowB, styles.box, { padding: 8 }]}>
              <TouchableOpacity
                style={styles.iBo}
              >
                <FontAwesome5 name='thumbs-up' size={28} color={'#fff'} />

              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: '#000' }}>{like}</Text>
            </View>
            <View style={[styles.shadowB, styles.box, { padding: 8 }]}>
              <TouchableOpacity
                style={styles.iBo}
              >
                <EvilIcons name='star' size={35} color='white' />

              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: '#000' }}>{pRev}/5</Text>
            </View>
            <View style={[styles.shadowB, styles.box]}>
              <TouchableOpacity
                style={styles.iBo}
                onPress={() => { add_fav(astroyogis) }}
              >
                <EvilIcons name='heart' size={35} color='white' />

              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 10, width: '100%', textAlign: 'center' }}>Add to Favourite</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  function renderDetails() {
    return (
      <View style={styles.details}>
        <Text style={[styles.hText, { color: 'black', marginBottom: 15, fontSize: 16 }]}>About Astrologer</Text>
        {!deShow ? (
          <TouchableOpacity onPress={() => setDeShow(!deShow)}>
            <Text style={[styles.sText, { textTransform: 'none', fontSize: 13, paddingVertical: 4, paddingHorizontal: 15 }]} numberOfLines={2}>
              {astroyogis?.description || 'No Description yet'}
            </Text>
            <Text style={styles.hText, { paddingBottom: 6, textAlign: 'center' }}>Read More</Text>
          </TouchableOpacity>
        ) : null
        }
        {deShow ? (
          <View>
            <Text style={[styles.sText, { textTransform: 'none', fontSize: 13, paddingVertical: 10 }]}>
              {astroyogis?.description || 'No Description yet'}
            </Text>
            <TouchableOpacity onPress={() => setDeShow(!deShow)}>

              <Text style={styles.hText, { paddingBottom: 6, textAlign: 'center', color: COLORS.bgcolor }}>Show Less</Text>
            </TouchableOpacity>
          </View>


        ) : null
        }
        <View style={styles.sep} />
        <View style={styles.boBx}>
          <Text style={{ fontSize: 15, color: 'black', paddingLeft: 5, paddingVertical: 4 }}>Charges & Location</Text>
          <TouchableOpacity onPress={() => setLoShow(!loShow)}>
            <Entypo name='plus' color='gray' size={25} />
          </TouchableOpacity>
        </View>
        {loShow ? (
          <View style={{ flex: 1 }}>

            {astroyogis?.charge == '' ? (<Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>Charges :  0.0/min </Text>) : (<Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>Charges :  {astroyogis?.charge}/min </Text>)}
            <Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>Location : {astroyogis?.location}</Text>
          </View>

        ) : null}
        <View style={styles.sep} />
        <View style={styles.boBx}>
          <Text style={{ fontSize: 15, color: 'black', paddingLeft: 5, paddingVertical: 4 }}>Experience & Language</Text>
          <TouchableOpacity onPress={() => setLaShow(!laShow)}>
            <Entypo name='plus' color='gray' size={25} />
          </TouchableOpacity>
        </View>
        {laShow ? (
          <View style={{ flex: 1 }}>
            {astroyogis?.experience == '' ? (<Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>New Astro</Text>) : (<Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>Experience : {astroyogis?.experience}</Text>)}
            <Text style={[styles.sText, { textTransform: 'none', fontSize: 16, paddingVertical: 6, textAlign: 'right', paddingRight: 20 }]}>Can Speak : {astroyogis?.language}</Text>
          </View>

        ) : null}
        <View style={styles.sep} />
        <View style={styles.boBx}>
          <Text style={{ fontSize: 15, color: 'black', paddingLeft: 5, paddingVertical: 4 }}>Time Avialable</Text>
          <TouchableOpacity onPress={() => setTiShow(!tiShow)}>
            <Entypo name='plus' color='gray' size={25} />
          </TouchableOpacity>
        </View>
        {tiShow ? (
          <View>
            <Text style={{ fontSize: 16, color: 'gray', paddingVertical: 4, textAlign: 'right', paddingRight: 20 }}>{astroyogis?.time_slots}</Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}>
              <Text style={{ fontSize: 16, color: 'tomato', paddingVertical: 4, textAlign: 'right', paddingRight: 20 }}>Other Day Timing</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TimeModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>View All Timing</Text>
              <TouchableOpacity onPress={() => setVisible(false)}
              >
                <Entypo name='cross' size={32} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Tuesday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>

            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Wednesday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>
            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Thursday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>
            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Friday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>
            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Saturday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>
            <Text style={{ borderBottomColor: 'tomato', borderBottomWidth: 1, fontWeight: 'bold' }}>Sunday</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>07:00 AM - 10:30 AM</Text>
              <Text>12:00 PM - 6:00 PM</Text>
            </View>
          </View>

          <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
            Thank You
          </Text>
        </TimeModalPoup>
        <View style={styles.sep} />
        <View style={styles.boBx}>
          <Text style={{ fontSize: 15, color: 'black', paddingLeft: 5, paddingVertical: 4 }}>Review</Text>
          <TouchableOpacity onPress={() => setReShow(!reShow)}>
            <Entypo name='plus' color='gray' size={25} />
          </TouchableOpacity>
        </View>
        {reShow ?
          <View>
            <View>
              <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 16 }}>Add Review</Text>
              <View style={[styles.sep, { marginHorizontal: 10 }]} />
              <Image
                source={{ uri: 'https://i2.wp.com/sahpp.com/wp-content/uploads/2019/07/34-340452_5-gold-stars-png-transparent-background-5-stars.png?fit=757%2C320' }}
                style={{ width: '100%', height: 100 }}
                resizeMode='contain'
              />
              {
                ratmsg === '' ? <View /> :
                  <Text style={{ fontWeight: 'bold', color: COLORS.black, paddingHorizontal: 15, paddingVertical: 4, marginVertical: 5 }}>{ratmsg}</Text>
              }
              <TouchableOpacity style={{
                height: 35, backgroundColor: COLORS.gray,
                marginHorizontal: 60, justifyContent: 'center', alignItems: 'center',
                borderRadius: 15, marginVertical: 10
              }} onPress={() => navigation.navigate('arating', { astroyogis })}>
                <Text style={{ fontWeight: 'bold', color: COLORS.white }}>Write Review</Text>
              </TouchableOpacity>
            </View>
            {
              review ? <View>
                <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 16 }}>User Reviews and Ratings</Text>
                <View style={[styles.sep, { marginHorizontal: 10 }]} />
                {
                  review.length === 0 ?
                    <View style={{ flex: 1, padding: 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: COLORS.gray }}>No Review yet</Text>
                    </View> :
                    <View>
                      {
                        review.slice(0, 4).map((item, index) => (
                          <View style={{ flex: 1, padding: 10, borderRadius: 5, borderWidth: 0.2, borderColor: COLORS.bgcolor, margin: 2 }} key={index}>
                            <Text style={{ fontWeight: 'bold' }}>{item.comment} </Text>
                            <Text style={{ fontWeight: '900', color: COLORS.gray }}> Author : {item.first_name}{' '}{item.last_name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '900', color: COLORS.bgcolor }}>Rating : {item.rating}/5</Text>
                              <Text style={{ fontWeight: '900', color: COLORS.gray }}>Date : {item.date}</Text>
                            </View>

                          </View>
                        ))
                      }
                      {
                        review.length > 4 ? <View>
                          <TouchableOpacity onPress={() => navigation.navigate('VReview', { review })}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', textAlign: 'center', paddingVertical: 10 }}>View More</Text>
                          </TouchableOpacity>
                        </View> : <View />
                      }
                    </View>
                }
              </View> : <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: COLORS.gray }}>No Review yet</Text>
              </View>
            }
          </View>
          : null}
          {callOptions()}
        <ModalPoup visible={callvisible}>


          <View style={styles.header}>
          {
              astroyogis?.status_service === '4'?<Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Call Option</Text>:
              <View>
                {
                  astroyogis?.status_service === '3'?
                  <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Phone Call</Text>:
                  <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Video Call</Text>
                }
              </View>
              

          }
          
            <TouchableOpacity onPress={() => setCallVisible(false)}>
              <Entypo name='cross' size={32} color={'#000'} />
            </TouchableOpacity>
          </View>

          {
            astroyogis?.status_service === '4'?
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 40 }}>
           <TouchableOpacity
              style={[styles.boxBut]}
              onPress={() => { setCallVisible(false), addConsultation(astroyogis) }
              }>
              <FontAwesome5 name='video' size={30} color={'#000'} />

            </TouchableOpacity>
           
            <TouchableOpacity
              style={styles.boxBut}

              onPress={() => { setCallVisible(false), addConsultation(astroyogis) }}
            >
              <FontAwesome5 name='phone-alt' size={30} color={'#000'} />

            </TouchableOpacity>
            
          </View>:
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 40 }}>
            {
              astroyogis?.status_service === '2'?  <TouchableOpacity
              style={[styles.boxBut]}
              onPress={() => { setCallVisible(false), addConsultation(astroyogis) }
              }>
              <FontAwesome5 name='video' size={30} color={'#000'} />

            </TouchableOpacity>:
           
            <TouchableOpacity
              style={styles.boxBut}

              onPress={() => { setCallVisible(false), addConsultation(astroyogis) }}
            >
              <FontAwesome5 name='phone-alt' size={30} color={'#000'} />

            </TouchableOpacity>
            }
          </View>
          }

          
        </ModalPoup>

      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
        {renderBody()}
        {renderDetails()}
      </ScrollView>

    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
  },
  Body: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    width: SIZES.width
  },
  boxBut: {
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
  btnCont: {
    width: '45%',
    height: 35,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    alignSelf: 'center',
    flex: 1, width: '90%', height: '90%',
    aspectRatio: 1, borderRadius: 15
  },
  details: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
  shadowB: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.84,
    elevation: 15
  },
  box: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    margin: 1
  },
  imgC: {
    height: SIZES.height * 0.2,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: 100, paddingVertical: 20,
    borderRadius: 15
  },
  boCont: {
    flex: 1, width: '100%',
    margin: 10, justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center', padding: 10
  },
  iBo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  hText: {
    fontWeight: 'bold',
    fontSize: 16, color: 'tomato',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  sText: {
    fontWeight: '900',
    fontSize: 14, color: 'gray',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  sep: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 2
  },
  boBx: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
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
});

//make this component available to the app
export default Astroyogi;
