const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Timecard = new Schema(
    {
        date: {
            type: Date,
            default: Date.now()
        },
        sector: {
            type: String
        }, 
        location: {
            type: String
        },
        time_in: {
            type: String
        },
        time_out: {
            type: String
        }
    }, 
    {
        collection: 'timecard'
    }
)

module.exports = mongoose.model('Timecard', Timecard)