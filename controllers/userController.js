const app = require("../app")
const mongoose = require('mongoose')
const {UserModel}  = require('../models/User')
const ArticleModel = require('../models/Article')

var users = [
    {
        id: 1,
        firstname: 'julie',
        name: 'Causse',
        age: '30'
    },
    {
        id: 2,
        firstname: 'Guillaume',
        name: 'Lecomte',
        age: '30'
    },
    {
        id: 3,
        firstname: 'john',
        name: 'doe',
        age: '34'
    }
]

module.exports = {
    // user: (req, res) => {
    //     // const user =  users.find(user => {            
    //     //     return  user.id == req.params.id
    //     // })
    //     // console.log(user)
    //     // res.status(200).render('user', {
    //     //    user
    //     // })
    // },
    // users: (req, res) => {        
    //     // req.param('name')
    //     // res.status(200).render('users', {
    //     //     users
    //     // })
    // },

    saveUser: (req, res) => {
        const User = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            name: req.body.name,
            age: req.body.age
        })

        User.save( (err, user) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'Saved',
                    user
                })
            }
        })
    },

    updateUser: (req, res) => {
        UserModel.findByIdAndUpdate(req.params.id, {firstname: req.body.firstname, name: req.body.name, age: req.body.age}, (err, user) =>{
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'Updated',
                    user
                })
            }
        })
    },

    getUsers: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!users) {
                    res.status(404).send('Aucun utilisateur trouvé')
                } 
                else {
                    res.status(200).render('users', {
                        users
                    })
                }
            }
        })
    },
    
    getUserById: (req, res) => {
        UserModel.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Error when getting user',
                    error: err.message
                })
            }
            else {
                res.status(200).render('user', {
                    user
                })
            }
        })
    },

    deleteUser: (req, res) => {
        UserModel.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'Deleted',
                    user
                })
            }
        })
    }
}