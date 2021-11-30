const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
}, { timestemps: true })



const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }