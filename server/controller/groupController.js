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


const fetchUsersToAdd = async (req, res) => {
    const { groupId } = req.params; 
  
    try {
      // Fetch all users who are not part of the current group
      const usersNotInGroup = await User.findAll({
        where: {
          id: {
            [Op.notIn]: sequelize.literal(`
              (SELECT UserId 
                FROM UserGroups 
                WHERE GroupId = ${groupId}
              )`),
          },
        },
      });
  
      res.status(200).json(usersNotInGroup);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const fetchUsersToRemove = async(req,res) => {
    const { groupId } = req.params; 

  try {
    // Fetch all users who are part of the current group
    const usersInGroup = await User.findAll({
      where: {
        id: {
          [Op.in]: sequelize.literal(`
            (SELECT UserId 
              FROM UserGroups 
              WHERE GroupId = ${groupId}
            )`),
        },
      },
    });

    res.status(200).json(usersInGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const addToGroup = async(req,res) => {
    try {
        const {groupId} = req.params
        const members = req.body.members

        const group = await Group.findOne({
            where : {
                id: groupId

                
            }
        })
        if(group) {
            const admin = await UserGroup.findOne({
                where: {
                    [Op.and] : [{isadmin: 1},{groupId:groupId}],
                },
            })
            if(admin.userId === req.userId) {
                const invitedMembers = await sequelize.query("SELECT * FROM Users WHERE email IN (:emails)", 
                {
                  replacements: { emails: members },
                  type: QueryTypes.SELECT 
                });

                await Promise.all(
                    invitedMembers.map(async (user) => {
                       await UserGroup.create({
                            isadmin: false,
                            userId: user.id,
                            groupId: group.id
                        })
                    })
                    )
                    res.status(201).json({message: "members added successfully"})
            }else {
                res.status(401).json({message: 'only admins can add members'})
            }
        }
            
        else {
            res.status(404).json({message: "group doesnt exists"})
        }
    } catch (err) {
        console.log(err);
    res.status(500).json({ message: 'Internal server error' });
    }
}


const removeFromGroup = async(req,res) => {
  try {
    const {groupId} = req.params
        const members = req.body.members

        const group = await Group.findOne({
            where : {
                id: groupId

                
            }
        })
        if(group) {
            const admin = await UserGroup.findOne({
                where: {
                    [Op.and] : [{isadmin: 1},{groupId:groupId}],
                },
            })
            if(admin.userId === req.userId) {
                const invitedMembers = await sequelize.query("SELECT * FROM Users WHERE email IN (:emails)", 
                {
                  replacements: { emails: members },
                  type: QueryTypes.SELECT 
                });

                await Promise.all(
                    invitedMembers.map(async (user) => {
                       await UserGroup.destroy({
                        where :{
                          [Op.and] :[
                            {
                              isadmin: false,
                            userId: user.id,
                            groupId: group.id
                            },
                          ],
                        }
                       
                           
                        })
                    })
                    )
                    res.status(201).json({message: "members removed successfully"})
            }else {
                res.status(401).json({message: 'only the admin can remove members'})
            }
        }
            
        else {
            res.status(404).json({message: "group doesnt exists"})
        }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const viewMembers = async(req,res) => {
  

  try {
    const {groupId} = req.params
    const group = await Group.findOne({ where: { name: groupId } });
    const userGroup = await UserGroup.findAll({
      where: { groupId: groupId },
    });

    const users = [];

    await Promise.all(
      userGroup.map(async (user) => {
        const res = await User.findOne({
          where: { id: user.userId },
        });
        users.push(res);
      })
    );
    res.status(200).json({ users: users ,userGroup});
    // res.status(200).json( users ,userGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    createGroup,
    fetchUserGroups,
    fetchUsersToAdd,
    fetchUsersToRemove,
    addToGroup,
    removeFromGroup,
    viewMembers
}

















