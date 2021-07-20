const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Location = new Schema(
    {
        title: {
            type: String
        },
        sector: {
            type: String
        }
    },
    {
        collection: 'location'
    }
) 

module.exports = mongoose.model('Location', Location)
