//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'
import { useDispatch,useSelector } from 'react-redux'
import { COLORS } from './../../constants/theme';
import { ADD_TO_CART,ADD_USER} from './../../ReduxStore/CartItem';
import ProductFavIcon from './../../components/ProductWish';
import { showMessage } from "react-native-flash-message";
const { width, height } = Dimensions.get('window');

// create a component
const myHeaders = new Headers();
myHeaders.append("type", "1");


const formdata = new FormData();
formdata.append("id", "2");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const ProductURL = 'https://www.srpulses.com/astroger/Api/get_product';

const Products = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [databa, setDataBa] = useState([]);
  const [data, setData] = useState([]);
  const [allPress, setAllPress] = useState(true);
  const [selectPress, setSelectPress] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('')
  const userInfo = useSelector(state => state.users);
  const [wishCount,setWishCount]=useState(0);  
  const getProduct = () => {
    fetch(ProductURL, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setDataBa(json)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }

  const add_to_Cart = ( e) => {
   
   const myHeadersa = new Headers();
    myHeadersa.append("type", "1");
   
    const formdataa = new FormData();
    formdataa.append("user_id", userInfo);
    formdataa.append("product_id", e.id);
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
            message: result.massage,
            type: "success",
          });
          
        }else{
          showMessage({
            message: result.massage,
            type: "warning",
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  const getWish = () => {
    const myHeadersw = new Headers();
    myHeadersw.append("type", "1");

    const formdataw = new FormData();
    formdataw.append("user_id", userInfo);

    const requestOptionsw = {
      method: 'POST',
      headers: myHeadersw,
      body: formdataw,
      redirect: 'follow'
    };

    fetch("https://www.srpulses.com/astroger/Api/get_wishlist_detail", requestOptionsw)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setWishCount(result.data.length);
        } else {
            setWishCount(0);
        }
      })
      .catch(error => console.log('error', error));
      
  }

  useEffect(() => {
    getProduct();
    getWish();
    const unsubscribe = navigation.addListener('focus', () => {
      getProduct();
      getWish();
  });
  return unsubscribe;
  }, [])

  const add_wishlist = (item) => {
    const myHeaderswi = new Headers();
    myHeaderswi.append("type", "1");
    

    const formdatawi = new FormData();
    formdatawi.append("user_id", userInfo);
    formdatawi.append("product_id", item.id);
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
            message:'Added to Wishlist',
            type: "success",
          });
         getWish();
        }else{
          showMessage({
            message:'Unable  to Add in Wishlist',
            type: "warning",
          });
        }
      })
      .catch(error => console.log('error', error));
  }
  const onAll = () => {
    const newData = databa;
    setData(newData);
    setSelectedCategory(null)
    setAllPress(true);
  };
  function onSelectCategory(category) {
    //filter restaurant
    let newData = databa.filter(a => a.category_id == category)

    setData(newData)
    setSelectedCategory(category)
    setAllPress(false);
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pBox]}
      onPress={() => navigation.navigate('PDetails', { item })}>
      <Image
        resizeMode='cover'
        source={{ uri: item.image }}
        style={styles.imageBox}
      />
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ marginVertical: 6, fontWeight: 'bold', color: 'tomato', textAlign: 'center' }}>{item.itemname}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 4, flex: 1, paddingHorizontal: 10 }}>
          <Text><FontAwesome name='rupee' color='#000' size={12} />{' '}{item.price}</Text>
          <TouchableOpacity style={{
            width: 30, height: 30, borderRadius: 10, backgroundColor: 'tomato',
            justifyContent: 'center', alignItems: 'center'
          }}
            onPress={() => { add_to_Cart(item)}}>
            <FontAwesome name='shopping-bag' color='#fff' size={15} />
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity style={{
        width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.gray,
        justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 10
      }} onPress={() => { add_wishlist(item)}}>
        <FontAwesome name='heart' color={COLORS.white} size={18} />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
    <View style={{position:'absolute',top:40,right:5,backgroundColor:'rgba(255,255,255,0.05)'
    ,zIndex:10000,alignItems:'center',justifyContent:'center',width:60,height:60,borderRadius:30}}>
                <ProductFavIcon cartCount={wishCount}/>
            </View>
      <View style={styles.filterBox}>
        <TouchableOpacity style={[styles.fBox, { borderColor: allPress === true ? COLORS.main : COLORS.gray }]} onPress={onAll}>
          <Text style={{ color: allPress ? COLORS.main : COLORS.gray }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fBox, { borderColor: (selectedCategory == 'Gemes Stone') ? COLORS.main : COLORS.gray }]} onPress={() => onSelectCategory('Gemes Stone')}>
          <Text style={{ color: (selectedCategory == 'Gemes Stone') ? COLORS.main : COLORS.gray }}>Gemstone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fBox, { borderColor: (selectedCategory == 'Rudraksh') ? COLORS.main : COLORS.gray }]} onPress={() => onSelectCategory('Rudraksh')}>
          <Text style={{ color: (selectedCategory == 'Rudraksh') ? COLORS.main : COLORS.gray }}>Rudraksha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fBox, { borderColor: (selectedCategory == 'Yantra') ? COLORS.main : COLORS.gray }]} onPress={() => onSelectCategory('Yantra')}>
          <Text style={{ color: (selectedCategory == 'Yantra') ? COLORS.main : COLORS.gray }}>Yantra</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>Explore All Products</Text>
      <View style={styles.pContainer}>
        {isLoading ? <ActivityIndicator size="large" color="#eb4034" /> :
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={renderItem}
            numColumns={2}
          />
        }
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterBox: {
    padding: 1,
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
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  pContainer: {
    flex: 1,
    marginVertical: 10
  },
  pBox: {
    flex: 1,
    width: width / 4.5,
    maxWidth: width * 0.45,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20
  },
  imageBox: {
    width: '60%',
    height: height / 8,
  }
});

//make this component available to the app
export default Products;
