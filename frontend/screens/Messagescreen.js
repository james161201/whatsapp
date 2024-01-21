import React, { useContext, useEffect, useLayoutEffect } from "react";
import { FlatList, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { GlobalContext } from "../context";
import { MaterialIcons } from '@expo/vector-icons';
import {socket} from "../utils/index"
import MessageComponent from "../component/MessageComponent";



const MessageScreen = ({navigation,route}) => {
    const { allChatMessages, setAllChatMessages, currentUser, currentChatMessages, setCurrentChatMessages } = useContext(GlobalContext)
   const {currentGroupName,groupId} = route.params
    function handleAddNewMessage() {
        const timeData = {
            hr: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
            mins: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()

        };
        if (currentUser){
            socket.emit('newChatMessage', {
                currentChatMessages,
                groupIdentifier : groupId,
                currentUser,
                timeData
            })
            setCurrentChatMessages('')
            Keyboard.dismiss()
        }
    }
    
        useEffect(()=>{
            socket.on('findgroup', groupId)
        
            socket.on('foundGroup',(allChats)=>setAllChatMessages(allChats))
        },[socket])

    
    return (
        <View style={styles.wrapper}>
            <View style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}>
                {
                    allChatMessages && allChatMessages[0] ?
                        (<FlatList
                            data={allChatMessages}
                            renderItem={({ item }) => <MessageComponent item={item} currentUser={currentUser} />}
                            keyExtractor={(item) => item.id}
                        />)
                        : (
                            ""
                        )
                }
            </View>
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageinput}
                    value={currentChatMessages}
                    onChangeText={(value) => setCurrentChatMessages(value)}
                    placeholder="Enter the text here"
                />
                <TouchableOpacity onPress={handleAddNewMessage} style={styles.button}>
                    <View style={styles.circle}>
                        <MaterialIcons name="send" size={24} color="green" />
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#eee'
    },
    messageInputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    messageinput: {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        borderRadius: 50,
        marginRight: 10
    },
    button: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default MessageScreen