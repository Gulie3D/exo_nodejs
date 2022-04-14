var express = require('express');
const router = express.Router()

const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

router.route('/').get(homeController.getArticles)
router.route('/').post(homeController.saveArticle)

router.route('/articles').get(articleController.getArticles)

router.route('/users').get(userController.getUsers)
router.route('/users').post(userController.saveUser)

router.route('/user/:id').get(userController.getUserById)
router.route('/user/:id').put(userController.updateUser)
router.route('/user/:id').delete(userController.deleteUser)

router.route('/article/:id').get(homeController.getArticleById)
router.route('/article/:id').put(articleController.updateArticle)
router.route('/:id').delete(homeController.deleteArticle)

module.exports = router
