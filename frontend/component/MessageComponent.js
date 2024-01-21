import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../context";


 const MessageComponent = ({currentUser, item}) => {
    const currenUserStatus = item.currentUser !== currentUser;
        console.log(currenUserStatus,item);

return(
    <View style={currenUserStatus ? {} : {alignItems:'flex-end'}}>
 <View style={styles.messageitemwrapper}>
    <View style={styles.messageiteminnerwrapper}>
        <View
        style={currenUserStatus ? styles.messageitem:[styles.messageitem, {backgroundColor:'#25D366'}]}>
            <Text
            style={currenUserStatus ? {color:'#000'} : {color:'#000'}}>
                {item.text}
            </Text>

        </View>

    </View>
    <Text style={styles.messagetime}>{item.time}</Text>

 </View>


    </View>
)
 }

 const styles = StyleSheet.create({
    messageitemwrapper:{
        maxWidth:'50%',
        marginBottom:15
    },
    messageiteminnerwrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    messageitem:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'#ffffff',
        padding:15,
        borderRadius:10,

    },
    messagetime:{
marginLeft:10
    
      
    }
 })
 export default MessageComponent