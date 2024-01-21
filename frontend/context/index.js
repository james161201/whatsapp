import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
function GlobalState({ children }) {
    const [showLogin, setShowLogin] = useState(false);
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUser, setCurrentUser] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [allChatRooms, setAllChatRooms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentGroupName, setCurrentGroupName] = useState('');
    const [allChatMessages, setAllChatMessages] = useState([])
    const [currentChatMessages, setCurrentChatMessages] = useState('')


    return <GlobalContext.Provider value={{
        showLogin, setShowLogin,
        currentUserName, setCurrentUserName,
        currentUser, setCurrentUser,
        allUsers, setAllUsers,
        allChatRooms, setAllChatRooms,
        modalVisible, setModalVisible,
        currentGroupName, setCurrentGroupName,
        allChatMessages, setAllChatMessages,
        currentChatMessages, setCurrentChatMessages
    }}>{children}</GlobalContext.Provider>;
}
export default GlobalState;