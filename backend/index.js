const express = require('express');
const app = express()
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://10.0.2.2:3000/",
    },
});
const PORT = 4000;

function createUniqueId() {
    return Math.random().toString(20).substring(2, 10)
}
let chatgroups = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


socketIO.on("connection", (socket) => {
    console.log(`${socket.id} User is just connected`)


    socket.on('getAllGroup', () => {
        socket.emit('groupList', chatgroups)
    })

    socket.on("createNewGroup", (currentGroupName) => {
        console.log(currentGroupName);
        chatgroups.unshift({
            id: chatgroups.length + 1,
            currentGroupName,
            messages: [],
        })
        socket.emit('groupList', chatgroups)
    });
    socket.on('findgroup', (id) => {
        const filterdGroup = chatgroups.filter(item => item.id === id)
        socket.emit('foundGroup', filterdGroup[0].messages)
    })
    socket.on('newChatMessage', (data) => {
        const { currentChatMessages, groupIdentifier, currentUser, timeData } = data;
        const filterdGroup = chatgroups.filter(item => item.id === groupIdentifier);
        const newMessage = {
            id: createUniqueId(),
            text: currentChatMessages,
            currentUser,
            time: `${timeData.hr} : ${timeData.mins}`
        };
    
        socket.to(filterdGroup[0].currentGroupName).emit('groupMessage', newMessage);
        filterdGroup[0].messages.push(newMessage);
        socket.emit('groupList', chatgroups);
        socket.emit("foundGroup", filterdGroup[0].messages);
    });


});

app.get('/api', (req, res) => {
    res.json(chatgroups)
});

http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})