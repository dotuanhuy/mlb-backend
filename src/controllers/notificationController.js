const notificationService = require('../services/notificationService')

module.exports = {
    getNotifications: async (req, res) => {
        try {
            const notifications = await notificationService.getNotifications()
            return res.status(200).json({
                errCode: 0,
                data: notifications
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    createNotification: async (req, res) => {
        try {
            const { id, firstName, lastName } = req.user
            const { typeId, typeText } = req.body
            if (!id || !typeId || !typeText) {
                return res.status(400).json("Missing required parameter")
            }
            const notification = await notificationService.createNotification({ 
                userId: id, 
                typeId, 
                content: typeText === 'order' ? `Bạn ${firstName} ${lastName} đã đặt đơn hàng. Vui lòng vào xác nhận` : '', 
                typeText 
            })
            if (!notification) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Create notification failed'
                }) 
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Create notification success'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    }
}
