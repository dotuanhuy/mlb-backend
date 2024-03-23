require('dotenv').config()
const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: async ({email, otp}) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: '"Dev" <emyeuk771@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Mã xác minh email", // Subject line,
            text: "",
            html: `
                <span>Kính gửi người dùng</span>
                </br>
                <span>Mã xác minh bạn cần dùng để xác thực email của mình (${email}) là:</span>
                </br>
                <h2>${otp}</h2>
                </br>
                <span>Mã xác minh có hiệu lực trong 60s kể từ lúc nhận được</span></br>
                <span>
                    Nếu bạn không yêu cầu mã này thì có thể là ai đó đang tìm cách truy cập vào Tài khoản (${email}).
                    <b> Không chuyển tiếp hoặc cung cấp mã này cho bất kỳ ai.</b>
                </span>
            `, // html body
        });

        return info
    }
}