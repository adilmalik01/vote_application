
import { v2 as cloudinary } from 'cloudinary';
import client from "../database/mongodb.mjs";
import { ObjectId } from 'mongodb'
import fs from "fs"
const db = client.db("VottingApp").collection("Candinates");
const userdb = client.db("VottingApp").collection("newUser");




cloudinary.config({
    cloud_name: 'dxmi7wlcc',
    api_key: '314487955484986',
    api_secret: 'OAto_nrC_7Hc4GAeyqHyAyPQTKU'
});


export let addCandinate = async (req, res, next) => {
    if (
        !req.body.email ||
        !req.body.qualification ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.nicNumber ||
        !req.body.party
    ) {
        res.status(401)
        res.send(
            `require parammetter is missing 
             "please provide require input"
            `
        )
        return;
    };

    // console.log(req.body, "files", req.files);
    req.body.email = req.body.email.toLowerCase()
    let query = await db.findOne({ CNIC: req.body.nicNumber })

    if (query) {
        res.send("This Candinate Already Exist")
        return;
    } else {
        try {

            let imgResult = await cloudinary.uploader.upload(req.files[0].path)



            let CandinateData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                qualification: req.body.qualification,
                party: req.body.party,
                CNIC: req.body.nicNumber,
                CandinateAvatar: imgResult.secure_url
            }

            let response = await db.insertOne(CandinateData)

            console.log(response);
            res.send("done")
        } catch (e) {
            console.log(e);
        }
    }



}


export const allCandinates = async (req, res) => {
    try {
        const response = db.find({})
        let cursor = await response.toArray()
        res.send(cursor)
    }
    catch (e) {
        console.log(e);
    }
}


export const doVote = async (req, res) => {
    let postId = req.params.postId
    try {
        const doLikeResponse = await db.updateOne(
            { _id: new ObjectId(`${postId}`) },
            {
                $addToSet: {
                    votes: new ObjectId(`${req.currentUser._id}`)
                }
            }
        );
        console.log("doLikeResponse: ", doLikeResponse);
        res.send('like done');
        // console.log(req.params.postId);
    } catch (e) {
        console.log("error like post mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
}



export const userStatus = async (req, res) => {
    let userID = req.params.userId
    try {
        let userUpdate = await userdb.updateOne({ _id: new ObjectId(`${userID}`) },
            {
                $set: {

                    isVoted: true
                }
            }
        )
        res.send(userUpdate)
    }
    catch (e) {
        console.log(e);
    }
}



export const getProfile = async (req, res) => {
    let userID = req.params.userId
    try {
        let user = await userdb.aggregate([
            {
                $match: { _id: new ObjectId(`${userID}`) }
            }, {
                $project: {
                    email: 1,
                    nicNumber: 1,
                    _id: 1,
                    isVoted: 1,
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    createdAt: 1,
                }
            }
        ]).toArray()
        res.send(user)
    }
    catch (e) {
        console.log(e);
    }
}
