//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList} from 'react-native';
import { COLORS } from './../../constants/theme';
import Loader from './../Loader';
import {useSelector} from 'react-redux'
// create a component
const Order = ({ navigation }) => {
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState('');
    const userId=useSelector(state=>state.users);
    const getOrder = () => {
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

        fetch("https://www.srpulses.com/astroger/Api/get_order_history", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.responce===true){
                    setOrder(result.data)
                }else{
                    setOrder(0)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
    }
    useEffect(()=>{
        getOrder();
    },[]);

    const renderItem=({item})=>{
        return(
            <TouchableOpacity style={{padding:10,flexDirection:'row',backgroundColor:COLORS.white,borderWidth:1,margin:5,borderRadius:15,borderColor:COLORS.gray}}
            onPress={()=>navigation.navigate('Odetails',{item})}>
                <View>
                    <Image
                        source={{uri:'https://i.pinimg.com/originals/5d/d9/f7/5dd9f7c0a69e78617d46d5311d022876.png'}}
                        style={{width:80,height:60}}
                        resizeMode='contain'
                    />
                </View>
                <View>
                <Text style={{fontWeight:'bold'}}>{item.txn_id}</Text>
                <Text style={{color:COLORS.gray}}> Ordered On : {item.order_date}</Text>
                <Text style={{color:COLORS.gray}}> Item Quantity : {item.item_qty}</Text>
                </View>
               
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
        {
                order.length === undefined ?
                <View style={styles.container}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJ-rnSWyRaIHqpsIrW-SreRrRyMtVeO8JDA&usqp=CAU' }}
                style={{ width: '100%', height: 300 }}
                resizeMode='contain'
            />
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.bgcolor, paddingVertical: 10, textAlign: 'center' }}>Empty Order List...!</Text>
            <Text style={{ fontWeight: '600', fontSize: 16, color: COLORS.gray, paddingVertical: 10, textAlign: 'center' }}>Let's start shopping. </Text>
            <Text style={{ fontWeight: '600', fontSize: 16, color: COLORS.bgcolor, marginTop: -10, textAlign: 'center' }}>@AstrologerIndia</Text>
            <View style={{ height: 100, width: '100%', justifyContent: 'center', }}
            >
                <TouchableOpacity style={{
                    height: 40, marginHorizontal: 70, backgroundColor: COLORS.gray,
                    justifyContent: 'center', alignItems: 'center', borderRadius: 20
                }}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.white }}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        </View>:
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',textAlign:'right',fontSize:16,padding:10}}>Total item : ({order.length})</Text>
            <FlatList
                data={order}
                keyExtractor={item=>`${item.txn_id}`}
                renderItem={renderItem}
            />
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
});

//make this component available to the app
export default Order;
