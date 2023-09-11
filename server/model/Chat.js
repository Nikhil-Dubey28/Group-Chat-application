const sequelize = require('../database/configDatabase')
const Sequelize = require('sequelize')


const Chat = sequelize.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING 
    },
})

module.exports = Chat