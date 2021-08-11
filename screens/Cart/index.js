//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet, SafeAreaView, ScrollView
} from 'react-native';
import { useSelector } from 'react-redux'
import { MaterialIcons, AntDesign } from 'react-native-vector-icons'
import { showMessage } from "react-native-flash-message";
import LinearButton from '../../components/Button/LongButton'

import { COLORS } from './../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import Loader from './../Loader';

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState('');
  const [loading, setLoading] = useState(true);
  const [errortext, setErrortext] = useState('');
  const isFocused = useIsFocused();
  const userInfo = useSelector(state => state.users);

  const getCartData = () => {
    const myHeaders = new Headers();
    myHeaders.append("type", "1");

    const formdata = new FormData();
    formdata.append("user_id", userInfo);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_cart_detail", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setCart(result.data)
        } else {
          setCart(0)
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }
  useEffect(() => {

    getCartData();

  }, [isFocused])

  const getTotal = () => {
    let total = 0;
    const items = cart;
    for (let i = 0; i < items.length; i++) {
      let sum = Number(items[i].price * items[i].qty)
      total = total + sum
    }
    return <Text style={[styles.totText, { fontSize: 16, color: COLORS.black, textTransform: 'capitalize' }]}>Rs.&nbsp;{total}</Text>
  }

  function editOrder(prodId, type) {

    const myHeadersadd = new Headers();
    myHeadersadd.append("type", "1");
    const formdataadd = new FormData();
    formdataadd.append("cart_id", prodId);
    formdataadd.append("type", type);

    const requestOptionsadd = {
      method: 'POST',
      headers: myHeadersadd,
      body: formdataadd,
      redirect: 'follow'
    };
    fetch("https://www.srpulses.com/astroger/Api/update_cart_item_qty", requestOptionsadd)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          getCartData();
        }
      })
      .catch(error => console.log('error', error));
  }

  const removeProd = (item) => {
    const myHeadersre = new Headers();
    myHeadersre.append("type", "1");

    const formdatare = new FormData();
    formdatare.append("cart_id", item.id);

    const requestOptionsre = {
      method: 'POST',
      headers: myHeadersre,
      body: formdatare,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/remove_cart_item", requestOptionsre)
      .then(response => response.json())
      .then((responseJson) => {

        if (responseJson.responce === true) {
          showMessage({
            message: 'Remove From Cart',
            type: "danger",
          });
          getCartData();

        } else {
          setErrortext(responseJson.msg);

        }
      })
      .catch(error => { console.log('error', error); setLoading(false); })
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));

  }
  const add_wishlist = (item) => {
    const myHeaderswi = new Headers();
    myHeaderswi.append("type", "1");
    

    const formdatawi = new FormData();
    formdatawi.append("user_id", userInfo);
    formdatawi.append("product_id", item.product_id);
    formdatawi.append("product_name", item.product_name);
    formdatawi.append("qty", "1");
    formdatawi.append("type", "0");

    const requestOptionswi = {
      method: 'POST',
      headers: myHeaderswi,
      body: formdatawi,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/add_to_wishlist", requestOptionswi)
      .then(response => response.json())
      .then(result =>{
        if(result.responce===true){
          showMessage({
            message: 'Added to Wishlist',
            type: "success",
          });
          removeProd(item);
          getCartData();
        }else{
          setErrortext('No product found')
        }
      })
      .catch(error => console.log('error', error));
  }

  function renderCart() {
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, paddingLeft: 10, backgroundColor: COLORS.white }}>
        <View style={{
          flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 10, elevation: 5, width: '75%',
          shadowColor: COLORS.gray, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.35, shadowRadius: 3.86
        }}>
          <View style={{ width: 100, height: 80, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
              resizeMode='contain'
            />
          </View>
          <View style={{ backgroundColor: 'rgba(251, 222, 210,0.1)', flex: 1, paddingTop: 5, paddingLeft: 5 }}>
            <Text style={[styles.textTitle, { paddingRight: 15, width: '90%' }]}>
              {item.product_name}
            </Text>
            <Text style={[styles.textAuthor, { fontSize: 13 }]}>Rs {item.price} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
              <TouchableOpacity style={[styles.qtyBtn, { marginRight: 10 }]} onPress={() => {
                editOrder(item.id, "decrement");
              }}>
                <Text style={styles.qBtext}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qBtext}>{item.qty}</Text>

              <TouchableOpacity style={[styles.qtyBtn, { marginLeft: 10 }]} onPress={() => {
                editOrder(item.id, "increment");
              }}>
                <Text style={styles.qBtext}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', right: 4, top: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  removeProd(item)
                }}
                style={[styles.qtyBtn, { width: 24, height: 24 }]}>
                <MaterialIcons name='delete' size={20} color='tomato' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  add_wishlist(item)
                }}
                style={[styles.qtyBtn, { width: 24, height: 24, marginTop: 15, borderRadius: 12,borderColor:COLORS.gray }]}>
                <AntDesign name='heart' size={15} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: 16 }}>
          <Text style={{ color: COLORS.bgcolor, fontSize: 12, fontWeight: 'bold' }}>Rs {item.qty * item.price}</Text>

        </View>
        <View style={{ position: 'absolute', bottom: -5, right: 60 }}>
          <Text style={{ fontSize: 22, color: COLORS.gray, zIndex: 10 }}>+</Text>
        </View>
      </View>
    )
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 10
        }}>
        <Loader loading={loading} />
        {cart.length !== undefined ? (
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Image
              source={{ uri: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/shopping-cart_f1Pjt88d_thumb.jpg' }}
              resizeMode='contain'
              style={{
                width: '80%',
                height: 300
              }}
            />
            <Text style={styles.emptyCartMessage}>Your cart is empty !!!</Text>
            <LinearButton buttonTitle='Start Shopping' onPress={() => {
              navigation.navigate('Products'),
                alert('Shop')
            }} />

          </View>
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'right', paddingRight: 10, paddingTop: 5 }}>Total Cart Items : ({cart.length || 0}-Items)</Text>
        {renderCart()}
      </ScrollView>
      {cart.length !== undefined ? (<View style={{ padding: 5, backgroundColor: '#rgba(251, 222, 210,0.2)', flex: 1, maxHeight: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16, textTransform: 'uppercase', color: 'tomato' }}>Cart Total</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16, textTransform: 'uppercase', color: 'tomato' }}>{getTotal()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{
            height: 36, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30,
            backgroundColor: COLORS.bgcolor, marginTop: 8
          }}
            onPress={() => navigation.navigate('selectAdd')}>
            <LinearGradient
              style={styles.innerBox}
              colors={[COLORS.gray, COLORS.bgcolor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>Check Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>) : (
        <View />
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  bookItemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#FFF',
    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 15,
    marginVertical: 2
  },
  ImCont: {
    width: 90,
  },
  imgBox: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  qtyBtn: {
    width: 30,
    height: 30, borderRadius: 6,
    justifyContent: 'center', alignItems: 'center',
    borderColor: 'tomato', borderWidth: 1
  },
  qBtext: {
    fontWeight: 'bold',
    fontSize: 15
  },
  bookItemMetaContainer: {
    padding: 5,
    paddingLeft: 10
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textAuthor: {
    fontSize: 14,
    fontWeight: '200',
    color: COLORS.gray
  },
  buttonContainer: {
    position: 'absolute',
    top: 110,
    left: 10
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5
  },
  buttonText: {
    fontSize: 22,
    color: '#fff'
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  emptyCartMessage: {
    fontSize: 28,
    paddingVertical: 15
  },
  innerBox: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
});

//make this component available to the app
export default Cart;
