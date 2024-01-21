import React, { Component, useContext, useEffect } from "react";
import { ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import logo from '../assets/WhatsApp.svg.png';
import { Button } from "react-native-paper";

import { GlobalContext } from "../context";
const Homescreen = ({ navigation }) => {
    const { showLogin,
        setShowLogin,
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers } = useContext(GlobalContext);

    function handelRegisterAndSignIn(isLogin) {
        if (currentUserName.trim() !== '') {
            const index = allUsers.findIndex(userItem => userItem === currentUserName   )

            if (isLogin) {

                if (index === -1) {
                    alert('Please register first')
                } else {
                    setCurrentUser(currentUserName)
                }

            }
            else {
                if (index === -1) {
                    allUsers.push(currentUserName)
                    setAllUsers(allUsers)
                    setCurrentUser(currentUserName)
                } else {
                    alert('Already registerd ! please login')
                }

            }
            setCurrentUserName("")
        }
        else {
            alert('Username field is empty')
        }
        Keyboard.dismiss()
    }
    useEffect(() => {
        if (currentUser.trim() !== '') navigation.navigate('Chat');
    }, [currentUser]);
    console.log(allUsers,currentUser)
    return (
        <View style={styles.maincontainer}>
            <ImageBackground source={logo} style={styles.logo} />

            <View style={styles.content}>
                {
                    showLogin ?
                        <View style={styles.userinput}>
                            <View>
                                <Text style={styles.maintxt}>Enter your name here:</Text>
                                <TextInput
                                    autoCorrect={false}
                                    placeholder="Enter your name "
                                    style={styles.input}
                                    onChangeText={(value) => setCurrentUserName(value)}
                                    value={currentUserName}
                                />
                            </View>
                            <View style={styles.Button}>
                                <Button
                                    mode="contained"
                                    onPress={() => handelRegisterAndSignIn(false)}
                                    title="Get Started"
                                    buttonColor="#25D366"
                                    style={styles.btn1}>
                                    Register
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={() => handelRegisterAndSignIn(true)}
                                    title="Get Started"
                                    buttonColor="#25D366"
                                    style={styles.btn1}
                                >
                                    Login
                                </Button>
                            </View>
                        </View>
                        : (<View style={styles.infopage}>
                            <Text style={styles.starttxt}>You are able to use the WhatsApp</Text>

                            <View style={styles.Button}>
                                <Button
                                    mode="contained"
                                    onPress={() => setShowLogin(true)}
                                    title="Get Started"
                                    buttonColor="#25D366">
                                    Get Started
                                </Button>
                            </View>
                        </View>)
                }

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1
    },
    logo: {
        width: '100%',
        flex: 2,
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff'
    },

    maintxt: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    starttxt: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10

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

    }




}
)

export default Homescreen;