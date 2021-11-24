const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    //Schema.Types.ObjectId는 Id만 넣어도 User에 있는 정보를 불러올 수 있다.
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestemps: true })



const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }