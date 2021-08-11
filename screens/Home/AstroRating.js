//import liraries
//import liraries
import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from 'react-native-vector-icons';
import Loader from '../Loader';
import { COLORS,SIZES} from './../../constants/theme';
// create a component
const AstroRating = ({ route, navigation }) => {
    const [product, setProduct] = useState(null);
    const [rat, setRat] = useState(2.5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [like, setLike] = useState(false);
    const [dlike, setDlike] = useState(false);
    const [count, setCount] = useState(0);
    const [
        isRatingSubmitSuccess,
        setIsRatingSubmitSuccess
    ] = useState(false);
    const userInfo = useSelector(state => state.users);
    const commentInputRef = createRef();

    useEffect(() => {
        let { astroyogis } = route.params;

        setProduct(astroyogis)
    })

    const submitRating = () => {
        setErrortext('');
        if (!comment) {
            Alert.alert('Please Write comment');
            return;
        }
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("type", "1");
       
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("rating", rat);
        formdata.append("comment", comment);
        formdata.append("product_id",'0');
        formdata.append("astroger_id", product.user_id);
        formdata.append("like", count);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/reviews", requestOptions)
        .then(response => response.json())
        .then(result => {
            setLoading(false);
            if (result.responce === true) {
                setIsRatingSubmitSuccess(true);
            } else {
                setErrortext(result.massage)
            }
        })
        .catch(error => {
            setLoading(false);
            console.log('error', error)
        });

        
    }
    if (isRatingSubmitSuccess) {
        return (<View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={{ uri: 'https://www.designfreelogoonline.com/wp-content/uploads/2016/12/000784-5-stars-logo-design-online-free-3d-logo-maker-03.png' }}
                    resizeMode='contain'
                    style={{ width: 200, height: SIZES.height * 0.4 }}
                />
                <Text style={[styles.successTextStyle, { fontSize: 20, color: 'green', fontWeight: 'bold', paddingBottom: 20 }]}>
                    Thank you for your support
                </Text>
                <Text style={styles.successTextStyle}>
                    Your  Rating  Submit Successful
                </Text>
                <Text style={styles.textSu}>
                    Continue..
                </Text>
                
            </View>

            <View style={{ height: 150 }}>
                <TouchableOpacity style={{ backgroundColor: COLORS.gray, padding: 10, borderRadius: 10, paddingHorizontal: 18 }}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home </Text>
                </TouchableOpacity>
            </View>

            <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 20, marginVertical: 6 }}>{errortext}</Text>
        </View>)
    }
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <Image
                source={{ uri: product?.image }}
                resizeMode='contain'
                style={{
                    width: '100%',
                    height: 120,
                    alignSelf: 'center',
                    marginVertical: 5
                }}
            />
            <Text style={{ marginVertical: 6, textAlign: 'center', fontSize: 16 }}>{product?.name}</Text>
            <View style={styles.sepreator} />

            <View>
                <Rating
                    onFinishRating={(rating) => {
                        setRat(rating)
                    }}
                    style={{
                        padding: 20
                    }}
                />
                <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.gray, fontWeight: 'bold' }}>{rat} / 5 Ratings</Text>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { marginRight: 5 }]}
                        onChangeText={(e) => setComment(e)}
                        placeholder="Enter Your Comment"
                        placeholderTextColor={COLORS.gray}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            commentInputRef.current && commentInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.gray }}>Do Like / Unlike this product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                        <TouchableOpacity style={{
                            width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderRadius: 10, borderColor: (like ? 'green' : COLORS.gray)
                        }} onPress={() => {
                            setCount(1);
                            setLike(!like);
                            setDlike(false);
                        }}>
                            {
                                like ? <AntDesign name='like1' color={'green'} size={20} /> : <AntDesign name='like1' color={COLORS.gray} size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderRadius: 10, marginHorizontal: 20, borderColor: (dlike ? COLORS.bgcolor : COLORS.gray)
                        }}
                            onPress={() => {
                                setCount(0);
                                setDlike(!dlike);
                                setLike(false);
                            }}>
                            {
                                dlike ? <AntDesign name='dislike1' color={COLORS.bgcolor} size={20} /> : <AntDesign name='dislike1' color={COLORS.gray} size={20} />
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 60, justifyContent: 'center', marginTop: 40, padding: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, backgroundColor: COLORS.gray, borderRadius: 8, height: 40 }}
                        onPress={submitRating}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 40
    },
    sepreator: {
        flex: 1,
        width: '100%',
        height: 1,
        maxHeight: 1,
        backgroundColor: COLORS.bgcolor
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        marginRight: 25,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: COLORS.gray,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.gray,
    },
});

//make this component available to the app
export default AstroRating;


