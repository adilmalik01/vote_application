// import 'dotenv/config'
// import jwt from 'jsonwebtoken'


// let tokenStatus = (req, res, next) => {
//     let token = req.cookies.token
//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

//         req.body.currentUser = {
//             email: decoded.email,
//             isAdmin: decoded.isAdmin,
//             firstName: decoded.firstName,
//             lastName: decoded.lastName,
//             _id: decoded._id,
//         }

//         console.log('currentUser', req.body.currentUser)
//         // console.log('token',decoded)

//         next();
//     } catch (err) {
//         // err
//         res.status(401).send({ message: "invalid token" })
//     }
// }


// export default tokenStatus;