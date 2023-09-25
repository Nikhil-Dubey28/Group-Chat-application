const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./database/configDatabase')
const userRoutes = require('./routes/userRoutes')


// middlewares
app.use(cors())
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

sequelize
.sync()
.then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
})


