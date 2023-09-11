const Chat = require('../model/Chat')

const sendMessage = async (req,res) => {
    try {   
     const chat =  await Chat.create( {
            name: req.userName,
            userId : req.userId,
            message: req.body.message
        })
        res.status(200).json({message: 'success', chat})
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}

const getMessage = async(req,res) => {
    try {
        const messages = await Chat.findAll()
        res.status(200).json({message: messages})
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = {
    sendMessage,
    getMessage
}
