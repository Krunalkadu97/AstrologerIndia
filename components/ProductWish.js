import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { COLORS } from './../constants/theme';

function ProductFavIcon(props) {
    const navigation = useNavigation();
    const {cartCount}=props;
    
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Wishlist')}
      style={styles.button}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartCount}</Text>
      </View>
      <Ionicons name='bookmark' size={20} color='#101010' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: 0
  },
  itemCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    right: 10,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  itemCountText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default ProductFavIcon