const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
})

const UserModel = model('User', userSchema);

module.exports = {
    UserModel,
}