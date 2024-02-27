import express from "express";
const router = express.Router()

import { loginHandler,signupHandler } from '../controllers/authentication.mjs'


router.post('/login', loginHandler)
router.post('/signup', signupHandler)



export default router