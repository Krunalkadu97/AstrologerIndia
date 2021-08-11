import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5, Fontisto, AntDesign, Entypo } from 'react-native-vector-icons'
import HeaderBar from '../../components/HeaderBar/index';
import { useSelector } from 'react-redux'
import { COLORS, SIZES } from './../../constants/theme';
import { showMessage } from "react-native-flash-message";
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import ProductFavIcon from './../../components/ProductWish';

const { width, height } = Dimensions.get('window');


const PDetails = ({ route, navigation }) => {
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);
    const [product, setProduct] = useState(null);
    const [shouldShow, setShouldShow] = useState(false);
    const [speShow, setSpeShow] = useState(false);
    const [usesShow, setUsesShow] = useState(false);
    const [isReview, setIsReview] = useState(false);
    const [review, setReview] = useState('');
    const [pRev, setRev] = useState('');
    const [ratmsg, setRatMsg] = useState('');
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
                    setCartCount(result.data.length)
                } else {
                    setCartCount(0)
                }
            })
            .catch(error => console.log('error', error));

    }

    const getProduct = () => {
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

    const add_to_Cart = (e) => {

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
                if (result.responce === true) {
                    showMessage({
                        message: result.massage,
                        type: "success",
                      });
                   
                    getCartData();
                } else {
                    showMessage({
                        message: result.massage,
                        type: "warning",
                      });
                }
            })
            .catch(error => console.log('error', error));
    }
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
            .then(result => {
                if (result.responce === true) {
                    showMessage({
                        message: 'Add to Wishlist',
                        type: "success",
                      });
                    getProduct();
                } else {
                    showMessage({
                        message: 'Unable to Add in Wishlist',
                        type: "warning",
                      });
                }
            })
            .catch(error => console.log('error', error));
    }

    const getReviews = (e) => {
        const myHeadersv = new Headers();
        myHeadersv.append("type", "1");

        const formdatav = new FormData();
        formdatav.append("product_id", e);

        const requestOptionsv = {
            method: 'POST',
            headers: myHeadersv,
            body: formdatav,
            redirect: 'follow'
        };

        fetch("https://www.srpulses.com/astroger/Api/get_reviews", requestOptionsv)
            .then(response => response.json())
            .then(result => {
                if (result.responce===true) {
                    setReview(result.data);
                    setRev(result.rating);
                } else {
                    setReview(0);
                    setRev(0);
                }
            })
            .catch(error => console.log('error', error));
    }
    React.useEffect(() => {
        let { item } = route.params;

        setProduct(item);
        getReviews(item.id);
        getCartData();
        getProduct();
        const unsubscribe = navigation.addListener('focus', () => {
            getCartData();
            getProduct();
        });
        return unsubscribe;
    }, [navigation])

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
                navigation.navigate('prating',{product});
            } else {
                setRatMsg('You will be eligible to rate this product once you buy it.');
            }
        })
        .catch(error => console.log('error', error));
    }
    function rnderBody() {
        return (
            <View style={styles.container}>
                <HeaderBar titleText={product?.itemname} onPress={() => navigation.goBack()} />
                <Text style={styles.hText}>{product?.itemname}</Text>
                <View style={{
                    marginLeft: 25, width:'30%',justifyContent:'center',
                    alignItems:'center'
                }}>
<Text style={{
                   backgroundColor: 'rgba(0,0,0,0.1)',
                   textAlign: 'center', borderRadius: 5, color: 'green', fontWeight: 'bold',
                    paddingVertical: 3,paddingHorizontal:10
                }}>
                    <AntDesign name='star' color={COLORS.bgcolor} size={16} />
                    {pRev}/5
                </Text>
                </View>
                
                <View style={styles.imgCon}>
                    <Image
                        source={{ uri: product?.image }}
                        resizeMode='contain'
                        style={styles.img}
                    />
                </View>
                <View style={styles.sepr} />
                <View style={{ flex: 1, padding: 10 }}>

                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray', textTransform: 'capitalize', letterSpacing: 1, lineHeight: 18, paddingVertical: 10, paddingBottom: 3 }}>Category : {product?.category_id}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray', textTransform: 'capitalize', letterSpacing: 1, lineHeight: 18, paddingVertical: 10, paddingBottom: 10 }}>Price : Rs. {product?.price}</Text>
                    <View style={styles.sepr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between', alignItems: 'center' }}
                        onPress={() => setShouldShow(!shouldShow)}>

                        <Text style={{ fontSize: 16, color: 'grey', paddingVertical: 8 }}>Product Availability</Text>
                        <TouchableOpacity >
                            <Entypo name='plus' color={'gray'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {shouldShow ? (
                        <View style={{ paddingVertical: 15 }}>{
                            product?.status == '1' ? (
                                <View>
                                    <View style={styles.ava}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textTransform: 'capitalize' }}>available {' '}</Text>
                                        <View style={[styles.circle, { backgroundColor: 'green' }]} />

                                    </View>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: 'gray', paddingLeft: 15, paddingVertical: 10 }}>Hurry up only few product left</Text>
                                </View>

                            )
                                : (
                                    <View>
                                        <Text >not available {' '}</Text>
                                        <View style={[styles.circle, { backgroundColor: 'red' }]} />
                                    </View>
                                )
                        }</View>) :
                        null}
                    <View style={styles.sepr} />
                </View>

            </View>
        )
    }
    function renderDetail() {
        return (
            <View style={{ flex: 1, width: '100%', padding: 10, marginVertical: 10, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 18, paddingLeft: 5, paddingVertical: 10, fontWeight: 'bold' }}>About product</Text>
                <View style={styles.sepr} />
                <View style={styles.boxC}>
                    <Text style={styles.tiText}>Description</Text>
                    <TouchableOpacity onPress={() => setSpeShow(!speShow)}>
                        <Entypo name='plus' color={'gray'} size={26} />
                    </TouchableOpacity>
                </View>
                {speShow ? (
                    <Text style={{ fontSize: 15, color: 'gray', paddingVertical: 12, paddingLeft: 14 }}>{product?.description}</Text>
                ) : null}
                <View style={styles.sepr} />
                <View style={styles.boxC}>
                    <Text style={styles.tiText}> Write Review</Text>
                    <TouchableOpacity onPress={() => setUsesShow(!usesShow)}>
                        <Entypo name='plus' color={'gray'} size={26} />
                    </TouchableOpacity>
                </View>
                {usesShow ? (
                    <View>
                        <Image
                            source={{ uri: 'https://i2.wp.com/sahpp.com/wp-content/uploads/2019/07/34-340452_5-gold-stars-png-transparent-background-5-stars.png?fit=757%2C320' }}
                            style={{ width: '100%', height: 100 }}
                            resizeMode='contain'
                        />
                        {
                    ratmsg === '' ? <View /> :
                        <Text style={{  fontWeight: 'bold', color: COLORS.black, paddingHorizontal: 15, paddingVertical: 4, marginVertical: 5 }}>{ratmsg}</Text>
                }
                        <TouchableOpacity style={{
                            height: 35, backgroundColor: COLORS.gray,
                            marginHorizontal: 60, justifyContent: 'center', alignItems: 'center',
                            borderRadius: 15, marginVertical: 10
                        }} onPress={() => checkReview(product)}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.white }}>Write Review</Text>
                        </TouchableOpacity>
                    </View>

                ) : null}
                <View style={styles.sepr} />
                <View style={styles.boxC}>
                    <Text style={styles.tiText}> User Reviews</Text>
                    <TouchableOpacity onPress={() => setIsReview(!isReview)}>
                        <Entypo name='plus' color={'gray'} size={26} />
                    </TouchableOpacity>
                </View>
                {isReview ? (
                    <View>
                        {
                            review ? <View>
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

                ) : null}

            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {rnderBody()}
                {renderDetail()}
            </ScrollView>
            <View style={{ position: 'absolute', top: 50, right: 10, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount} />
            </View>
            <View style={{ position: 'absolute', top: 50, right: 50, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ProductFavIcon cartCount={wishCount} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, paddingHorizontal: 8 }}>
                <TouchableOpacity style={{ height: 35, width: '80%', borderRadius: 15, marginHorizontal: 10, backgroundColor: COLORS.bgcolor, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { add_to_Cart(product) }}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>Add to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 17.5, backgroundColor: COLORS.gray, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { add_wishlist(product) }}>
                    <FontAwesome5 name='heart' color={COLORS.white} size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: 'white'
    },
    hed: {
        flexDirection: 'row'
    },
    hText: {
        fontSize: SIZES.h2, fontWeight: 'bold',
        color: COLORS.main, textTransform: 'uppercase',
        letterSpacing: 2, lineHeight: 25,
        paddingLeft: SIZES.padding
    },
    imgCon: {
        width: width,
        height: height * 0.3,
    },
    img: {
        width: '100%',
        height: '100%'
    },
    sepr: {
        height: 1,
        backgroundColor: 'lightgray'
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'red'
    },
    ava: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18
    },
    boxC: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tiText: {
        fontSize: 15,
        color: 'gray',
        paddingLeft: 5,
        paddingVertical: 10
    }
})