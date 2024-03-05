import express from "express"
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser"
import path from 'path'
import jwt from 'jsonwebtoken'


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

        req.body.currentUser = {
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            _id: decoded._id,
        }

        // console.log('currentUser', req.body.currentUser)
        // console.log('token', decoded)

        next();
        // return;
    } catch (err) {
        // err
        res.status(401).send({ message: "invalid toke nh mila ywr" })
    }
})



app.use("/api/v1", CandinatesRouter)

app.get("/ping", (req, res) => {
    res.send({ data: req.body.currentUser })
})


const port = process.env.SERVER_SECRET
app.listen(port, (e) => {
    console.log(`Example app listening on port ${port}`)
})