const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    //Schema.Types.ObjectId는 Id만 넣어도 User에 있는 정보를 불러올 수 있다.
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }

},{timestemps: true})



const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }