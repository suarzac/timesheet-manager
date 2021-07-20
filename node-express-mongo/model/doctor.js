const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Doctor = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        }, 
        filenumber: {
            type: Number
        }
    },
    {
        collection: 'doctor'
    }
)

module.exports = mongoose.model('Doctor', Doctor)
