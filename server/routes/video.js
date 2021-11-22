const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

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
module.exports = router;





