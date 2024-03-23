const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const Otp = require('../models/mongodb/otp')

module.exports = {
    validOTPService: async ({ otp, hashOtp }) => {
        try {
            const isValid = await bcrypt.compareSync(otp, hashOtp)
            return isValid
        } catch (e) {
            console.log(e)
        }
    },
    createOTPService: ({otp, email}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const hashOtp = await bcrypt.hash(otp, salt)
                // const otp = await db.Otp.create({ email, otp:hashOtp })
                const otpRes = await Otp.create({ email, otp:hashOtp })
                resolve({
                    errCode: otpRes ? 0 : 1
                })
            } catch (e) {   
                reject(e)
            }
        })
    }
}
