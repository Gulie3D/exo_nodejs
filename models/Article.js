const {Schema, model} = require('mongoose')
const UserModel  = require('../models/User')

const articleSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: Schema.Types.ObjectId,
        //ref: add(UserModel)
    }
})

const ArticleModel = model('Article', articleSchema);

module.exports = {
    ArticleModel,
}