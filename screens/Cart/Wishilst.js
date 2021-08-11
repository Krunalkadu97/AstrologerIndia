//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList,Dimensions } from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '../Loader';
import { useSelector } from 'react-redux'
import { showMessage } from "react-native-flash-message";
const { width, height } = Dimensions.get('window');
import { FontAwesome,MaterialIcons } from 'react-native-vector-icons'
// create a component
const Wishlist = ({ navigation }) => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector(state => state.users);

  const getProduct = () => {
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

    fetch("https://www.srpulses.com/astroger/Api/get_wishlist_detail", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setProduct(result.data);
        } else {
          setProduct(0);
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }
  useEffect(() => {
    getProduct();
  }, [navigation])
 
  const add_to_Cart = (e) => {
    const myHeadersa = new Headers();
    myHeadersa.append("type", "1");
   
    const formdataa = new FormData();
    formdataa.append("user_id", userInfo);
    formdataa.append("product_id", e.product_id);
    formdataa.append("product_name", e.itemname);
    formdataa.append("price", e.price);
    formdataa.append("qty", "1");

    const requestOptionsa = {
      method: 'POST',
      headers: myHeadersa,
      body: formdataa,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/add_to_cart", requestOptionsa)
      .then(response => response.json())
      .then(result => {
        if(result.responce===true){
          showMessage({
            message: 'Added To Cart',
            type: "success",
          });
          getProduct();
          removeWishlist(e.id);
        }else{
          alert(result.massage)
        }
      })
      .catch(error => console.log('error', error));
  }

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
            message: 'Remove From Wishlist',
            type: "danger",
          });
          getProduct();
        }else{
          console.error('error to delete')
        }
      })
      .catch(error => console.log('error', error));
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pBox]}
      onPress={() =>{}}>
      <Image
        resizeMode='cover'
        source={{ uri: item.image }}
        style={styles.imageBox}
      />
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ marginVertical: 6, fontWeight: 'bold', color: 'tomato', textAlign: 'center' }}>{item.itemname}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  flex: 1}}>
          <Text style={{paddingLeft:15,fontWeight:'bold',color:COLORS.gray}}><FontAwesome name='rupee' color={COLORS.gray} size={12} />{' '}{item.price}</Text>
          <TouchableOpacity style={{
           height: 35,backgroundColor:'rgba(245,245,245,0.5)',
            justifyContent: 'center', alignItems: 'center',borderBottomRightRadius:20,
            paddingHorizontal:20,borderTopLeftRadius:15
          }}
            onPress={() => {add_to_Cart(item) }}>
            <FontAwesome name='shopping-bag' color={COLORS.gray} size={20} />
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity style={{
        width: 50, height: 40,borderTopRightRadius:20,borderBottomLeftRadius:20,borderTopLeftRadius:25, backgroundColor:'rgba(255,248,242,0.8)',
        justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 0
      }} onPress={() => { removeWishlist(item.id)}}>
        <MaterialIcons name='delete' color={COLORS.bgcolor} size={25} />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={{flex:1}}>
      {
        product.length === undefined ? <View style={styles.container}>
          <Loader loading={loading} />
          <Image
            source={{ uri: 'https://i.pinimg.com/474x/f1/7b/1c/f17b1cc834083e4f7b38c42e1e08b5a2.jpg' }}
            style={{ width: '100%', height: 350 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.black, textAlign: 'center', paddingVertical: 20 }}>Your Wishlist is Empty...!</Text>
          <Text style={{ fontWeight: '600', paddingHorizontal: 15, fontSize: 16, color: COLORS.gray, textAlign: 'center', paddingVertical: 15 }}>Let's start shopping, and save your favourite product in your Wishlist..</Text>
          <View>
            <TouchableOpacity style={{
              height: 36, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30,
              backgroundColor: COLORS.bgcolor, marginTop: 8
            }}
              onPress={() => navigation.navigate('Products')}>
              <LinearGradient
                style={styles.innerBox}
                colors={['tomato', COLORS.bgcolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>Start Shopping</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View> :
          <View style={{flex:1}}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'right', paddingVertical: 10, paddingRight: 10 }}>Wishlist Count : ({product.length})</Text>
            <View style={{flex:1}}> 
            <FlatList
            data={product}
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
  innerBox: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  pContainer: {
    flex: 1,
    marginVertical: 10
  },
  pBox: {
    flex: 1,
    width: width / 4.5,
    maxWidth: width * 0.48,
    margin:3,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20
  },
  imageBox: {
    width: '60%',
    height: height / 8,
  }
});

//make this component available to the app
export default Wishlist;
