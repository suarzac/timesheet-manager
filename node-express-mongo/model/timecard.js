const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Timecard = new Schema(
    {
        doctor_id: {
            type: String,
        },
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
        },
        pay_code: {
            type: String
        }
    }, 
    {
        collection: 'timecard'
    }
)

module.exports = mongoose.model('Timecard', Timecard)