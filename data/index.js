//import liraries
import React,  {useState,useEffect}  from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// create a component

const myHeaders = new Headers();
  myHeaders.append("type", "1");
  myHeaders.append("Cookie", "ci_session=9839bd2fee0e3a4453fec73e94e078f8402f343d");

const formdata = new FormData();
  formdata.append("id", "2");

const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
const ProductURL = 'https://www.srpulses.com/astroger/Api/get_product';
export const getProducts = () => {
    const [data,setData] = useState([]);
    const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        fetch(ProductURL,requestOptions)
        .then((response)=>response.json())
        .then((json) => setData(json))
        .catch((error)=>console.log(error))
        .finally(() =>setLoading(false))
        .finally(setLoading.bind(undefined, false));
    })

    if (loading){
        return <ActivityIndicator size="large" color="#eb4034" />
      } else {
        return data={data};
    }
    
};

