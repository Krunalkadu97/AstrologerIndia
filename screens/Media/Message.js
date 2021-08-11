import React, { useState } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity,ScrollView,SafeAreaView,TextInput,Dimensions} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat ,Bubble,Send} from 'react-native-gifted-chat';

export default function Chat (){
   const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'thread created',
      createdAt: new Date().getTime(),
      system: true
    },
    {
      _id: 1,
      text: 'hello!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Demo'
      }
    }
  ])

  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage))
  }
  const renderSend = (props) => {
    return(
         <Send
             {...props}
         >
             <View>
                 <MaterialCommunityIcons name='send-circle' style={{marginBottom:5,marginRight:15}} size={30} color={'#eb4034'}/>
             </View>
         </Send>
    )
}

const renderBubble = (props) => {
    return(
     <Bubble
         {...props}
         wrapperStyle={{
             left:{
                 backgroundColor:'#f7f7f7',
                 elevation:5,
                 padding:5
             },
             right:{
                 backgroundColor:'#f7f7f7',
                 elevation:5,
                 padding:5
             },
         }}
         textStyle={{
             left:{
                 color:'#000'
             },
             right:{
                 color:'#000'
             }
         }}
     />
    )
}
 
const scrollToBottomComponent = () => {
    return(
     <FontAwesome name='angle-double-down'  size={25} color={'#eb4034'}/>
     
    )
}
        return (
            <SafeAreaView style={{flex:1}}>
                 <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        />
            </SafeAreaView>
        )
    
}

const styles = StyleSheet.create({})
