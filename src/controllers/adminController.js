// import User from "../models/user.model.js"
const User = require("../models/userSchema");

const createUser = async (req, res) => {
    try {
        if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password) {
            res.status(400).send({ message: "Content can not be empty" });
        }
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message || "Some error occured while creating user",
            error_code: e.code,
            data: {}
        });

    }
};



const getAllUser = async ( req, res ) =>
{ 
    try {
        const users = await User.find()

        return res.status( 200 ).json( {
            success: true,
            message: "Users fetched successfully",
            data: {
                users
            }
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }
const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params
        
        const user = await User.findById(id);
        //if no user is found return error status 404
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found',
            error_code: 404,
            data: {}
        });

        return res.status(200).json({
            success: true,
            message: 'User successfully retrieved',
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                   
                }
            }
        })
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })

    }

};


const updateUser = async (req, res) => {
 
try {
        const id = req.params.id;
        await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                rs.status(404).send({
                    message: 'User not found.'
                });
            } else {
                res.send({ message: "User updated successfully." })
            }
        })
    
} catch (e) {
    return res.status(500).json({
        success: false,
        message: e.message,
        error_code: e.code,
        data: {}
    })
}
};



const removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        const remove = await User.findByIdAndDelete(id)
        return res.status(201).json( {
            successs: true,
            message: "User removed and deleted from record",
            data: {
                remove
            }
            })
        } catch (e) {
                return res.status(400).json({
                    success: false,
                    message: e.message,
                    error_code: e.code,
                    data: {}
                })
            }
}



module.exports = {
   createUser, 
    getAllUser,
    getUserbyId,
    updateUser,         
    removeUser 
}