
import React, { useState,useEffect } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { List } from 'react-native-paper';
import {FontAwesome5} from 'react-native-vector-icons'
import { COLORS,FONTS,SIZES } from './../../constants/theme';
import Loader from '../Loader';

const myHeaders = new Headers();
myHeaders.append("type", "1");
myHeaders.append("Cookie", "ci_session=73307843271098ee690aa4098bb335d0d43f2a1a");

const formdata = new FormData();
formdata.append("id", "1");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const FaqsURL="https://www.srpulses.com/astroger/Api/get_faqs";
const Ask=()=> {
  const [isLoading,setLoading]=useState(true);
  const [data,setData] = useState([]);
 
  const fetchFaqs=()=>{
      fetch(FaqsURL,requestOptions)
      .then((response)=>response.json())
      .then((json) => setData(json))
      .catch((error)=>console.log(error))
      .finally(() =>setLoading(false)
      )
      .finally(setLoading.bind(undefined, false));
  };
  useEffect(()=>{
    fetchFaqs();
},[1500])
    return (
      <View style={styles.container}>
      <Loader loading={isLoading}/>
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <Text style={styles.hText}>Most Frequently Ask Question</Text>
          <View style={styles.bBox}>
            
              
              {data.map((item,index)=>(
                <View style={{marginVertical:5,borderWidth:1}} key={index}>
                <List.Accordion
                title={<View><Text>{item.category_id}</Text></View>}
                style={{height:40,justifyContent:'center',alignItems:'center'}}
                left={props => <List.Icon {...props} icon="gamepad-circle-up" />}
                key={item.id}>
                <View style={styles.sep}/>
                <List.Item title={item.title} />
                
                <List.Item title={item.description} />
                
              </List.Accordion>
              </View>
              ))}
              
              
            
          </View>
        </ScrollView>
      </View>
    );
  
}
export default Ask;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop:15,
  },
  hText:{
    ...FONTS.h2,
    fontWeight:'bold',
    textAlign:'center',
    paddingVertical:10,
    color:COLORS.main
  },
  headerBox:{
    
    flexDirection:'row',
    padding:10,
    borderWidth:1,
    borderColor:COLORS.lightGray,
    marginHorizontal:6,
    justifyContent:'space-between',
    alignItems:'center'
  },
  bBox:{margin:5,padding:10,backgroundColor:COLORS.white},
  sep:{
    height:1,
    backgroundColor:COLORS.gray
  },
  htitle:{
    ...FONTS.h3,
    fontWeight:'bold',
    color:COLORS.gray,
    paddingLeft:15
  }
});