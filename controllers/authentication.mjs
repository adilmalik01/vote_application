import client from '../database/mongodb.mjs';
import express from 'express'
import {
    stringToHash,
    verifyHash,
    validateHash
} from "bcrypt-inzi";
import jwt from 'jsonwebtoken';
import 'dotenv/config';



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
                    isAdmin: result.isAdmin
                }, process.env.TOKEN_SECRET);
                console.log(token);

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 30000)
                })

                res.send({
                    message: 'logIn Succsessfully',
                })
            }
            return;
        }
        else {
            res.status(200).send(
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

    let userData = req.body
    userData.email = userData.email.toLowerCase()
    try {
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
