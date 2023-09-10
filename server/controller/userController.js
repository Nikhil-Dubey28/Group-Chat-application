const bcrypt = require('bcrypt')
const User = require('../model/User')



const signup  = async(req,res) => {
    try {
        const {name,email,password,phone} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        
        const existingUser = await User.findOne({where : {email}})

        if(existingUser) {
            res.status(409).json({ message: 'User with this email already exists' })
            return
        }

        const user = await User.create({name,email,phone,password:hashedPass,})
        res.status(201).json(user)
    }catch(err ){
        console.error(err.message)
        console.error(err.stack)
        res.status(500).json({ message: 'internal server error' })
    }
}
        
      
        


module.exports = {
    signup
}