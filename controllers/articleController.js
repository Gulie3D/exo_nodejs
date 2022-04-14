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

module.exports = {
    // articles: (req, res) => {
    //     res.status(200).render('articles', {
    //         articles
    //     })
    // },
    // article: (req, res) => {
    //     const article =  articles.find(article => {
            
    //         return  article.id == req.params.id
    //     })
    //     console.log(article)
    //     res.status(200).render('article', {
    //        article
    //     })
    // },
    
    saveArticle: (req, res) => {
        UserModel.findById(req.body.user, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                const Article = new ArticleModel({
                    _id: new mongoose.Types.ObjectId(),
                    titre: req.body.titre,
                    description: req.body.description,
                    user: req.body.user.id
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

    updateArticle: (req, res) => {
        UserModel.findById(req.body.user, (err, user) => {
            if (err) {
                res.status(500).send(err)
            }else{
                ArticleModel.findByIdAndUpdate(req.params.id, {titre: req.body.titre, description: req.body.description, user: req.body.user}, (err, article) =>{
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        res.status(200).json({
                            message: 'Updated',
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
                        res.status(200).render('articles', {
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
                res.status(200).json({
                    message: 'Article retrieved',
                    article
                })
            }
        })
    }
}