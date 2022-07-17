const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const refreshSchema = Schema({
    token: {type: String, required: true},
    userId: {type: String, ref: 'User'},
},{
    timestamps: true
})

module.exports = mongoose.model('refresh',refreshSchema)