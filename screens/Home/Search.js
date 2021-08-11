import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList,TouchableOpacity ,Image,TextInput} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Ionicons,FontAwesome5,Entypo,FontAwesome,AntDesign} from 'react-native-vector-icons'
import { COLORS,FONTS,SIZES} from './../../constants/theme';
import {useSelector} from 'react-redux'
import { showMessage } from "react-native-flash-message";
import FavAstroIcon from '../../components/AstroFav';

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
const AstroURL="https://www.srpulses.com/astroger/Api/get_astrologer";


const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [wishCount,setWishCount]=useState(0); 
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const userId=useSelector(state=>state.users);

const getAstro=()=>{
  fetch(AstroURL,requestOptions)
  .then((response) => response.json())
  .then((responseJson) => {
    setFilteredDataSource(responseJson);
    setMasterDataSource(responseJson);
  })
  .catch((error) => {
    console.error(error);
  });
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
  useEffect(() => {
    getAstro();
    getWish();
    const unsubscribe = navigation.addListener('focus', () => {
      getAstro();
      getWish();
  });
  return unsubscribe;
  }, [navigation]);

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

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
                        key={`astrologer-${item.user_id}`}
                        onPress={() => getItem(item)}
                        >
                        
                            <View style={{flex:1,flexDirection:'row',margin:5}}>
                                <View style={styles.imageContainer}>
                                {
                                        item.image =='' ? (
                                            <Image
                                        source={{uri:'https://static.thenounproject.com/png/17241-200.png'}}
                                        style={styles.image}
                                    />
                                        ):(
                                            <Image
                                        source={{uri:item.image}}
                                        style={styles.image}
                                    />
                                        )
                                    }
                                    
                                </View>
                                <View style={styles.detailsContainer}>
                                    <Text style={{fontWeight:'bold',fontSize:14,paddingTop:3}}>{item.name.toUpperCase()}</Text>
                                    {item.speciality=='' ? (<Text style={{fontWeight:'900',fontSize:14,color:'grey'}}>Not Mention yet</Text>) : (<Text style={{fontWeight:'900',fontSize:14,color:'grey'}}>{item.speciality}</Text>)}
                                    {item.experience=='' ? (<Text style={{fontWeight:'600',fontSize:12,marginVertical:2,color:'grey'}}>No experience yet, New</Text>):(<Text style={{fontWeight:'600',fontSize:14,marginVertical:2,color:'grey'}}>{item.experience} of experience</Text>)}
                                    {item.charge=='' ? (<Text style={{fontWeight:'600',fontSize:14,marginVertical:2,color:'#000'}}>
                                    <FontAwesome name='rupee' color='#000' size={14}/>{' '}0.0 /min
                                    </Text>):(<Text style={{fontWeight:'600',fontSize:12,marginVertical:2,color:'#000'}}>
                                    <FontAwesome name='rupee' color='#000' size={12}/>{' '}{item.charge} /min
                                    </Text>)}
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',flex:1,paddingHorizontal:20}}>
                                            {item.like=='' ? (<Text style={[styles.shadow,{fontWeight:'600',fontSize:12,marginVertical:2,color:'#000',padding:5,backgroundColor:COLORS.white,borderRadius:8,elevation:1}]}>
                                                New
                                            </Text>):(<Text style={[styles.shadow,{fontWeight:'600',fontSize:14,marginVertical:2,color:'#000',padding:5,backgroundColor:COLORS.white,borderRadius:8,elevation:1}]}>
                                                <AntDesign name='like2' size={15} color='#228b22'/>{' '}{item.like||0}
                                            </Text>)}
                                            {item.rating==''?(<Text style={{fontWeight:'600',fontSize:12,marginVertical:2,marginHorizontal:10,color:'#000',padding:5,backgroundColor:COLORS.white,borderRadius:8,elevation:1}}>New</Text>):
                                            (<Text style={{fontWeight:'600',fontSize:14,marginVertical:2,marginHorizontal:10,color:'#000',padding:5,backgroundColor:COLORS.white,borderRadius:8,elevation:1}}>
                                            <AntDesign name='star' color='#FFAE19' size={14}/>{' '}{item.rating}/5
                                            </Text>)}
                                            <TouchableOpacity onPress={() => { add_fav(item) }} style={{fontWeight:'600',fontSize:12,marginVertical:2,marginHorizontal:10,color:'#000',padding:5,backgroundColor:COLORS.white,borderRadius:8,elevation:1.6}}>
                                            <Ionicons name='heart' color={COLORS.bgcolor} size={25} />
                                            </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
      
      
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    
    navigation.navigate('Astroyogi',{item})
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <View style={styles.SearchBox}>
                <View style={styles.iconBox}> 
                    <Ionicons name='search' color={COLORS.gray} size={SIZES.padding}/>
                </View>
                <TextInput                
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"                    
                    style={{
                        flex:1,
                        height:'100%',
                        fontSize:18
                    }}
                />
          </View>
          <TouchableOpacity style={{width:40,height:40,margin:5,borderRadius:15,paddingTop:5,
          justifyContent:'center',alignItems:'center'}}>
            <FavAstroIcon cartCount={wishCount}/>
          </TouchableOpacity>
      </View>
       
          {search? <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingVertical:SIZES.base,paddingHorizontal:SIZES.padding}}> 
                <Text style={{...FONTS.body2,fontWeight:'700',color:COLORS.gray}}>No Astrologer found</Text>
            </TouchableOpacity>:<TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingVertical:SIZES.base,paddingHorizontal:SIZES.padding}}> 
                <Text style={{...FONTS.body2,fontWeight:'700',color:COLORS.gray}}>We have {filteredDataSource.length} Astrologer</Text>
            </TouchableOpacity>}
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom:100
  },
  itemStyle: {
    padding: 10,
    margin:10,
    backgroundColor:'#fffae6'
  },
  shadow:{
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:16
    },
    shadowOpacity:0.5,
    shadowRadius:16,
    elevation:50
},
seperator:{
  width:'100%',
  height:1,
  backgroundColor:'grey',
  marginVertical:4
},
imageContainer:{
  width:120,
  justifyContent:'center',
  alignItems:'center'
},
detailsContainer:{
flex:1,
marginLeft:20
},
image:{
   width:100,
   height:100,
   borderRadius:50,
  borderWidth:1
},
SearchBox:{
  flex:1,
  flexDirection:'row',
  backgroundColor:COLORS.white,
  height:40,
  borderWidth:1,
  borderColor:COLORS.bgcolor,
  marginHorizontal:10,
  borderRadius:10
},
iconBox:{
  width:40,
  height:40,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:5
},
});

export default Search;