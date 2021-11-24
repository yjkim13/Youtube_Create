const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

// const { auth } = require("../middleware/auth");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// Storage에 Multer를 통해 Upload하기

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    filefFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('Only mp4 is Allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================


router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename })
    })
})

router.get('/getVideos', (req, res) => {
    // 비디오를 DB에서 가져와서 클라이언트에 보낸다.

    Video.find()
        .populate('writer') // Schema.Types.ObjectId를 통해 writer 정보를 가져온다.
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

})

router.post('/getVideoDetail', (req, res) => {
    // 비디오를 DB에서 videoId를 통해 찾아서 해당 video 정보를 가져온다.

    Video.findOne({ "_id": req.body.videoId})
        .populate('writer') // Schema.Types.ObjectId를 통해 writer 정보를 가져온다.
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videoDetail })
        })

})

router.post('/thumbnail', (req, res) => {

    var filePath = ""
    var fileDuration = ""

    ffmpeg.setFfmpegPath('C:\\Users\\Hobbit\\Desktop\\ffmpeg-2021-11-22-git-203b0e3561-full_build\\bin\\ffmpeg.exe')

    // 썸네일 생성하고 비디오 러닝타임도 가져오기.
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata)
        console.log(metadata.format.duration)
        fileDuration = metadata.format.duration
    });

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log("Will generate" + filenames.join(`, `));
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function () {
            console.log("Screenshots taken");
            return res.json({ success: true, url: filePath, fileDuration: fileDuration })
        })
        .on('error', function (err) {
            console.log(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            count: 3,
            folder: "uploads/thumbnails",
            size: '320x240',
            // %b : input basename (filename w/o extension)
            filename: 'thumbnail-%b.png'
        })
})

router.post('/uploadVideo', (req, res) => {

    // 비디오 정보들을 저장한다.
    const video = new Video(req.body)

    video.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})




module.exports = router;





