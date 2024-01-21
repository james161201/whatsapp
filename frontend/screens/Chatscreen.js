import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GlobalContext } from "../context";
import { AntDesign,Entypo } from "@expo/vector-icons"
import NewGroupModal from "../component/Modal";
import { socket } from "../utils";
import ChatComponent from "../component/ChatComponent";
// import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
const Chatscreen = ({navigation}) => {
    const { currentUser, allChatRooms,modalVisible, setModalVisible,setAllChatRooms,setCurrentUser,setShowLogin  } = useContext(GlobalContext);
    useEffect(()=>{
socket.emit('getAllGroup');
socket.on('groupList', (groups)=>{
    console.log(groups);
    setAllChatRooms(groups)
})
    },[socket]);
    function handleLogout(){
        setCurrentUser('')
        setShowLogin(false)
    }
    useEffect(()=>{
        if (currentUser.trim() === '') navigation.navigate('Homepage')
    },[currentUser])
    return (
        <View style={styles.maincontainer}>
            <View style={styles.topcontainer}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Welcome {currentUser} ! </Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <AntDesign name="logout" size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listcontainer}>
                {
                    allChatRooms && allChatRooms.length > 0 ?
                        <FlatList
                            data={allChatRooms}
                            renderItem={({ item }) => <ChatComponent item={item} />}
                            keyExtractor={( item ) => item.id}
                        />

                        : null
                }
            </View>
            <View style={styles.bottomcontainer}>
                <View>
                <TouchableOpacity onPress={()=> setModalVisible(true)}>
                        <Entypo name="users" size={50} color={'green'} />
                    </TouchableOpacity>
                </View>

            </View>
                { modalVisible && <NewGroupModal />}
        </View>
    )
}
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1

    },
    topcontainer:{
        backgroundColor:'#128C7E',
        justifyContent:'center',
        flex:0.3,
        marginBottom:10,
        height:70,
        width:'100%',
        padding:20
    },
    header:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center',

    },
    heading:{
        color:'white',
        fontWeight:'bold',
        fontSize:25
    },
    listcontainer:{
        flex:3.4,
        paddingHorizontal:10
    },
    bottomcontainer:{
        flex:0.3,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    }

})

export default Chatscreen;