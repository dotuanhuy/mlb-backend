const jwt = require('jsonwebtoken')

// const verifyToken = (req, res, next) => {
//     const token = req?.headers?.token
//     if (token) {
//         const accessToken = token.split(' ')[1]
//         jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) {
//                 return res.status(200).json({
//                     errCode: 4, 
//                     errMessage: 'Token is not valid'
//                 })
//             }
//             req.user = user
//             next()
//         })
//     } 
//     else {
//         return res.status(200).json({
//             errCode: 3, 
//             errMessage: 'You are not authenticated'
//         })
//     }
// }   

const verifyTokenAdmin = (req, res, next) => {
    try {
        if (req?.user) {
            if (req.user.roleId === +process.env.ADMIN_ROLE) {
                next()
            }
            else {
                return res.status(401).json({
                    errCode: -2,
                    errMessage: 'You are not access'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: 3,
                errMessage: 'You are not authenticated'
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1, 
            errMessage: 'Error from server'
        })
    }
    // verifyToken(req, res, () => {
    //     if (req?.user) {
    //         if (req.user.roleId === +process.env.ADMIN_ROLE) {
    //             next()
    //         }
    //         else {
    //             return res.status(401).json({
    //                 errCode: -2,
    //                 errMessage: 'You are not access'
    //             })
    //         }
    //     }
    //     else {
    //         return res.status(200).json({
    //             errCode: 3,
    //             errMessage: 'You are not authenticated'
    //         })
    //     }
    // })
}


module.exports = {
    // verifyToken,
    verifyTokenAdmin
}