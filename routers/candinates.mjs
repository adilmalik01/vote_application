import express from "express";
const router = express.Router()

import { addCandinate, allCandinates } from '../controllers/candinates.mjs'


router.post('/addCandinate', addCandinate)
router.get('/allCandinates', allCandinates)



export default router