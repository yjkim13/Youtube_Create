const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    //Schema.Types.ObjectId는 Id만 넣어도 User에 있는 정보를 불러올 수 있다.
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestemps: true })



const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }