import React, { Component } from 'react';

import {
	Image,
	TouchableOpacity
} from 'react-native';

import {FontAwesome5} from 'react-native-vector-icons'

class Logo extends Component {

  goHome = () => {
      this.props.navigation.navigate('Products');
  }
  render() {
    return (
      <TouchableOpacity onPress={this.goHome}>
         <FontAwesome5 name='shopping-cart' size={24} color={'#eb4034'}/>
      </TouchableOpacity>
    );
  }
}


export default Logo;