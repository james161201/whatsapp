import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard } from 'react-native';
import { GlobalContext } from '../context';
import { Button } from 'react-native-paper';
import { socket } from '../utils';

const NewGroupModal = () => {
    const { modalVisible, setModalVisible,currentGroupName, setCurrentGroupName} = useContext(GlobalContext)
   function handleCreateNewRoom(){
    console.log(currentGroupName);
    socket.emit("createNewGroup", currentGroupName);
    setModalVisible(false)
    setCurrentGroupName("")
    Keyboard.dismiss()
   }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Enter your name "
                        style={styles.input}
                        onChangeText={(value) => setCurrentGroupName(value)}
                        value={currentGroupName}
                    />
                    <View style={styles.Button}>
                        <Button
                            mode="contained"
                            onPress={handleCreateNewRoom}
                            title="Add"
                            buttonColor="#25D366"
                            style={styles.btn1}>
                            Add
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => setModalVisible(false)}
                            title="Cancel"
                            buttonColor="#25D366"
                            style={styles.btn1}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderRadius: 50,
        borderWidth: 1,
        padding: 8
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn1: {
        borderRadius: 20,
        margin: 5,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default NewGroupModal;