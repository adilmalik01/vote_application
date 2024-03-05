
import client from "../database/mongodb.mjs";
const db = client.db("VottingApp").collection("Candinates");





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


    req.body.email = req.body.email.toLowerCase()
    let query = await db.findOne({ CNIC: req.body.nicNumber })

    if (query) {
        res.send("This Candinate Already Exist")
        return;
    } else {
        try {
            let CandinateData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                qualification: req.body.qualification,
                party: req.body.party,
                CNIC: req.body.nicNumber
            }

            let response = await db.insertOne(CandinateData)

            console.log(response);
            res.send(" Registration SuccessFully")
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