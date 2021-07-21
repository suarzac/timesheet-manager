const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let User = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        }, 
        description: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        }
    }, 
    {
        collection: 'user'
    }
)

User.plugin(uniqueValidator, { message: 'Email already in use. Try a different one.' })
module.exports = mongoose.model('User', User)