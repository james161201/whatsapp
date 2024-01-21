import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalContext } from "../context";
import { useNavigation } from "@react-navigation/native";

const ChatComponent = ({ item }) => {
    const { messages, setMessages } = useContext(GlobalContext);
    const navigation = useNavigation();
    
    function handleNavigateToMessage(){
        navigation.navigate('Message' ,{
            currentGroupName: item.currentGroupName,
            groupId: item.id,
        })

    }
    return (
        <TouchableOpacity style={styles.chat} onPress={handleNavigateToMessage}>
            <View style={styles.circle}>
                <FontAwesome name="group" color={'black'} size={24} />
            </View>
            <View style={styles.rightcontainer}>
                <View>
                    <Text style={styles.username}>{item.currentGroupName}</Text>
                    <Text style={styles.message}>
                        {item && item.messages && item.messages.length ? item.messages[item.messages.length - 1].text : "Tap to start messaging"}
                    </Text>
                </View>
                <View >
                    <Text style={styles.time}>
                        {item && item.messages && item.messages.length ? item.messages[item.messages.length - 1].time : 'Now'}
                    </Text>
                </View>
            </View>



        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chat: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        height: 80,
        marginBottom: 1,
        backgroundColor: 'white'
    },
    username: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 14,
        opacity: 0.8
    },
    rightcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        opacity: 0.6
    },
    circle: {
        width: 50,
        borderRadius: 60,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginRight: 20
    }


})
export default ChatComponent;