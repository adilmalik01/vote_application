import express from "express";
import multer from "multer";
const router = express.Router()



import { addCandinate, allCandinates, doVote, userStatus, getProfile } from '../controllers/candinates.mjs'


const storageConfig = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})

var upload = multer({ storage: storageConfig })



router.post('/addCandinate', upload.any(), addCandinate)
router.get('/allCandinates', allCandinates)
router.post('/vote/:postId/doVote', doVote)
router.put("/user/:userId/status", userStatus)
router.get("/user/:userId/profile", getProfile)


router.get("/ping", (req, res) => {
    res.send([req.currentUser])
})






export default router