//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView,TouchableOpacity} from 'react-native';
import { COLORS } from './../../constants/theme';
import {useSelector} from 'react-redux'
import Loader from './../Loader';
// create a component
const Query = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [reply,setReply]= useState(false);
    const useId=useSelector(state=>state.users)
    const getQueryData = () => {
        const myHeaders = new Headers();
        myHeaders.append("type", "1");
        
        const formdata = new FormData();
        formdata.append("user_id", useId);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://www.srpulses.com/astroger/Api/get_query", requestOptions)
          .then(response => response.json())
          .then(result => {
              if(result.responce===true){
                  setQuery(result.data);
              }else{
                  setQuery('');
              }
          })
          .catch(error => console.log('error', error))
          .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        getQueryData();
    }, [])
    return (
        <View style={styles.container}>
        <Loader loading={loading}/>
            <Image
                source={{ uri: 'https://previews.123rf.com/images/faysalfarhan/faysalfarhan1501/faysalfarhan150100888/35509910-support-customer-care-team-icon-orange-glossy-round-button.jpg' }}
                style={{ width: '100%', height: 150 }}
                resizeMode='contain'
            />
            <Text style={{
                fontSize: 20, color: COLORS.bgcolor, textAlign: 'center',
                paddingVertical: 10, fontWeight: 'bold', textTransform: 'uppercase'
            }}>Your Queries</Text>
            {
                query ? <ScrollView style={{flex:1}}>
                    {
                        query.map((item,index)=>(
                            <View style={{flex:1,padding:10,margin:5,marginHorizontal:10,
                            borderWidth:0.3,borderColor:COLORS.bgcolor,borderRadius:15}} key={index}>
                                <Text style={{fontWeight:'bold',color:COLORS.gray,paddingLeft:10,fontSize:18}}>{item.query}</Text>
                                <Text style={{color:COLORS.gray,paddingLeft:10}}>Query Date & Time : {item.date}</Text>
                                {
                                    reply ? <View style={{flex:1,padding:10}}>
                                        <Text style={{color:COLORS.gray,paddingLeft:10,fontSize:18,fontWeight:'bold'}}>Answer :</Text>
                                        {
                                            item.reply===''? <Text style={{paddingLeft:10}}>No Reply yet. We will get back to you soon.</Text>:
                                            <Text style={{paddingLeft:10}}>{item.reply}</Text>
                                        }
                                        <TouchableOpacity onPress={()=>setReply(false)}>
                                    <Text style={{color:COLORS.bgcolor,paddingLeft:10,fontSize:16,fontWeight:'bold'}}>Hide</Text>
                                </TouchableOpacity>
                                    </View>:
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:5,paddingRight:60}}>
                                <Text style={{color:COLORS.gray,paddingLeft:10,fontSize:16}}>Query Reply</Text>
                                <TouchableOpacity onPress={()=>setReply(true)}>
                                    <Text style={{color:COLORS.bgcolor,paddingLeft:10,fontSize:16,fontWeight:'bold'}}>View Reply</Text>
                                </TouchableOpacity>
                                </View>
                                }
                                
                                
                            </View>
                        ))
                    }
                </ScrollView>:
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image
                        source={{uri:'https://www.transparentpng.com/thumb/smile/gGsgum-emoji-feliz-png-emoticon-smile-clipart-full-size.png'}}
                        style={{width:200,height:200}}
                        resizeMode='contain'
                    />
                    <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.gray}}>You don't have any query Yet</Text>
                </View>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default Query;
