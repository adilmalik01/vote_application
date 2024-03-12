import express from "express"
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser"
import path from 'path'
import jwt from 'jsonwebtoken'
import moment from 'moment';

const __dirname = path.resolve()

import AuthRouter from './routers/authentication.mjs'
import CandinatesRouter from './routers/candinates.mjs'

// import tokenStatus from "./middlewares/tokenCheck.mjs"



const app = express()

app.use(express.json());
app.use(cookieParser())




// AUTHENTICATION ROUTES FOR UNAUTH USERS
app.use("/api/v1", AuthRouter)


app.use(express.static(path.join(__dirname, 'public')))


//MIDDLEWARE CHECK USER STATUS 
// app.use(tokenStatus)
app.use((req, res, next) => {
    const token = req.cookies.token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.currentUser = {
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            _id: decoded._id,
            profileImg: decoded.avatar,
            createdAt: decoded.createdAt,
            nic: decoded.nic,
            isVoted: decoded.isVoted
        }

        // console.log('currentUser', req.currentUser)
        // console.log('token', decoded)
        next();
    } catch (err) {
        res.status(401).send({ message: "invalid toke nh mila ywr" })
    }
})



app.use("/api/v1", CandinatesRouter)


const port = process.env.SERVER_SECRET
app.listen(port, (e) => {
    console.log(`Example app listening on port ${port}`)
})