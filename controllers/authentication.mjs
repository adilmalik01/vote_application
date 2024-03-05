import client from '../database/mongodb.mjs';
import express from 'express'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import {
    stringToHash,
    verifyHash,
    validateHash
} from "bcrypt-inzi";
import jwt from 'jsonwebtoken';
import 'dotenv/config';


cloudinary.config({
    cloud_name: 'dxmi7wlcc',
    api_key: '314487955484986',
    api_secret: 'OAto_nrC_7Hc4GAeyqHyAyPQTKU'
});




const db = client.db("VottingApp").collection("newUser");



export let loginHandler = async (req, res) => {
    if (
        !req.body.password ||
        !req.body.nicNumber
    ) {
        res.status(401)
        res.send(
            `require parammetter is missing 
             "please provide require input"
            `
        )
        return;
    };


    try {
        let result = await db.findOne({ nicNumber: req.body.nicNumber })
        if (result) {
            const verifyPass = await verifyHash(req.body.password, result.password);
            if (!verifyPass) {
                res.status(200).send("incorrect nic and password",)
                return;
            } else {

                let token = jwt.sign({
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    _id: result._id,
                    isAdmin: result.isAdmin,
                    avatar: result.avatar
                }, process.env.TOKEN_SECRET);
                // console.log(token);          /// LOG TOKEN


                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 900000)
                })

                res.send({
                    message: 'logIn Succsessfully',
                    data: {
                        isAdmin: result.isAdmin
                    }
                })
            }
            return;
        }
        else {
            res.status(403).send(
                {
                    msg: "incorrect nic and password",
                }
            )
        }
    }
    catch (e) {
        console.log(e)
        res.send("invalid data")
    }
}





export let signupHandler = async (req, res) => {
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.nicNumber||
        !req.files
    ) {
        res.status(401)
        res.send(
            `require parammetter is missing 
             "please provide require input"
            `
        )
        return;
    };

    const maxSizeFile = 1 * 1024 * 1024  // 1 MB image allow only

    // console.log(req.files);
    if (req.files[0].size >= maxSizeFile) {
        console.log('this file is bigger'); ///////TODO
        res.send("File Size is Big Maximum 2 MB file allowed")
        return;
    }

    let userData = req.body
    userData.email = userData.email.toLowerCase()
    try {

            let imgResult = await cloudinary.uploader.upload(req.files[0].path)
            fs.unlinkSync(req.files[0].path)

            const hashPass = await stringToHash(userData.password);
            let result = await db.findOne({ nicNumber: userData.nicNumber })
            if (result) {
                res.send({ msg: "already exist Nic" })
                return;
            }
            else {
                const insertData = await db.insertOne(
                    {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        password: hashPass,
                        nicNumber: userData.nicNumber,
                        isAdmin: false,
                        avatar: imgResult.secure_url,
                        createdAt: Date.now()
                    }
                )
                res.status(200).send(
                    {
                        msg: "Signup Succesfully",
                    }
                    )
                }
                
    }
    catch (e) {
        console.log(e)
        res.send("invalid data")
    }
}
