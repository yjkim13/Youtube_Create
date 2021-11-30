const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
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



const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }