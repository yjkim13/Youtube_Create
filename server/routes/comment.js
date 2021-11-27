

const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================




router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                res.status(200).json({ success: true, result })
            })
    })
})
router.post('/getComment', (req, res) => {

    Comment.find({ "postId": req.body.videoId })
    .populate('writer')
    .exec((err, comment)=>{
        if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comment })
    })
})






module.exports = router;





