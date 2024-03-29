const jwt = require('jsonwebtoken')

module.exports = {
    // verifyToken,
    verifyTokenAdmin: (req, res, next) => {
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
    }
}
