// const User = require('../model/User');
const Group = require('../model/Group');
const UserGroup = require('../model/UserGroup');
const { Op } = require("sequelize");
const User = require('../model/User')
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/configDatabase')

const createGroup = async (req, res) => {
    
    try {
        const groupName = req.body.groupName;
        const admin = req.userName;
        const members = req.body.members;

        const group = await Group.create({
            name : groupName,
            admin: admin
        })

        // console.log(User)

        // const invitedMembers = await User.findAll({
        //     where: {
        //         email : {
        //             [Op.or] : members,
        //         },
        //     }
        // })

        const invitedMembers = await sequelize.query("SELECT * FROM Users WHERE email IN (:emails)", 
{
  replacements: { emails: members },
  type: QueryTypes.SELECT 
});


        (async () => {
            await Promise.all(
                invitedMembers.map(async (user) => {
                   await UserGroup.create({
                        isadmin: false,
                        userId: user.id,
                        groupId: group.id
                    })
                })
            )
            await UserGroup.create({
                isadmin: true,
                userId: req.userId,
                groupId: group.dataValues.id
            })
        })()
        res.status(201).json({group: group.dataValues.name,members: members})
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'internal server error' })
    }
}


const fetchUserGroups = async (req,res) => {
    const userId = req.userId

    try {
        const userGroups = await UserGroup.findAll({
            where: {
                UserId: userId
            }
        })

        const groupIds = userGroups.map(userGroup => userGroup.groupId)

        const groups = await Group.findAll({
            where: {
                id: groupIds
            }
        })
        res.status(200).json(groups)
        // console.log(groups)
    }catch(err) {
        console.log(err)

        res.status(500).json({ message: 'internal server error' })
    }
}


  

module.exports = {
    createGroup,
    fetchUserGroups,
    
}

















