const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

// const { auth } = require("../middleware/auth");
const multer = require('multer')

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
        return res.json({ success: true, filePath: res.req.file.path, filename: res.req.file.filename })
    })
})

module.exports = router;





