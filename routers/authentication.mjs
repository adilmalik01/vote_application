import express from "express";
import multer from "multer";

const router = express.Router()

import { loginHandler, signupHandler } from '../controllers/authentication.mjs'


const storageConfig = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})

var upload = multer({ storage: storageConfig })



router.post('/login', loginHandler)
router.post('/signup', upload.any(), signupHandler)



export default router