const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./database/configDatabase')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const groupRoutes = require ('./routes/groupRoutes')
const Chat = require('./model/Chat')
const User = require('./model/User')
const Group = require('./model/Group')
const UserGroup = require('./model/UserGroup')


// middlewares

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



//routes
app.use('/api',userRoutes)
app.use('/api',chatRoutes)
app.use('/api',groupRoutes)


// relations
User.hasMany(Chat);

Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`)
})

const io = require('socket.io')(server,{
    pingTimeout : 60000,
    cors: {
        origin: "*",
    }
});

io.on("connection",(socket) => {
console.log('connected to socket.io');

socket.on('setup', (userData) => {
socket.join(userData)
console.log(userData)
socket.emit("connected")
})

socket.on("join chat",(room) => {
socket.join(room)
console.log("User joined room: " + room)
})

socket.on("new message", (newMessageReceived) => {
    const  {message,chatId,name} = newMessageReceived;

    socket.broadcast.to(chatId).emit("message received", {
        message,
        name
    })
})

socket.off("setup",() => {
    conosole.log('USER DISCONNECTED')
    socket.leave(userData)
})
})


sequelize
.sync()
.then(() => {
    console.log('connected to database')
   
})

