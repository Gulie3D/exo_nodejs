const app = require("../app")
const mongoose = require('mongoose')
const {UserModel}  = require('../models/User')
const {ArticleModel} = require('../models/Article')

var articles = [
    {
        id: 1,
        titre: 'dev',
        description: 'cours nodeJs',
        user: 3
    },
    {
        id: 2,
        titre: 'gestion de projet ',
        description: 'model de gestion',
        user: 2
    },
    {
        id: 3,
        titre: 'mongo db',
        description: 'cours sur mongo db',
        user: 1
    }
]

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
    // users: (req, res) => {        
    //     res.status(200).render('index', {
    //         users
    //     })
    // },

    // articles: (req, res) => {
    //     res.status(200).render('index', {
    //         articles
    //     })
    // }, 

    saveArticle: (req, res) => {
        UserModel.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                const Article = new ArticleModel({
                    _id: new mongoose.Types.ObjectId(),
                    titre: req.body.titre,
                    description: req.body.description,
                    user: user.id
                })
                Article.save((err, article) => {
                    if (err) {
                        res.status(500).render('error', {
                            error: err
                        })
                    } else {
                        res.status(200).json({
                            message: 'Saved',
                            article
                        })
                    }
                })
            }
        })
    },

    getArticles: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!users) {
                    res.status(404).send('Aucun utilisateur trouvé')
                }
                ArticleModel.find({}, (err, articles) => {
                    if (err) {
                        res.status(500).render('error', {
                            message: 'Error when getting things',
                            error: err.message
                        })
                    } else {
                        res.status(200).render('index', {
                            message: 'Articles retrieved',
                            articles,
                            users
                        })
                    }
                })
            }
        })
    },
    
    getArticleById: (req, res) => {
        ArticleModel.findById(req.params.id, (err, article) => {
            if (err) {
                res.status(500).json({
                    message: 'Error when getting article',
                    error: err.message
                })
            }
            else {
                
                res.status(200).render('article', {
                    article
                })
            }
        })
    },

    deleteArticle: (req, res) => {
        ArticleModel.findByIdAndRemove(req.params.id, (err, article) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'Deleted',
                    article
                })
            }
        })
    }

}